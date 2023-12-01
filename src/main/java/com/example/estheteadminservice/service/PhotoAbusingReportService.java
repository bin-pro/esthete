package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;

public interface PhotoAbusingReportService {
    void createPhotoAbusingReport(PhotoAbusingReportDto.createRequest photoAbusingReportCreateRequest);
}
