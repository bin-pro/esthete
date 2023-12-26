package com.example.estheteadminservice.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN("ADMIN"),
    MANAGER("MANAGER");

    private final String role;
}
