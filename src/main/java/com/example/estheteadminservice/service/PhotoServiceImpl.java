package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookDto;
import com.example.estheteadminservice.dto.PhotoDto;
import com.example.estheteadminservice.exception.GuestBookErrorResult;
import com.example.estheteadminservice.exception.GuestBookException;
import com.example.estheteadminservice.exception.PhotoErrorResult;
import com.example.estheteadminservice.exception.PhotoException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {

    @Value("${services.core-service}")
    private String CORE_SERVICE;

    @Override
    public PhotoDto.DeleteResponse deletePhoto(UUID photoId) {
        WebClient webClient = WebClient.builder()
                .baseUrl(CORE_SERVICE)
                .build();

        PhotoDto.DeleteResponse photoDeleteResponse = webClient.delete()
                .uri("/photos/{photoId}", photoId)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                    throw new PhotoException(PhotoErrorResult.PHOTO_NOT_FOUND);
                })
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> {
                    throw new PhotoException(PhotoErrorResult.FAILED_TO_DELETE_PHOTO);
                })
                .bodyToMono(PhotoDto.DeleteResponse.class)
                .block();

        return photoDeleteResponse;
    }
}
