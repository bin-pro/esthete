package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import org.springframework.data.domain.Page;

public interface GuestBookAbusingReportService {

    void createGuestBookAbusingReport(GuestBookAbusingReportDto.CreateRequest guestBookAbusingReportCreateRequest);

    Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> readReportedGuestBook(Integer page, Integer size);
}
