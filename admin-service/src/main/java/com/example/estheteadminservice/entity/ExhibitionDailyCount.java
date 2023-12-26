package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "exhibition_daily_counts")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class ExhibitionDailyCount extends DailyCountBaseEntity {
    @Id
    @Column(name = "exhibition_daily_count_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder(builderMethodName = "generateExhibitionDailyCount")
    public ExhibitionDailyCount(Long count) {
        super(count);
    }
}
