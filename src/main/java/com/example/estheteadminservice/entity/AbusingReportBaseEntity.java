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

    @Column(columnDefinition = "BINARY(16)", name = "reported_uuid")
    private UUID reporterId;

    private String reporterNickname;

    private String reporterProfileImgUrl;

    private String reason;

    private String content;

    private LocalDateTime createdAt;

    @Builder
    public AbusingReportBaseEntity(UUID reporterId, String reporterNickname, String reporterProfileImgUrl, String reason, String content) {
        this.reporterId = reporterId;
        this.reporterNickname = reporterNickname;
        this.reporterProfileImgUrl = reporterProfileImgUrl;
        this.reason = reason;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.reportId == null) {
            this.reportId = UUID.randomUUID();
        }
    }
}
