package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.service.DailyCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final DailyCountService dailyCountService;

    @GetMapping("/exhibition/count/daily")
    public ResponseEntity<Page<DailyCountDto.Exhibition>>
    getExhibitionDailyCount(@RequestParam(value = "page", defaultValue = "0") Integer page,
                            @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<DailyCountDto.Exhibition> exhibitionDailyCountPage
                = dailyCountService.getExhibitionDailyCount(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(exhibitionDailyCountPage);
    }

    @GetMapping("/user/count/daily")
    public ResponseEntity<Page<DailyCountDto.User>>
    getUserDailyCount(@RequestParam(value = "page", defaultValue = "0") Integer page,
                      @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<DailyCountDto.User> userDailyCountPage
                = dailyCountService.getUserDailyCount(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(userDailyCountPage);
    }

    @GetMapping("/abusing-reports/guest-books/count/daily")
    public ResponseEntity<Page<DailyCountDto.GuestBookAbusingReport>>
    getGuestBookAbusingReportDailyCount(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                        @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<DailyCountDto.GuestBookAbusingReport> guestBookAbusingReportDailyCountPage
                = dailyCountService.getGuestBookAbusingReportDailyCount(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(guestBookAbusingReportDailyCountPage);
    }

    @GetMapping("/abusing-reports/photos/count/daily")
    public ResponseEntity<Page<DailyCountDto.PhotoAbusingReport>>
    getPhotoAbusingReportDailyCount(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                    @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<DailyCountDto.PhotoAbusingReport> photoAbusingReportDailyCountPage
                = dailyCountService.getPhotoAbusingReportDailyCount(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(photoAbusingReportDailyCountPage);
    }

}
