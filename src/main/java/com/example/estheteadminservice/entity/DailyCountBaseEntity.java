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
    private LocalDate date;

    @Column(name = "daily_count")
    private Long count;

    public DailyCountBaseEntity(Long count) {
        this.date = LocalDate.now();
        this.count = count;
    }
}
