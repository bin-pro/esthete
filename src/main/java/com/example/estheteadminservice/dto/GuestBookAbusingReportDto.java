package com.example.estheteadminservice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface GuestBookAbusingReportDto {

        @Data
        @Builder
        @NoArgsConstructor
        @AllArgsConstructor
        @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
        @JsonInclude(JsonInclude.Include.NON_NULL)
        class createRequest {
                private String guestBookId;
                private String photographerId;
                private String photographerNickname;
                private String photographerProfileImg;
                private String guestBookAuthorId;
                private String guestBookAuthorNickname;
                private String guestBookAuthorProfileImg;
                private String guestBookContent;
                private String guestBookCreatedAt;
                private String reporterId;
                private String reporterNickname;
                private String reporterProfileImg;
                private String reason;
        }
}