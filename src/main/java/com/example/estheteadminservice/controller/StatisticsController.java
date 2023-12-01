package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.DailyCountDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    @GetMapping("/exhibition/count/daily")
    public ResponseEntity<Page<DailyCountDto.Exhibition>> getExhibitionDailyCount() {
        return null;
    }

    @GetMapping("/user/count/daily")
    public ResponseEntity<Page<DailyCountDto.User>> getUserDailyCount() {
        return null;
    }

    @GetMapping("/abusing-reports/guest-books/count/daily")
    public ResponseEntity<Page<DailyCountDto.GuestBookAbusingReport>> getGuestBookAbusingReportDailyCount() {
        return null;
    }

    @GetMapping("/abusing-reports/photos/count/daily")
    public ResponseEntity<Page<DailyCountDto.PhotoAbusingReport>> getPhotoAbusingReportDailyCount() {
        return null;
    }

}
