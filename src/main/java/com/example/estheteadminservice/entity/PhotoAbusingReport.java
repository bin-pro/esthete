package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.UUID;

@Entity
@Table(name = "photo_abusing_reports")
@NoArgsConstructor
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class PhotoAbusingReport extends AbusingReportBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "photo_id", foreignKey = @ForeignKey(name = "photo_abusing_report_fk_photo_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private Photo photo;

    @Builder(builderMethodName = "generatePhotoAbusingReport")
    public PhotoAbusingReport(UUID reporterId, String reporterNickname,
                              String reporterProfileImgUrl, String reason, String content, Photo photo) {
        super(reporterId, reporterNickname, reporterProfileImgUrl, reason, content);
        setPhoto(photo);
    }

    public void setPhoto(Photo photo) {
        if (this.photo != null) {
            this.photo.getPhotoAbusingReports().remove(this);
        }
        this.photo = photo;
        photo.getPhotoAbusingReports().add(this);
    }
}
