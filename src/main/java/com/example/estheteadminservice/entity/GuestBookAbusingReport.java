package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.UUID;

@Entity
@Table(name = "guest_book_abusing_reports")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class GuestBookAbusingReport extends AbusingReportBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "guest_book_id", foreignKey = @ForeignKey(name = "guest_book_abusing_report_fk_guest_book_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private GuestBook guestBook;

    @JoinColumn(name = "abusing_reporter_id", foreignKey = @ForeignKey(name = "guest_book_abusing_report_fk_abusing_reporter_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private AbusingReporter abusingReporter;

    @Builder(builderMethodName = "generateGuestBookAbusingReport")
    public GuestBookAbusingReport(String reason, AbusingReporter abusingReporter, GuestBook guestBook) {
        super(reason);
        setAbusingReporter(abusingReporter);
        setGuestBook(guestBook);
    }

    private void setAbusingReporter(AbusingReporter abusingReporter) {
        if (this.getAbusingReporter() != null) {
            this.getAbusingReporter().getGuestBookAbusingReports().remove(this);
        }
        this.setAbusingReporter(abusingReporter);
        abusingReporter.getGuestBookAbusingReports().add(this);
    }

    public void setGuestBook(GuestBook guestBook) {
        if (this.guestBook != null) {
            this.guestBook.getGuestBookAbusingReports().remove(this);
        }
        this.guestBook = guestBook;
        guestBook.getGuestBookAbusingReports().add(this);
    }
}
