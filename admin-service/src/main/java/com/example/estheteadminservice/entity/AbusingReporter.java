package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
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
    @Column(name = "abusing_reporter_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "BINARY(16)", name = "abusing_reporter_uuid", unique = true)
    private UUID abusingReporterId;

    @Column(name = "abusing_reporter_nickname")
    private String nickname;

    @Column(name = "abusing_reporter_profile_img_url")
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
        this.guestBookAbusingReports = new ArrayList<>();
        this.photoAbusingReports = new ArrayList<>();
    }
}
