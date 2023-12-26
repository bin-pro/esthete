package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.GuestBookAbusingReportDto;
import com.example.estheteadminservice.entity.GuestBook;
import com.example.estheteadminservice.entity.GuestBookAbusingReport;
import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GuestBookAbusingReportRepository extends JpaRepository<GuestBookAbusingReport, Long> {

    @Query("SELECT new com.example.estheteadminservice.dto.GuestBookAbusingReportDto$ReadDetailedInfoResponse(gab)" +
            "FROM GuestBookAbusingReport gab " +
            "WHERE gab.guestBook.guestBookId = :guestBookId")
    Page<GuestBookAbusingReportDto.ReadDetailedInfoResponse>
    findDetailedInfoOfReportedGuestBook(@Param("guestBookId") UUID guestBookId, Pageable pageable);

    default GuestBookAbusingReportDailyCount getDailyCount(LocalDateTime now, Integer countIntervalMinutes) {
        LocalDateTime start = now.minusMinutes(countIntervalMinutes);
        LocalDateTime end = now;
        return getDailyCount(start, end);
    }

    @Query("SELECT new com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount(count(gba)) " +
            "FROM GuestBookAbusingReport gba " +
            "WHERE gba.createdAt >= :start " +
            "AND gba.createdAt < :end ")
    GuestBookAbusingReportDailyCount getDailyCount(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    Optional<GuestBookAbusingReport> findByReportId(UUID reportId);

    void deleteAllByGuestBook(GuestBook guestBook);

    long countByGuestBook(GuestBook guestBook);
}
