package com.example.estheteadminservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PhotoException extends RuntimeException {
    private final PhotoErrorResult photoErrorResult;
}