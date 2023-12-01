package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import com.example.estheteadminservice.entity.Photo;
import com.example.estheteadminservice.entity.PhotoAbusingReport;
import com.example.estheteadminservice.entity.Photographer;
import com.example.estheteadminservice.repository.PhotoAbusingReportRepository;
import com.example.estheteadminservice.repository.PhotoRepository;
import com.example.estheteadminservice.repository.PhotographerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoAbusingReportServiceImpl implements PhotoAbusingReportService {

    private final PhotoAbusingReportRepository photoAbusingReportRepository;
    private final PhotoRepository photoRepository;
    private final PhotographerRepository photographerRepository;

    @Override
    public void createPhotoAbusingReport(PhotoAbusingReportDto.createRequest photoAbusingReportCreateRequest) {

        final UUID photographerId = UUID.fromString(photoAbusingReportCreateRequest.getPhotographerId());

        final Photographer photographer = photographerRepository.findByPhotographerId(photographerId).orElse(
                photographerRepository.save(Photographer.generatePhotographer()
                        .photographerId(photographerId)
                        .nickname(photoAbusingReportCreateRequest.getPhotographerNickname())
                        .profileImgUrl(photoAbusingReportCreateRequest.getPhotographerProfileImg())
                        .build())
        );

        final UUID photoId = UUID.fromString(photoAbusingReportCreateRequest.getPhotoId());

        final Photo photo = photoRepository.findByPhotoId(photoId).orElse(
                photoRepository.save(Photo.generatePhoto()
                        .photoId(photoId)
                        .photoUrl(photoAbusingReportCreateRequest.getPhotoUrl())
                        .title(photoAbusingReportCreateRequest.getPhotoTitle())
                        .description(photoAbusingReportCreateRequest.getPhotoDescription())
                        .createdAt(LocalDateTime.parse(photoAbusingReportCreateRequest.getPhotoCreatedAt()))
                        .photographer(photographer)
                        .build())
        );

        photoAbusingReportRepository.save(
                PhotoAbusingReport.generatePhotoAbusingReport()
                        .photo(photo)
                        .reporterId(UUID.fromString(photoAbusingReportCreateRequest.getReporterId()))
                        .reporterNickname(photoAbusingReportCreateRequest.getReporterNickname())
                        .reporterProfileImgUrl(photoAbusingReportCreateRequest.getReporterProfileImg())
                        .reason(photoAbusingReportCreateRequest.getReason())
                        .build()
        );
    }
}
