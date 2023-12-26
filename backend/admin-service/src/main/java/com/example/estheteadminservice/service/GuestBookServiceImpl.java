package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookDto;
import com.example.estheteadminservice.entity.GuestBook;
import com.example.estheteadminservice.exception.GuestBookErrorResult;
import com.example.estheteadminservice.exception.GuestBookException;
import com.example.estheteadminservice.repository.GuestBookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService {

    private final GuestBookRepository guestBookRepository;

    @Value("${services.core-service}")
    private String CORE_SERVICE;

    @Override
    @Transactional
    public GuestBookDto.DeleteResponse deleteGuestBook(UUID guestBookId) {

        final GuestBook guestBook = guestBookRepository.findByGuestBookId(guestBookId)
                .orElseThrow(() -> new GuestBookException(GuestBookErrorResult.GUEST_BOOK_NOT_FOUND));

        guestBookRepository.delete(guestBook);

        WebClient webClient = WebClient.builder()
                .baseUrl(CORE_SERVICE)
                .build();

        GuestBookDto.DeleteResponse guestBookDeleteResponse = webClient.delete()
                .uri("/guest-books/{guestBookId}", guestBookId)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                    throw new GuestBookException(GuestBookErrorResult.GUEST_BOOK_NOT_FOUND);
                })
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> {
                    throw new GuestBookException(GuestBookErrorResult.FAILED_TO_DELETE_GUEST_BOOK);
                })
                .bodyToMono(GuestBookDto.DeleteResponse.class)
                .block();

        return guestBookDeleteResponse;
    }
}
