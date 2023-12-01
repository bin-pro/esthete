package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import com.example.estheteadminservice.service.GuestBookAbusingReportService;
import com.example.estheteadminservice.service.PhotoAbusingReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/abusing-reports")
@RequiredArgsConstructor
public class AbusingReportController {

    private final PhotoAbusingReportService photoAbusingReportService;

    private final GuestBookAbusingReportService guestBookAbusingReportService;

    @PostMapping("/photos")
    public ResponseEntity createPhotoAbusingReport(@RequestBody PhotoAbusingReportDto.CreateRequest photoAbusingReportCreateRequest) {

        photoAbusingReportService.createPhotoAbusingReport(photoAbusingReportCreateRequest);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/photos")
    public ResponseEntity<Page<PhotoAbusingReportDto.ReadReportedPhotoResponse>>
    getPhotoAbusingReport(@RequestParam("page") Integer page, @RequestParam("size") Integer size) {

        Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> readReportedPhotoResponsePage
                = photoAbusingReportService.readReportedPhoto(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readReportedPhotoResponsePage);
    }

    @PostMapping("/guest-books")
    public ResponseEntity createGuestBookAbusingReport(@RequestBody GuestBookAbusingReportDto.CreateRequest guestBookAbusingReportCreateRequest) {

        guestBookAbusingReportService.createGuestBookAbusingReport(guestBookAbusingReportCreateRequest);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/guest-books")
    public ResponseEntity<Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse>>
    getGuestBookAbusingReport(@RequestParam("page") Integer page, @RequestParam("size") Integer size) {

        Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> readReportedGuestBookResponsePage
                = guestBookAbusingReportService.readReportedGuestBook(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readReportedGuestBookResponsePage);
    }
}
