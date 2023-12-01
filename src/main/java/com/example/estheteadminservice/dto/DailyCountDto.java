package com.example.estheteadminservice.dto;

import com.example.estheteadminservice.entity.ExhibitionDailyCount;
import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import com.example.estheteadminservice.entity.UserDailyCount;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DailyCountDto {
    private Long count;
    private String date;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Exhibition extends DailyCountDto {
        public Exhibition(ExhibitionDailyCount exhibitionDailyCount) {
            super(exhibitionDailyCount.getCount(), exhibitionDailyCount.getDate().toString());
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class User extends DailyCountDto {
        public User(UserDailyCount userDailyCount) {
            super(userDailyCount.getCount(), userDailyCount.getDate().toString());
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class GuestBookAbusingReport extends DailyCountDto {
        public GuestBookAbusingReport(GuestBookAbusingReportDailyCount guestBookAbusingReportDailyCount) {
            super(guestBookAbusingReportDailyCount.getCount(), guestBookAbusingReportDailyCount.getDate().toString());
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class PhotoAbusingReport extends DailyCountDto {
        public PhotoAbusingReport(GuestBookAbusingReportDailyCount guestBookAbusingReportDailyCount) {
            super(guestBookAbusingReportDailyCount.getCount(), guestBookAbusingReportDailyCount.getDate().toString());
        }
    }
}
