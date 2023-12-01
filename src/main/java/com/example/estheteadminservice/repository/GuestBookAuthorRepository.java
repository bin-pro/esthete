package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.GuestBookAuthor;
import com.example.estheteadminservice.entity.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GuestBookAuthorRepository extends JpaRepository<GuestBookAuthor, Long> {
    Optional<GuestBookAuthor> findByGuestBookAuthorId(UUID guestBookAuthorId);
}
