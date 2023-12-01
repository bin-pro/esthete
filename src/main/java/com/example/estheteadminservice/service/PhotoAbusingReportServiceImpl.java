package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import com.example.estheteadminservice.entity.AbusingReporter;
import com.example.estheteadminservice.entity.Photo;
import com.example.estheteadminservice.entity.PhotoAbusingReport;
import com.example.estheteadminservice.entity.Photographer;
import com.example.estheteadminservice.repository.AbusingReporterRepository;
import com.example.estheteadminservice.repository.PhotoAbusingReportRepository;
import com.example.estheteadminservice.repository.PhotoRepository;
import com.example.estheteadminservice.repository.PhotographerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoAbusingReportServiceImpl implements PhotoAbusingReportService {

    private final PhotoAbusingReportRepository photoAbusingReportRepository;
    private final PhotoRepository photoRepository;
    private final PhotographerRepository photographerRepository;
    private final AbusingReporterRepository abusingReporterRepository;

    @Override
    @Transactional
    public void createPhotoAbusingReport(PhotoAbusingReportDto.CreateRequest photoAbusingReportCreateRequest) {

        final UUID photographerId = UUID.fromString(photoAbusingReportCreateRequest.getPhotographerId());

        Optional<Photographer> photographer = photographerRepository.findByPhotographerId(photographerId);

        if (photographer.isEmpty()) {
            photographer = Optional.of(photographerRepository.save(Photographer.generatePhotographer()
                    .photographerId(photographerId)
                    .nickname(photoAbusingReportCreateRequest.getPhotographerNickname())
                    .profileImgUrl(photoAbusingReportCreateRequest.getPhotographerProfileImg())
                    .build()));
        }

        final UUID photoId = UUID.fromString(photoAbusingReportCreateRequest.getPhotoId());

        Optional<Photo> photo = photoRepository.findByPhotoId(photoId);

        if (photo.isEmpty()) {
            photo = Optional.of(photoRepository.save(Photo.generatePhoto()
                    .photoId(photoId)
                    .photoUrl(photoAbusingReportCreateRequest.getPhotoUrl())
                    .title(photoAbusingReportCreateRequest.getPhotoTitle())
                    .description(photoAbusingReportCreateRequest.getPhotoDescription())
                    .createdAt(LocalDateTime.parse(photoAbusingReportCreateRequest.getPhotoCreatedAt()))
                    .photographer(photographer.get())
                    .build()));
        }

        final UUID abusingReporterId = UUID.fromString(photoAbusingReportCreateRequest.getReporterId());

        Optional<AbusingReporter> abusingReporter = abusingReporterRepository.findByAbusingReporterId(abusingReporterId);

        if (abusingReporter.isEmpty()) {
            abusingReporter = Optional.of(abusingReporterRepository.save(AbusingReporter.generateAbusingReporter()
                    .abusingReporterId(abusingReporterId)
                    .nickname(photoAbusingReportCreateRequest.getReporterNickname())
                    .profileImgUrl(photoAbusingReportCreateRequest.getReporterProfileImg())
                    .build()));
        }

        photoAbusingReportRepository.save(
                PhotoAbusingReport.generatePhotoAbusingReport()
                        .photo(photo.get())
                        .abusingReporter(abusingReporter.get())
                        .reason(photoAbusingReportCreateRequest.getReason())
                        .build()
        );
    }

    @Override
    public Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> readReportedPhoto(Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        final Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> readReportedPhotoResponsePage
                = photoRepository.findAllReportedPhoto(pageable);

        return readReportedPhotoResponsePage;
    }

    @Override
    public Page<PhotoAbusingReportDto.ReadDetailedInfoResponse> readDetailedInfoOfReportedPhoto(UUID photoId, Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        final Page<PhotoAbusingReportDto.ReadDetailedInfoResponse> readDetailedPhotoAbusingReportInfoResponsePage
                = photoAbusingReportRepository.findDetailedInfoOfReportedPhoto(photoId, pageable);

        return readDetailedPhotoAbusingReportInfoResponsePage;
    }
}
