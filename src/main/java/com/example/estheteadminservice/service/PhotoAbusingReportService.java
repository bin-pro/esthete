package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface PhotoAbusingReportService {
    void createPhotoAbusingReport(PhotoAbusingReportDto.CreateRequest photoAbusingReportCreateRequest);

    Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> readReportedPhoto(Integer page, Integer size);

    Page<PhotoAbusingReportDto.ReadDetailedInfoResponse> readDetailedInfoOfReportedPhoto(UUID photoId, Integer page, Integer size);

    PhotoAbusingReportDto.DeleteResponse deletePhotoAbusingReport(UUID photoAbusingReportId);
}
