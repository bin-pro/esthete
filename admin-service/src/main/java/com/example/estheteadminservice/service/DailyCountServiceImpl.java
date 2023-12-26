package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.dto.ExhibitionDailyCountDto;
import com.example.estheteadminservice.dto.UserDailyCountDto;
import com.example.estheteadminservice.entity.ExhibitionDailyCount;
import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount;
import com.example.estheteadminservice.entity.UserDailyCount;
import com.example.estheteadminservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableAsync
public class DailyCountServiceImpl implements DailyCountService {

    private final ExhibitionDailyCountRepository exhibitionDailyCountRepository;
    private final UserDailyCountRepository userDailyCountRepository;
    private final GuestBookAbusingReportDailyCountRepository guestBookAbusingReportDailyCountRepository;
    private final GuestBookAbusingReportRepository guestBookAbusingReportRepository;
    private final PhotoAbusingReportDailyCountRepository photoAbusingReportDailyCountRepository;
    private final PhotoAbusingReportRepository photoAbusingReportRepository;

    @Value("${services.core-service}")
    private String CORE_SERVICE;

    @Value("${statistics.count-interval-minutes}")
    private int COUNT_INTERVAL_MINUTES;

    @Async
    @Override
    @Scheduled(cron = "${statistics.cron-expression}")
    public void createExhibitionDailyCount() {

        log.info("일일 전시 등록 수 통계를 생성합니다.");

        final WebClient webClient = WebClient.builder()
                .baseUrl(CORE_SERVICE)
                .build();

        ExhibitionDailyCountDto exhibitionDailyCountDto;
        ExhibitionDailyCount exhibitionDailyCount;

        try {
            exhibitionDailyCountDto = webClient.get()
                    .uri("/statistics/exhibitions/count?interval=" + COUNT_INTERVAL_MINUTES + "&now=" + LocalDateTime.now())
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse -> {
                        throw new RuntimeException();
                    })
                    .bodyToMono(ExhibitionDailyCountDto.class)
                    .block();

            exhibitionDailyCount = ExhibitionDailyCount.generateExhibitionDailyCount()
                    .count(exhibitionDailyCountDto.getCount())
                    .build();

        } catch (Exception e) {
            log.error("일일 전시 등록 수 통계를 가져오는데 실패했습니다.");
            log.error(e.getMessage());
            exhibitionDailyCount = ExhibitionDailyCount.generateExhibitionDailyCount()
                    .count(0L)
                    .build();
        }

        exhibitionDailyCountRepository.save(exhibitionDailyCount);
    }

    @Async
    @Override
    @Scheduled(cron = "${statistics.cron-expression}")
    public void createUserDailyCount() {

        log.info("일일 가입자 수 통계를 생성합니다.");

        final WebClient webClient = WebClient.builder()
                .baseUrl(CORE_SERVICE)
                .build();

        UserDailyCountDto userDailyCountDto;
        UserDailyCount userDailyCount;

        try {
            userDailyCountDto = webClient.get()
                    .uri("/statistics/users/count?interval=" + COUNT_INTERVAL_MINUTES + "&now=" + LocalDateTime.now())
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse -> {
                        throw new RuntimeException();
                    })
                    .bodyToMono(UserDailyCountDto.class)
                    .block();

            userDailyCount = UserDailyCount.generateUserDailyCount()
                    .count(userDailyCountDto.getCount())
                    .build();

        } catch (Exception e) {
            log.error("일일 가입자 수 통계를 가져오는데 실패했습니다.");
            log.error(e.getMessage());
            userDailyCount = UserDailyCount.generateUserDailyCount()
                    .count(0L)
                    .build();
        }

        userDailyCountRepository.save(userDailyCount);
    }

    @Async
    @Override
    @Scheduled(cron = "${statistics.cron-expression}")
    public void createGuestBookAbusingReportDailyCount() {

        log.info("일일 방명록 신고 수 통계를 생성합니다.");

        GuestBookAbusingReportDailyCount guestBookAbusingReportDailyCount;

        try {
            guestBookAbusingReportDailyCount = guestBookAbusingReportRepository.getDailyCount(LocalDateTime.now(), COUNT_INTERVAL_MINUTES);
        } catch (Exception e) {
            log.error("일일 방명록 신고 수 통계를 가져오는데 실패했습니다.");
            log.error(e.getMessage());
            guestBookAbusingReportDailyCount = GuestBookAbusingReportDailyCount.generateGuestBookAbusingReportDailyCount()
                    .count(0L)
                    .build();
        }

        guestBookAbusingReportDailyCountRepository.save(guestBookAbusingReportDailyCount);
    }

    @Async
    @Override
    @Scheduled(cron = "${statistics.cron-expression}")
    public void createPhotoAbusingReportDailyCount() {

        log.info("일일 사진 신고 수 통계를 생성합니다.");

        PhotoAbusingReportDailyCount photoAbusingReportDailyCount;

        try {
            photoAbusingReportDailyCount = photoAbusingReportRepository.getDailyCount(LocalDateTime.now(), COUNT_INTERVAL_MINUTES);
        } catch (Exception e) {
            log.error("일일 사진 신고 수 통계를 가져오는데 실패했습니다.");
            log.error(e.getMessage());
            photoAbusingReportDailyCount = PhotoAbusingReportDailyCount.generatePhotoAbusingReportDailyCount()
                    .count(0L)
                    .build();
        }

        photoAbusingReportDailyCountRepository.save(photoAbusingReportDailyCount);
    }

    @Override
    public Page<DailyCountDto.Exhibition> getExhibitionDailyCount(Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        Page<DailyCountDto.Exhibition> exhibitionDailyCountPage
                = exhibitionDailyCountRepository.getCountPage(pageable);

        return exhibitionDailyCountPage;
    }

    @Override
    public Page<DailyCountDto.User> getUserDailyCount(Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        Page<DailyCountDto.User> userDailyCountPage
                = userDailyCountRepository.getCountPage(pageable);

        return userDailyCountPage;
    }

    @Override
    public Page<DailyCountDto.GuestBookAbusingReport> getGuestBookAbusingReportDailyCount(Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        Page<DailyCountDto.GuestBookAbusingReport> guestBookAbusingReportDailyCountPage
                = guestBookAbusingReportDailyCountRepository.getCountPage(pageable);

        return guestBookAbusingReportDailyCountPage;
    }

    @Override
    public Page<DailyCountDto.PhotoAbusingReport> getPhotoAbusingReportDailyCount(Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        Page<DailyCountDto.PhotoAbusingReport> photoAbusingReportDailyCountPage
                = photoAbusingReportDailyCountRepository.getCountPage(pageable);

        return photoAbusingReportDailyCountPage;
    }
}
