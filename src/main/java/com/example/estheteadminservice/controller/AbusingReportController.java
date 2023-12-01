package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import com.example.estheteadminservice.service.GuestBookAbusingReportService;
import com.example.estheteadminservice.service.PhotoAbusingReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/abusing-reports")
@RequiredArgsConstructor
public class AbusingReportController {

    private final PhotoAbusingReportService photoAbusingReportService;

    private final GuestBookAbusingReportService guestBookAbusingReportService;

    @PostMapping("/photos")
    public ResponseEntity createPhotoAbusingReport(@RequestBody PhotoAbusingReportDto.createRequest photoAbusingReportCreateRequest) {

        photoAbusingReportService.createPhotoAbusingReport(photoAbusingReportCreateRequest);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/guest-books")
    public ResponseEntity createGuestBookAbusingReport(@RequestBody GuestBookAbusingReportDto.createRequest guestBookAbusingReportCreateRequest) {

        guestBookAbusingReportService.createGuestBookAbusingReport(guestBookAbusingReportCreateRequest);

        return ResponseEntity.ok().build();
    }
}
