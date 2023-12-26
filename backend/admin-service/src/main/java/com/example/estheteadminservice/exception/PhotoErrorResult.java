package com.example.estheteadminservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PhotoErrorResult {
    PHOTO_NOT_FOUND(HttpStatus.NOT_FOUND, "사진을 찾을 수 없습니다."),
    FAILED_TO_DELETE_PHOTO(HttpStatus.INTERNAL_SERVER_ERROR, "사진을 삭제하는데 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
