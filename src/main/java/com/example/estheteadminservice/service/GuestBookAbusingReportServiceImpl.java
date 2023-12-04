package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.entity.*;
import com.example.estheteadminservice.exception.AbusingReportException;
import com.example.estheteadminservice.exception.AbusingReportErrorResult;
import com.example.estheteadminservice.exception.GuestBookErrorResult;
import com.example.estheteadminservice.exception.GuestBookException;
import com.example.estheteadminservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
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

        Optional<Photographer> photographer = photographerRepository.findByPhotographerId(photographerId);

        if (photographer.isEmpty()) {
            photographer = Optional.of(photographerRepository.save(Photographer.generatePhotographer()
                    .photographerId(photographerId)
                    .nickname(guestBookAbusingReportCreateRequest.getPhotographerNickname())
                    .profileImgUrl(guestBookAbusingReportCreateRequest.getPhotographerProfileImg())
                    .build()));
        }

        final UUID guestBookAuthorId = UUID.fromString(guestBookAbusingReportCreateRequest.getGuestBookAuthorId());

        Optional<GuestBookAuthor> guestBookAuthor = guestBookAuthorRepository.findByGuestBookAuthorId(guestBookAuthorId);

        if (guestBookAuthor.isEmpty()) {
            guestBookAuthor = Optional.of(guestBookAuthorRepository.save(GuestBookAuthor.generateGuestBookAuthor()
                    .guestBookAuthorId(guestBookAuthorId)
                    .nickname(guestBookAbusingReportCreateRequest.getGuestBookAuthorNickname())
                    .profileImgUrl(guestBookAbusingReportCreateRequest.getGuestBookAuthorProfileImg())
                    .build()));
        }

        final UUID guestBookId = UUID.fromString(guestBookAbusingReportCreateRequest.getGuestBookId());

        Optional<GuestBook> guestBook = guestBookRepository.findByGuestBookId(guestBookId);

        if (guestBook.isEmpty()) {
            guestBook = Optional.of(guestBookRepository.save(GuestBook.generateGuestBook()
                    .guestBookId(guestBookId)
                    .photographer(photographer.get())
                    .guestBookAuthor(guestBookAuthor.get())
                    .content(guestBookAbusingReportCreateRequest.getGuestBookContent())
                    .createdAt(LocalDateTime.parse(guestBookAbusingReportCreateRequest.getGuestBookCreatedAt()))
                    .build()));
        }

        final UUID abusingReporterId = UUID.fromString(guestBookAbusingReportCreateRequest.getReporterId());

        Optional<AbusingReporter> abusingReporter = abusingReporterRepository.findByAbusingReporterId(abusingReporterId);

        if (abusingReporter.isEmpty()) {
            abusingReporter = Optional.of(abusingReporterRepository.save(AbusingReporter.generateAbusingReporter()
                    .abusingReporterId(abusingReporterId)
                    .nickname(guestBookAbusingReportCreateRequest.getReporterNickname())
                    .profileImgUrl(guestBookAbusingReportCreateRequest.getReporterProfileImg())
                    .build()));
        }

        final GuestBookAbusingReport guestBookAbusingReport = GuestBookAbusingReport.generateGuestBookAbusingReport()
                .guestBook(guestBook.get())
                .abusingReporter(abusingReporter.get())
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

    @Override
    public Page<GuestBookAbusingReportDto.ReadDetailedInfoResponse> readDetailedInfoOfReportedGuestBook(UUID guestBookId, Integer page, Integer size) {

        final Pageable pageable = Pageable.ofSize(size).withPage(page);

        final Page<GuestBookAbusingReportDto.ReadDetailedInfoResponse> readDetailedGuestBookAbusingReportInfoResponsePage
                = guestBookAbusingReportRepository.findDetailedInfoOfReportedGuestBook(guestBookId, pageable);

        return readDetailedGuestBookAbusingReportInfoResponsePage;
    }

    @Override
    @Transactional
    public GuestBookAbusingReportDto.DeleteResponse deleteGuestBookAbusingReport(UUID guestBookAbusingReportId) {

        final GuestBookAbusingReport guestBookAbusingReport
                = guestBookAbusingReportRepository.findByReportId(guestBookAbusingReportId)
                        .orElseThrow(() -> new AbusingReportException(AbusingReportErrorResult.ABUSING_REPORT_NOT_FOUND));

        guestBookAbusingReportRepository.delete(guestBookAbusingReport);

        return GuestBookAbusingReportDto.DeleteResponse.builder()
                .guestBookAbusingReportId(guestBookAbusingReportId)
                .build();
    }

    @Override
    @Transactional
    public GuestBookAbusingReportDto.DeleteAllResponse deleteAllGuestBookAbusingReportByGuestBookId(UUID guestBookId) {

        final GuestBook guestBook = guestBookRepository.findByGuestBookId(guestBookId)
                    .orElseThrow(() -> new GuestBookException(GuestBookErrorResult.GUEST_BOOK_NOT_FOUND));

        guestBookAbusingReportRepository.deleteAllByGuestBook(guestBook);

        return GuestBookAbusingReportDto.DeleteAllResponse.builder()
                    .guestBookId(guestBookId)
                    .build();
    }
}
