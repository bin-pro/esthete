package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.entity.ExhibitionDailyCount;
import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount;
import com.example.estheteadminservice.entity.UserDailyCount;
import com.example.estheteadminservice.repository.ExhibitionDailyCountRepository;
import com.example.estheteadminservice.repository.GuestBookAbusingReportDailyCountRepository;
import com.example.estheteadminservice.repository.PhotoAbusingReportDailyCountRepository;
import com.example.estheteadminservice.repository.UserDailyCountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatusCode;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class DailyCountServiceImpl implements DailyCountService {

    private final ExhibitionDailyCountRepository exhibitionDailyCountRepository;
    private final UserDailyCountRepository userDailyCountRepository;
    private final GuestBookAbusingReportDailyCountRepository guestBookAbusingReportDailyCountRepository;
    private final PhotoAbusingReportDailyCountRepository photoAbusingReportDailyCountRepository;

    @Value("${services.core-service}")
    private String CORE_SERVICE;

    @Override
    @Scheduled(cron = "0 0 0 * * *")
    public void createExhibitionDailyCount() {
        final WebClient webClient = WebClient.builder()
                .baseUrl(CORE_SERVICE)
                .build();

        ExhibitionDailyCount exhibitionDailyCount;

        try {
            exhibitionDailyCount = webClient.get()
                    .uri("/statistics/exhibitions/daily-count")
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse -> {
                        throw new RuntimeException();
                    })
                    .bodyToMono(ExhibitionDailyCount.class)
                    .block();
        } catch (Exception e) {
            log.error("전시 관련 통계를 가져오는데 실패했습니다.");
            exhibitionDailyCount = ExhibitionDailyCount.generateExhibitionDailyCount()
                    .count(0L)
                    .build();
        }

        exhibitionDailyCountRepository.save(exhibitionDailyCount);
    }

    @Override
    @Scheduled(cron = "0 0 0 * * *")
    public void createUserDailyCount() {
        final WebClient webClient = WebClient.builder()
                .baseUrl(CORE_SERVICE)
                .build();

        UserDailyCount userDailyCount;

        try {
            userDailyCount = webClient.get()
                    .uri("/statistics/users/daily-count")
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, clientResponse -> {
                        throw new RuntimeException();
                    })
                    .bodyToMono(UserDailyCount.class)
                    .block();
        } catch (Exception e) {
            log.error("사용자 관련 통계를 가져오는데 실패했습니다.");
            userDailyCount = UserDailyCount.generateUserDailyCount()
                    .count(0L)
                    .build();
        }

        userDailyCountRepository.save(userDailyCount);
    }

    @Override
    @Scheduled(cron = "0 0 0 * * *")
    public void createGuestBookAbusingReportDailyCount() {
        GuestBookAbusingReportDailyCount guestBookAbusingReportDailyCount;

        try {
            guestBookAbusingReportDailyCount = guestBookAbusingReportDailyCountRepository.getDailyCount();
        } catch (Exception e) {
            log.error("방명록 신고 관련 통계를 가져오는데 실패했습니다.");
            guestBookAbusingReportDailyCount = GuestBookAbusingReportDailyCount.generateGuestBookAbusingReportDailyCount()
                    .count(0L)
                    .build();
        }

        guestBookAbusingReportDailyCountRepository.save(guestBookAbusingReportDailyCount);
    }

    @Override
    @Scheduled(cron = "0 0 0 * * *")
    public void createPhotoAbusingReportDailyCount() {
        PhotoAbusingReportDailyCount photoAbusingReportDailyCount;

        try {
            photoAbusingReportDailyCount = photoAbusingReportDailyCountRepository.getDailyCount();
        } catch (Exception e) {
            log.error("사진 신고 관련 통계를 가져오는데 실패했습니다.");
            photoAbusingReportDailyCount = PhotoAbusingReportDailyCount.generatePhotoAbusingReportDailyCount()
                    .count(0L)
                    .build();
        }

        photoAbusingReportDailyCountRepository.save(photoAbusingReportDailyCount);
    }

    @Override
    public Page<DailyCountDto.Exhibition> getExhibitionDailyCount(Integer page, Integer size) {
        return null;
    }

    @Override
    public Page<DailyCountDto.User> getUserDailyCount(Integer page, Integer size) {
        return null;
    }

    @Override
    public Page<DailyCountDto.GuestBookAbusingReport> getGuestBookAbusingReportDailyCount(Integer page, Integer size) {
        return null;
    }

    @Override
    public Page<DailyCountDto.PhotoAbusingReport> getPhotoAbusingReportDailyCount(Integer page, Integer size) {
        return null;
    }
}
