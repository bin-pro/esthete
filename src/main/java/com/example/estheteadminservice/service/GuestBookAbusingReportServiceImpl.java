package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.entity.*;
import com.example.estheteadminservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GuestBookAbusingReportServiceImpl implements GuestBookAbusingReportService {

    private final GuestBookAbusingReportRepository guestBookAbusingReportRepository;
    private final GuestBookRepository guestBookRepository;
    private final PhotographerRepository photographerRepository;
    private final GuestBookAuthorRepository guestBookAuthorRepository;
    private final AbusingReporterRepository abusingReporterRepository;

    @Override
    @Transactional
    public void createGuestBookAbusingReport(GuestBookAbusingReportDto.CreateRequest guestBookAbusingReportCreateRequest) {

        final UUID photographerId = UUID.fromString(guestBookAbusingReportCreateRequest.getPhotographerId());

        final Photographer photographer = photographerRepository.findByPhotographerId(photographerId).orElse(
                photographerRepository.save(Photographer.generatePhotographer()
                        .photographerId(photographerId)
                        .nickname(guestBookAbusingReportCreateRequest.getPhotographerNickname())
                        .profileImgUrl(guestBookAbusingReportCreateRequest.getPhotographerProfileImg())
                        .build())
        );

        final UUID guestBookAuthorId = UUID.fromString(guestBookAbusingReportCreateRequest.getGuestBookAuthorId());

        final GuestBookAuthor guestBookAuthor = guestBookAuthorRepository.findByGuestBookAuthorId(guestBookAuthorId).orElse(
                guestBookAuthorRepository.save(GuestBookAuthor.generateGuestBookAuthor()
                        .guestBookAuthorId(guestBookAuthorId)
                        .nickname(guestBookAbusingReportCreateRequest.getGuestBookAuthorNickname())
                        .profileImgUrl(guestBookAbusingReportCreateRequest.getGuestBookAuthorProfileImg())
                        .build())
        );

        final UUID guestBookId = UUID.fromString(guestBookAbusingReportCreateRequest.getGuestBookId());

        final GuestBook guestBook = guestBookRepository.findByGuestBookId(guestBookId).orElse(
                guestBookRepository.save(GuestBook.generateGuestBook()
                        .guestBookId(guestBookId)
                        .photographer(photographer)
                        .guestBookAuthor(guestBookAuthor)
                        .content(guestBookAbusingReportCreateRequest.getGuestBookContent())
                        .createdAt(LocalDateTime.parse(guestBookAbusingReportCreateRequest.getGuestBookCreatedAt()))
                        .build())
        );

        final UUID abusingReportId = UUID.randomUUID();

        final AbusingReporter abusingReporter = abusingReporterRepository.findByAbusingReporterId(abusingReportId).orElse(
                abusingReporterRepository.save(AbusingReporter.generateAbusingReporter()
                        .abusingReporterId(abusingReportId)
                        .nickname(guestBookAbusingReportCreateRequest.getReporterNickname())
                        .profileImgUrl(guestBookAbusingReportCreateRequest.getReporterProfileImg())
                        .build())
        );


        final GuestBookAbusingReport guestBookAbusingReport = GuestBookAbusingReport.generateGuestBookAbusingReport()
                .guestBook(guestBook)
                .abusingReporter(abusingReporter)
                .reason(guestBookAbusingReportCreateRequest.getReason())
                .build();

        guestBookAbusingReportRepository.save(guestBookAbusingReport);
    }

    @Override
    public Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> readReportedGuestBook(Integer page, Integer size) {

            final Pageable pageable = Pageable.ofSize(size).withPage(page);

            final Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> readReportedGuestBookResponsePage
                    = guestBookRepository.findAllReportedGuestBook(pageable);

            return readReportedGuestBookResponsePage;
    }
}
