package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import org.springframework.data.domain.Page;

public interface PhotoAbusingReportService {
    void createPhotoAbusingReport(PhotoAbusingReportDto.CreateRequest photoAbusingReportCreateRequest);

    Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> readReportedPhoto(Integer page, Integer size);
}
