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

    @Column(columnDefinition = "BINARY(16)", name = "author_uuid")
    private UUID authorId;

    private String authorNickname;

    private String authorProfileImgUrl;

    private String content;

    private LocalDateTime createdAt;

    @JoinColumn(name = "photographer_id", foreignKey = @ForeignKey(name = "guest_book_fk_photographer_id"))
    @ManyToOne(fetch = FetchType.LAZY)
    private Photographer photographer;

    @OneToMany(mappedBy = "guestBook", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBookAbusingReport> guestBookAbusingReports;

    @Builder(builderMethodName = "generateGuestBook")
    public GuestBook(UUID guestBookId, UUID authorId, String authorNickname, String authorProfileImgUrl, String content, Photographer photographer) {
        this.guestBookId = guestBookId;
        this.authorId = authorId;
        this.authorNickname = authorNickname;
        this.authorProfileImgUrl = authorProfileImgUrl;
        this.content = content;
        setPhotographer(photographer);
    }

    public void setPhotographer(Photographer photographer) {
        if (this.photographer != null) {
            this.photographer.getGuestBooks().remove(this);
        }
        this.photographer = photographer;
        photographer.getGuestBooks().add(this);
    }
}
