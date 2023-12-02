package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "photo_abusing_report_daily_counts")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class PhotoAbusingReportDailyCount extends DailyCountBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder(builderMethodName = "generatePhotoAbusingReportDailyCount")
    public PhotoAbusingReportDailyCount(Long count) {
        super(count);
    }
}
