package com.example.estheteadminservice.dto;

import com.example.estheteadminservice.entity.ExhibitionDailyCount;
import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount;
import com.example.estheteadminservice.entity.UserDailyCount;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DailyCountDto {
    private Long count;
    private String date;

    @Data
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Exhibition extends DailyCountDto {
        @Builder
        public Exhibition(ExhibitionDailyCount exhibitionDailyCount) {
            super(exhibitionDailyCount.getCount(), exhibitionDailyCount.getDate().toString());
        }
    }

    @Data
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class User extends DailyCountDto {
        @Builder
        public User(UserDailyCount userDailyCount) {
            super(userDailyCount.getCount(), userDailyCount.getDate().toString());
        }
    }

    @Data
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class GuestBookAbusingReport extends DailyCountDto {
        @Builder
        public GuestBookAbusingReport(GuestBookAbusingReportDailyCount guestBookAbusingReportDailyCount) {
            super(guestBookAbusingReportDailyCount.getCount(), guestBookAbusingReportDailyCount.getDate().toString());
        }
    }

    @Data
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class PhotoAbusingReport extends DailyCountDto {
        @Builder
        public PhotoAbusingReport(PhotoAbusingReportDailyCount photoAbusingReportDailyCount) {
            super(photoAbusingReportDailyCount.getCount(), photoAbusingReportDailyCount.getDate().toString());
        }
    }
}
