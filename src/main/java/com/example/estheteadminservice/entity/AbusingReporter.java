package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "abusing_reporters")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AbusingReporter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "BINARY(16)", name = "reported_uuid")
    private UUID abusingReporterId;

    private String nickname;

    private String profileImgUrl;

    @OneToMany(mappedBy = "abusingReporter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBookAbusingReport> guestBookAbusingReports;

    @OneToMany(mappedBy = "abusingReporter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PhotoAbusingReport> photoAbusingReports;

    @Builder(builderMethodName = "generateAbusingReporter")
    public AbusingReporter(UUID abusingReporterId, String nickname, String profileImgUrl) {
        this.abusingReporterId = abusingReporterId;
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
    }
}
