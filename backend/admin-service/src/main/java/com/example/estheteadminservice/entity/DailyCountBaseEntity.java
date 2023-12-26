package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DailyCountBaseEntity {

    @Column(name = "aggregate_date")
    private LocalDate aggregateDate;

    @Column(name = "daily_count")
    private Long dailyCount;

    public DailyCountBaseEntity(Long count) {
        this.aggregateDate = LocalDate.now();
        this.dailyCount = count;
    }
}
