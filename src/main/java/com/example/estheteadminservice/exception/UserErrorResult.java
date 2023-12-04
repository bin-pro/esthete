package com.example.estheteadminservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorResult {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
    PASSWORD_NOT_MATCHED(HttpStatus.FORBIDDEN, "비밀번호가 일치하지 않습니다."),
    USER_NOT_MANAGER(HttpStatus.BAD_REQUEST, "사용자가 일반 관리자가 아닙니다"),
    USER_DELETE_FAILED(HttpStatus.BAD_REQUEST, "사용자 삭제에 실패했습니다.");


    private final HttpStatus httpStatus;
    private final String message;
}
