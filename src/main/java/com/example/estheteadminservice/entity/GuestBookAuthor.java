package com.example.estheteadminservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "guest_book_authors")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class GuestBookAuthor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "BINARY(16)", name = "guest_book_author_uuid", unique = true)
    private UUID guestBookAuthorId;

    private String nickname;

    private String profileImgUrl;

    @OneToMany(mappedBy = "guestBookAuthor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBook> guestBooks;

    @Builder(builderMethodName = "generateGuestBookAuthor")
    public GuestBookAuthor(UUID guestBookAuthorId, String nickname, String profileImgUrl) {
        this.guestBookAuthorId = guestBookAuthorId;
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
        this.guestBooks = new ArrayList<>();
    }
}
