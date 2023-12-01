package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {
    Optional<GuestBook> findByGuestBookId(UUID guestBookId);
}
