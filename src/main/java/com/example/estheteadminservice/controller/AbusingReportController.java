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

import java.util.UUID;

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
    readAllReportedPhoto(@RequestParam(value = "page", defaultValue = "0") Integer page,
                         @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> readReportedPhotoResponsePage
                = photoAbusingReportService.readReportedPhoto(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readReportedPhotoResponsePage);
    }

    @GetMapping("/photos/details")
    public ResponseEntity<Page<PhotoAbusingReportDto.ReadDetailedInfoResponse>>
    readDetailedInfoOfReportedPhoto(@RequestParam("photoId") UUID photoId,
                                    @RequestParam(value = "page", defaultValue = "0") Integer page,
                                    @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<PhotoAbusingReportDto.ReadDetailedInfoResponse> readDetailedInfoResponsePage
                = photoAbusingReportService.readDetailedInfoOfReportedPhoto(photoId, page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readDetailedInfoResponsePage);
    }

    @DeleteMapping("/photos/details/{photoAbusingReportId}")
    public ResponseEntity<PhotoAbusingReportDto.DeleteResponse>
    deletePhotoAbusingReport(@PathVariable("photoAbusingReportId") UUID photoAbusingReportId) {

        PhotoAbusingReportDto.DeleteResponse photoAbusingReportDeleteResponse
                = photoAbusingReportService.deletePhotoAbusingReport(photoAbusingReportId);

        return ResponseEntity.status(HttpStatus.OK).body(photoAbusingReportDeleteResponse);
    }

    @DeleteMapping("/photos/{photoId}")
    public ResponseEntity<PhotoAbusingReportDto.DeleteAllResponse>
    deleteAllPhotoAbusingReportByPhotoId(@PathVariable("photoId") UUID photoId) {

        PhotoAbusingReportDto.DeleteAllResponse photoAbusingReportDeleteAllResponse
                = photoAbusingReportService.deleteAllPhotoAbusingReportByPhotoId(photoId);

        return ResponseEntity.status(HttpStatus.OK).body(photoAbusingReportDeleteAllResponse);
    }

    @PostMapping("/guest-books")
    public ResponseEntity createGuestBookAbusingReport(
            @RequestBody GuestBookAbusingReportDto.CreateRequest guestBookAbusingReportCreateRequest) {

        guestBookAbusingReportService.createGuestBookAbusingReport(guestBookAbusingReportCreateRequest);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/guest-books")
    public ResponseEntity<Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse>>
    readAllReportedGuestBook(@RequestParam(value = "page", defaultValue = "0") Integer page,
                             @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> readReportedGuestBookResponsePage
                = guestBookAbusingReportService.readReportedGuestBook(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readReportedGuestBookResponsePage);
    }

    @GetMapping("/guest-books/details")
    public ResponseEntity<Page<GuestBookAbusingReportDto.ReadDetailedInfoResponse>>
    readDetailedInfoOfReportedGuestBook(@RequestParam("guestBookId") UUID guestBookId,
                                        @RequestParam(value = "page", defaultValue = "0") Integer page,
                                        @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<GuestBookAbusingReportDto.ReadDetailedInfoResponse> readDetailedInfoResponsePage
                = guestBookAbusingReportService.readDetailedInfoOfReportedGuestBook(guestBookId, page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readDetailedInfoResponsePage);
    }

    @DeleteMapping("/guest-books/details/{guestBookAbusingReportId}")
    public ResponseEntity<GuestBookAbusingReportDto.DeleteResponse>
    deleteGuestBookAbusingReport(@PathVariable("guestBookAbusingReportId") UUID guestBookAbusingReportId) {

        GuestBookAbusingReportDto.DeleteResponse guestBookAbusingReportDeleteResponse
                = guestBookAbusingReportService.deleteGuestBookAbusingReport(guestBookAbusingReportId);

        return ResponseEntity.status(HttpStatus.OK).body(guestBookAbusingReportDeleteResponse);
    }

    @DeleteMapping("/guest-books/{guestBookId}")
    public ResponseEntity<GuestBookAbusingReportDto.DeleteAllResponse>
    deleteAllGuestBookAbusingReportByGuestBookId(@PathVariable("guestBookId") UUID guestBookId) {

        GuestBookAbusingReportDto.DeleteAllResponse guestBookAbusingReportDeleteAllResponse
                = guestBookAbusingReportService.deleteAllGuestBookAbusingReportByGuestBookId(guestBookId);

        return ResponseEntity.status(HttpStatus.OK).body(guestBookAbusingReportDeleteAllResponse);
    }
}
