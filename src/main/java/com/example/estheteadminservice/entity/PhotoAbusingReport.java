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

    @JoinColumn(name = "abusing_reporter_id", foreignKey = @ForeignKey(name = "photo_abusing_report_fk_abusing_reporter_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private AbusingReporter abusingReporter;

    @JoinColumn(name = "photo_id", foreignKey = @ForeignKey(name = "photo_abusing_report_fk_photo_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private Photo photo;

    @Builder(builderMethodName = "generatePhotoAbusingReport")
    public PhotoAbusingReport(String reason, AbusingReporter abusingReporter, Photo photo) {
        super(reason);
        setAbusingReporter(abusingReporter);
        setPhoto(photo);
    }

    private void setAbusingReporter(AbusingReporter abusingReporter) {
        if (this.getAbusingReporter() != null) {
            this.getAbusingReporter().getPhotoAbusingReports().remove(this);
        }
        this.abusingReporter = abusingReporter;
        abusingReporter.getPhotoAbusingReports().add(this);
    }

    public void setPhoto(Photo photo) {
        if (this.photo != null) {
            this.photo.getPhotoAbusingReports().remove(this);
        }
        this.photo = photo;
        photo.getPhotoAbusingReports().add(this);
    }
}
