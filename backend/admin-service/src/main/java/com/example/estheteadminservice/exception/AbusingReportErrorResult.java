package com.example.estheteadminservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AbusingReportErrorResult {
    ABUSING_REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 신고가 존재하지 않습니다.");

    private final HttpStatus status;

    private final String message;
}
