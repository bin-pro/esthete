package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "guest_books")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class GuestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "BINARY(16)", name = "guest_book_uuid")
    private UUID guestBookId;

    private String content;

    private LocalDateTime createdAt;

    @JoinColumn(name = "photographer_id", foreignKey = @ForeignKey(name = "guest_book_fk_photographer_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private Photographer photographer;

    @JoinColumn(name = "guest_book_author_id", foreignKey = @ForeignKey(name = "guest_book_fk_guest_book_author_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private GuestBookAuthor guestBookAuthor;

    @OneToMany(mappedBy = "guestBook", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBookAbusingReport> guestBookAbusingReports;

    @Builder(builderMethodName = "generateGuestBook")
    public GuestBook(UUID guestBookId, String content, Photographer photographer, GuestBookAuthor guestBookAuthor, LocalDateTime createdAt) {
        this.guestBookId = guestBookId;
        this.content = content;
        this.createdAt = createdAt;
        setPhotographer(photographer);
        setGuestBookAuthor(guestBookAuthor);
    }

    public void setPhotographer(Photographer photographer) {
        if (this.photographer != null) {
            this.photographer.getGuestBooks().remove(this);
        }
        this.photographer = photographer;
        photographer.getGuestBooks().add(this);
    }

    public void setGuestBookAuthor(GuestBookAuthor guestBookAuthor) {
        if (this.guestBookAuthor != null) {
            this.guestBookAuthor.getGuestBooks().remove(this);
        }
        this.guestBookAuthor = guestBookAuthor;
        guestBookAuthor.getGuestBooks().add(this);
    }
}
