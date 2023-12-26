package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AbusingReportBaseEntity {

    @Column(columnDefinition = "BINARY(16)", name = "report_uuid")
    private UUID reportId;

    @Column(name = "report_reason")
    private String reason;

    private LocalDateTime createdAt;

    @Builder
    public AbusingReportBaseEntity(String reason) {
        this.reason = reason;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.reportId == null) {
            this.reportId = UUID.randomUUID();
        }
    }
}
