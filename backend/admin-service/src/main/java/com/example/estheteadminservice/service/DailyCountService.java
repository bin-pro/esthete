package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.DailyCountDto;
import org.springframework.data.domain.Page;

public interface DailyCountService {
    void createExhibitionDailyCount();

    void createUserDailyCount();

    void createGuestBookAbusingReportDailyCount();

    void createPhotoAbusingReportDailyCount();

    Page<DailyCountDto.Exhibition> getExhibitionDailyCount(Integer page, Integer size);

    Page<DailyCountDto.User> getUserDailyCount(Integer page, Integer size);

    Page<DailyCountDto.GuestBookAbusingReport> getGuestBookAbusingReportDailyCount(Integer page, Integer size);

    Page<DailyCountDto.PhotoAbusingReport> getPhotoAbusingReportDailyCount(Integer page, Integer size);
}
