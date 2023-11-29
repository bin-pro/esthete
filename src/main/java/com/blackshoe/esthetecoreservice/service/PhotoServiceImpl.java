package com.blackshoe.esthetecoreservice.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.blackshoe.esthetecoreservice.dto.PhotoDto;
import com.blackshoe.esthetecoreservice.dto.PhotoUrlDto;
import com.blackshoe.esthetecoreservice.entity.*;
import com.blackshoe.esthetecoreservice.exception.PhotoException;
import com.blackshoe.esthetecoreservice.exception.PhotoErrorResult;
import com.blackshoe.esthetecoreservice.exception.UserErrorResult;
import com.blackshoe.esthetecoreservice.exception.UserException;
import com.blackshoe.esthetecoreservice.repository.*;
import com.blackshoe.esthetecoreservice.vo.LocationGroupType;
import com.blackshoe.esthetecoreservice.vo.PhotoAddressFilter;
import com.blackshoe.esthetecoreservice.vo.PhotoAddressSearchType;
import com.blackshoe.esthetecoreservice.vo.PhotoPointFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class PhotoServiceImpl implements PhotoService {

    private final AmazonS3Client amazonS3Client;
    private final PhotoRepository photoRepository;
    private final GenreRepository genreRepository;
    private final PhotoGenreRepository photoGenreRepository;
    private final PhotoEquipmentRepository photoEquipmentRepository;

    //redis
    private final RedisTemplate redisTemplate;

    private final NewWorkRepository newWorkRepository;
    private final UserRepository userRepository;
    private final SupportRepository supportRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String BUCKET;
    @Value("${cloud.aws.cloudfront.distribution-domain}")
    private String DISTRIBUTION_DOMAIN;
    @Value("${cloud.aws.s3.root-directory}")
    private String ROOT_DIRECTORY;
    @Value("photo")
    private String PHOTO_DIRECTORY;

    @Transactional
    @Override
    public PhotoDto uploadPhotoToS3(UUID userId, MultipartFile photo, PhotoDto.CreatePhotoRequest photoUploadRequest) {
        validatePhoto(photo);
        User photographer = userRepository.findByUserId(userId).orElseThrow(() -> new UserException(UserErrorResult.USER_NOT_FOUND));

        String s3FilePath = userId + "/" + PHOTO_DIRECTORY;

        UUID photoId = UUID.randomUUID();

        String fileExtension = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));


        String key = ROOT_DIRECTORY + "/" + s3FilePath + "/" + photoId + fileExtension;

        uploadToS3(photo, key);

        String s3Url;

        try {
            s3Url = amazonS3Client.getUrl(BUCKET, key).toString();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new PhotoException(PhotoErrorResult.PHOTO_UPLOAD_FAILED);
        }

        String cloudFrontUrl = DISTRIBUTION_DOMAIN + "/" + key;

        PhotoUrlDto photoUrlDto = createPhotoUrlDto(s3Url, cloudFrontUrl);
        PhotoUrl uploadedPhotoUrl = PhotoUrl.convertPhotoUrlDtoToEntity(photoUrlDto);

        PhotoLocation photoLocation = createPhotoLocation(photoUploadRequest);
        Photo uploadedPhoto = createPhoto(photographer, photoId, uploadedPhotoUrl, photoUploadRequest, photoLocation);

        photoRepository.save(uploadedPhoto);

        savePhotoGenres(uploadedPhoto, photoUploadRequest.getGenreIds());
        savePhotoEquipments(uploadedPhoto, photoUploadRequest.getEquipments());

        NewWork newWork = saveOrUpdateNewWork(photographer, uploadedPhoto);

        newWorkRepository.save(newWork);

        return createPhotoDto(photoId, uploadedPhotoUrl);
    }

    public void validatePhoto(MultipartFile photo) {
        if (photo == null) {
            throw new PhotoException(PhotoErrorResult.EMPTY_PHOTO);
        }

        if (photo.getSize() > 52428800) {
            throw new PhotoException(PhotoErrorResult.INVALID_PHOTO_SIZE);
        }
    }

    public void uploadToS3(MultipartFile photo, String key) {
        try {
            amazonS3Client.putObject(BUCKET, key, photo.getInputStream(), null);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new PhotoException(PhotoErrorResult.PHOTO_UPLOAD_FAILED);
        }
    }

    public PhotoUrlDto createPhotoUrlDto(String s3Url, String cloudFrontUrl) {
        return PhotoUrlDto.builder()
                .s3Url(s3Url)
                .cloudfrontUrl(cloudFrontUrl)
                .build();
    }

    public PhotoLocation createPhotoLocation(PhotoDto.CreatePhotoRequest photoUploadRequest) {
        return PhotoLocation.builder()
                .longitude(photoUploadRequest.getLongitude())
                .latitude(photoUploadRequest.getLatitude())
                .state(photoUploadRequest.getState())
                .city(photoUploadRequest.getCity())
                .town(photoUploadRequest.getTown())
                .build();
    }

    public void savePhotoGenres(Photo uploadedPhoto, List<String> genreIds) {
        genreIds.forEach(genreId -> {
            Genre genre = genreRepository.findByGenreId(UUID.fromString(genreId)).orElseThrow(() -> new PhotoException(PhotoErrorResult.GENRE_NOT_FOUND));

            PhotoGenre photoGenre = PhotoGenre.builder()
                    .photo(uploadedPhoto)
                    .genre(genre)
                    .build();

            photoGenreRepository.save(photoGenre);
        });
    }

    public void savePhotoEquipments(Photo uploadedPhoto, List<String> equipments) {
        equipments.forEach(equipment -> {
            PhotoEquipment photoEquipment = PhotoEquipment.builder()
                    .photo(uploadedPhoto)
                    .equipmentId(UUID.randomUUID())
                    .photoEquipmentName(equipment)
                    .build();

            photoEquipmentRepository.save(photoEquipment);
        });
    }

    @Transactional
    public NewWork saveOrUpdateNewWork(User photographer, Photo uploadedPhoto) throws RuntimeException {
        NewWork newWork = newWorkRepository.findByPhotographerId(photographer.getUserId());

        List<Support> supports = supportRepository.findAllByPhotographerId(photographer.getUserId());

        String[] userIdWithCondition;
        List<String[]> supporters = new ArrayList<>();

        for (Support support : supports) {
            //[[userId, true], [userId, true], [userId, true]]
            userIdWithCondition = new String[]{support.getUser().getUserId().toString(), "true"};

            supporters.add(userIdWithCondition);
        }

        String hasNewRedisKey = "photographer_" + photographer.getUserId().toString() + "_photo_" + uploadedPhoto.getPhotoId().toString();

// JSON 변환을 위한 ObjectMapper 인스턴스 생성
        ObjectMapper mapper = new ObjectMapper();

// supporters 리스트를 JSON 문자열로 변환
        String supportersJson;
        try {
            supportersJson = mapper.writeValueAsString(supporters);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON 변환 실패", e);
        }

// Redis에 JSON 문자열 저장
        redisTemplate.opsForValue().set(hasNewRedisKey, supportersJson);
        redisTemplate.expire(hasNewRedisKey, 60 * 60 * 24, java.util.concurrent.TimeUnit.SECONDS);


        if (newWork == null) {
            newWork = NewWork.builder()
                    .photo(uploadedPhoto)
                    .photographer(photographer)
                    .photographerId(UUID.fromString(photographer.getUserId().toString()))
                    .build();
        } else {
            newWork.setPhoto(uploadedPhoto);
        }

        return newWork;
    }

    public Photo createPhoto(User photographer, UUID photoId, PhotoUrl uploadedPhotoUrl, PhotoDto.CreatePhotoRequest photoUploadRequest, PhotoLocation photoLocation) {
        return Photo.builder()
                .user(photographer)
                .photoId(photoId)
                .photoUrl(uploadedPhotoUrl)
                .title(photoUploadRequest.getTitle())
                .description(photoUploadRequest.getDescription())
                .createdAt(LocalDateTime.now())
                .time(photoUploadRequest.getTime())
                .photoLocation(photoLocation)
                .build();
    }

    public PhotoDto createPhotoDto(UUID photoId, PhotoUrl uploadedPhotoUrl) {
        return PhotoDto.builder()
                .photoId(photoId)
                .photoUrl(uploadedPhotoUrl)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Override
    @Transactional
    public PhotoDto.GetResponse getPhoto(UUID photoId) {
        Photo photo = photoRepository.findByPhotoId(photoId).orElseThrow(() -> new PhotoException(PhotoErrorResult.PHOTO_NOT_FOUND));

        List<PhotoGenre> photoGenres = photoGenreRepository.findByPhoto(photo).orElseThrow(() -> new PhotoException(PhotoErrorResult.PHOTO_GENRE_NOT_FOUND));

        PhotoDto.EquipmentIdsRequest equipmentNames = PhotoDto.EquipmentIdsRequest.builder()
                .equipmentNames(
                        photo.getPhotoEquipments()
                                .stream()
                                .map(equipment -> equipment.getPhotoEquipmentName())
                                .collect(Collectors.toList())  // 수정된 부분
                )
                .build();


        PhotoDto.LocationRequest locationRequest = PhotoDto.LocationRequest.builder()
                .longitude(photo.getPhotoLocation().getLongitude())
                .latitude(photo.getPhotoLocation().getLatitude())
                .state(photo.getPhotoLocation().getState())
                .city(photo.getPhotoLocation().getCity())
                .town(photo.getPhotoLocation().getTown())
                .build();

        PhotoDto.UrlRequest urlRequest = PhotoDto.UrlRequest.builder()
                .cloudfrontUrl(photo.getPhotoUrl().getCloudfrontUrl())
                .build();

        log.info("photo.getPhotoGenres(): {}", photo.getPhotoGenres());

        //PhotoGenre to Long
        List<PhotoDto.GenreDto> genres = photoGenres
                .stream()
                .map(photoGenre -> PhotoDto.GenreDto.builder()
                        .genreId(photoGenre.getGenre().getGenreId().toString())
                        .genreName(photoGenre.getGenre().getGenreName())
                        .build())
                .collect(Collectors.toList());

        List<String> equipments = photo.getPhotoEquipments()
                .stream()
                .map(photoEquipment -> photoEquipment.getPhotoEquipmentName())
                .collect(Collectors.toList());


        PhotoDto.GetResponse getPhotoResponse = PhotoDto.GetResponse.builder()
                .photoId(photo.getPhotoId().toString())
                .title(photo.getTitle())
                .description(photo.getDescription())
                .time(photo.getTime())
                .photoUrl(urlRequest)
                .photoLocation(locationRequest)
                .equipments(equipments)
                .genres(genres)
                .viewCount(photo.getViewCount())
                .createdAt(String.valueOf(photo.getCreatedAt()))
                .build();


        return getPhotoResponse;
    }

    @Override
    @Transactional
    public PhotoDto.GetGenresResponse getGenres() {
        List<Genre> genres = genreRepository.findAll();

        List<PhotoDto.GenreDto> genreDtos = genres
                .stream()
                .map(genre -> PhotoDto.GenreDto.builder()
                        .genreId(String.valueOf(genre.getGenreId()))
                        .genreName(genre.getGenreName())
                        .build())
                .collect(Collectors.toList());

        PhotoDto.GetGenresResponse getGenresResponse = PhotoDto.GetGenresResponse.builder()
                .genres(genreDtos)
                .build();

        return getGenresResponse;
    }

    @Override
    @Transactional
    public PhotoDto.DeleteResponse deletePhoto(UUID photoId) {
        Photo photo = photoRepository.findByPhotoId(photoId).orElseThrow(() -> new PhotoException(PhotoErrorResult.PHOTO_NOT_FOUND));

        photoRepository.delete(photo);

        redisTemplate.delete("*" + photoId.toString());

        PhotoDto.DeleteResponse photoDeleteResponse = PhotoDto.DeleteResponse.builder()
                .photoId(photo.getPhotoId().toString())
                .build();

        return photoDeleteResponse;
    }

    @Override
    public Page<PhotoDto.ReadRegionGroupResponse> getTop10ByUserLocationGroupBy(PhotoPointFilter photoPointFilter,
                                                                                LocationGroupType locationGroupType) {

        final Page<PhotoDto.ReadRegionGroupResponse> photoReadRegionGroupResponse;

        switch (locationGroupType) {
            case STATE:
                photoReadRegionGroupResponse = photoRepository.findTop10ByUserLocationGroupByState(photoPointFilter);
                return photoReadRegionGroupResponse;
            case CITY:
                photoReadRegionGroupResponse = photoRepository.findTop10ByUserLocationGroupByCity(photoPointFilter);
                return photoReadRegionGroupResponse;
            case TOWN:
                photoReadRegionGroupResponse = photoRepository.findTop10ByUserLocationGroupByTown(photoPointFilter);
                return photoReadRegionGroupResponse;
            default:
                throw new PhotoException(PhotoErrorResult.INVALID_LOCATION_GROUP_TYPE);
        }
    }

    @Override
    public Page<PhotoDto.ReadResponse> readByAddress(PhotoAddressFilter photoAddressFilter, Integer page, Integer size, Sort sort) {

        final Pageable pageable = PageRequest.of(page, size, sort);

        final Page<PhotoDto.ReadResponse> photoReadByAddressResponse;

        final PhotoAddressSearchType photoAddressSearchType = photoAddressFilter.getSearchType();

        switch (photoAddressSearchType) {
            case STATE:
                photoReadByAddressResponse = photoRepository.findAllByPhotoLocationState(photoAddressFilter, pageable);
                return photoReadByAddressResponse;
            case CITY:
                photoReadByAddressResponse = photoRepository.findAllByPhotoLocationStateAndCity(photoAddressFilter, pageable);
                return photoReadByAddressResponse;
            case TOWN:
                photoReadByAddressResponse = photoRepository.findAllByPhotoLocationStateAndCityAndTown(photoAddressFilter, pageable);
                return photoReadByAddressResponse;
            default:
                throw new PhotoException(PhotoErrorResult.INVALID_ADDRESS_FILTER);
        }
    }
}
