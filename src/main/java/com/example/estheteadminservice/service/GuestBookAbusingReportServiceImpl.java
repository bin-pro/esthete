package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.entity.GuestBook;
import com.example.estheteadminservice.entity.GuestBookAbusingReport;
import com.example.estheteadminservice.entity.Photographer;
import com.example.estheteadminservice.repository.GuestBookAbusingReportRepository;
import com.example.estheteadminservice.repository.GuestBookRepository;
import com.example.estheteadminservice.repository.PhotographerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GuestBookAbusingReportServiceImpl implements GuestBookAbusingReportService {

    private final GuestBookAbusingReportRepository guestBookAbusingReportRepository;
    private final GuestBookRepository guestBookRepository;
    private final PhotographerRepository photographerRepository;

    @Override
    public void createGuestBookAbusingReport(GuestBookAbusingReportDto.createRequest guestBookAbusingReportCreateRequest) {

        final UUID photographerId = UUID.fromString(guestBookAbusingReportCreateRequest.getPhotographerId());

        final Photographer photographer = photographerRepository.findByPhotographerId(photographerId).orElse(
                photographerRepository.save(Photographer.generatePhotographer()
                        .photographerId(photographerId)
                        .nickname(guestBookAbusingReportCreateRequest.getPhotographerNickname())
                        .profileImgUrl(guestBookAbusingReportCreateRequest.getPhotographerProfileImg())
                        .build())
        );

        final UUID guestBookId = UUID.fromString(guestBookAbusingReportCreateRequest.getGuestBookId());

        final GuestBook guestBook = guestBookRepository.findByGuestBookId(guestBookId).orElse(
                guestBookRepository.save(GuestBook.generateGuestBook()
                        .guestBookId(guestBookId)
                        .photographer(photographer)
                        .authorId(UUID.fromString(guestBookAbusingReportCreateRequest.getGuestBookAuthorId()))
                        .authorNickname(guestBookAbusingReportCreateRequest.getGuestBookAuthorNickname())
                        .authorProfileImgUrl(guestBookAbusingReportCreateRequest.getGuestBookAuthorProfileImg())
                        .content(guestBookAbusingReportCreateRequest.getGuestBookContent())
                        .createdAt(LocalDateTime.parse(guestBookAbusingReportCreateRequest.getGuestBookCreatedAt()))
                        .build())
        );

        final GuestBookAbusingReport guestBookAbusingReport = GuestBookAbusingReport.generateGuestBookAbusingReport()
                .guestBook(guestBook)
                .reporterId(UUID.fromString(guestBookAbusingReportCreateRequest.getReporterId()))
                .reporterNickname(guestBookAbusingReportCreateRequest.getReporterNickname())
                .reporterProfileImgUrl(guestBookAbusingReportCreateRequest.getReporterProfileImg())
                .reason(guestBookAbusingReportCreateRequest.getReason())
                .build();

        guestBookAbusingReportRepository.save(guestBookAbusingReport);
    }
}
