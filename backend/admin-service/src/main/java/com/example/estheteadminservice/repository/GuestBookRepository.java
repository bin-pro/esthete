package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.entity.GuestBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {
    Optional<GuestBook> findByGuestBookId(UUID guestBookId);

    @Query("SELECT new com.example.estheteadminservice.dto.GuestBookAbusingReportDto$ReadReportedGuestBookResponse(gb) " +
            "FROM GuestBook gb ")
    Page<GuestBookAbusingReportDto.ReadReportedGuestBookResponse> findAllReportedGuestBook(Pageable pageable);
}
