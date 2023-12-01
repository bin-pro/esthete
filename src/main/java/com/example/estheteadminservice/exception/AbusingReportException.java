package com.example.estheteadminservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AbusingReportException extends RuntimeException {
    private final AbusingReportErrorResult abusingReportErrorResult;
}
