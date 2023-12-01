package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;

public interface GuestBookAbusingReportService {

    void createGuestBookAbusingReport(GuestBookAbusingReportDto.createRequest guestBookAbusingReportCreateRequest);
}
