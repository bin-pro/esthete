package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface GuestBookAbusingReportService {

    void createGuestBookAbusingReport(GuestBookAbusingReportDto.CreateRequest guestBookAbusingReportCreateRequest);

    Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> readReportedGuestBook(Integer page, Integer size);

    Page<GuestBookAbusingReportDto.ReadDetailedInfoResponse> readDetailedInfoOfReportedGuestBook(UUID guestBookId, Integer page, Integer size);

    GuestBookAbusingReportDto.DeleteResponse deleteGuestBookAbusingReport(UUID guestBookAbusingReportId);
}
