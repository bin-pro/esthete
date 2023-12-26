package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "guest_book_abusing_report_daily_counts")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class GuestBookAbusingReportDailyCount extends DailyCountBaseEntity {
    @Id
    @Column(name = "guest_book_abusing_report_daily_count_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder(builderMethodName = "generateGuestBookAbusingReportDailyCount")
    public GuestBookAbusingReportDailyCount(Long count) {
        super(count);
    }
}
