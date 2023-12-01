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
@Table(name = "photographers")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Photographer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photographer_id")
    private Long id;

    @Column(columnDefinition = "BINARY(16)", name = "photographer_uuid")
    private UUID photographerId;

    private String nickname;

    private String profileImgUrl;

    @OneToMany(mappedBy = "photographer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestBook> guestBooks;

    @OneToMany(mappedBy = "photographer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos;

    @Builder(builderMethodName = "generatePhotographer")
    public Photographer(String photographerId, String nickname, String profileImgUrl) {
        this.photographerId = UUID.fromString(photographerId);
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
    }
}
