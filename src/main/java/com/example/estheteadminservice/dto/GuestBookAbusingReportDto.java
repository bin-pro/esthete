package com.example.estheteadminservice.dto;

import com.example.estheteadminservice.entity.GuestBook;
import com.example.estheteadminservice.entity.GuestBookAbusingReport;
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
    class CreateRequest {
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

    class ReadReportedGuestBookResponse {
        private String guestBookId;
        private String photographerId;
        private String photographerNickname;
        private String photographerProfileImg;
        private String guestBookAuthorId;
        private String guestBookAuthorNickname;
        private String guestBookAuthorProfileImg;
        private String guestBookContent;
        private String guestBookCreatedAt;
        private Long guestBookAbusingReportCount;

        public ReadReportedGuestBookResponse(GuestBook guestBook) {
            this.guestBookId = guestBook.getGuestBookId().toString();
            this.photographerId = guestBook.getPhotographer().getPhotographerId().toString();
            this.photographerNickname = guestBook.getPhotographer().getNickname();
            this.photographerProfileImg = guestBook.getPhotographer().getProfileImgUrl();
            this.guestBookAuthorId = guestBook.getGuestBookAuthor().getGuestBookAuthorId().toString();
            this.guestBookAuthorNickname = guestBook.getGuestBookAuthor().getNickname();
            this.guestBookAuthorProfileImg = guestBook.getGuestBookAuthor().getProfileImgUrl();
            this.guestBookContent = guestBook.getContent();
            this.guestBookCreatedAt = guestBook.getCreatedAt().toString();
            this.guestBookAbusingReportCount = (long) guestBook.getGuestBookAbusingReports().size();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    class ReadDetailedInfoResponse {
        private String reporterId;
        private String reporterNickname;
        private String reporterProfileImg;
        private String reportReason;
        private Long reporterGuestBookAbusingReportCount;

        public ReadDetailedInfoResponse(GuestBookAbusingReport guestBookAbusingReport) {
            this.reporterId = guestBookAbusingReport.getAbusingReporter().getAbusingReporterId().toString();
            this.reporterNickname = guestBookAbusingReport.getAbusingReporter().getNickname();
            this.reporterProfileImg = guestBookAbusingReport.getAbusingReporter().getProfileImgUrl();
            this.reportReason = guestBookAbusingReport.getReason();
            this.reporterGuestBookAbusingReportCount =
                    (long) guestBookAbusingReport.getAbusingReporter().getGuestBookAbusingReports().size();
        }
    }
}