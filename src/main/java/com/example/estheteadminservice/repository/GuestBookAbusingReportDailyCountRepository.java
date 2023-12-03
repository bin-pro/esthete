package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface GuestBookAbusingReportDailyCountRepository extends JpaRepository<GuestBookAbusingReportDailyCount, Long> {

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



    @Query("SELECT new com.example.estheteadminservice.dto.DailyCountDto$GuestBookAbusingReport(gba) " +
            "FROM GuestBookAbusingReportDailyCount gba " +
            "ORDER BY gba.aggregateDate DESC")
    Page<DailyCountDto.GuestBookAbusingReport> getCountPage(Pageable pageable);
}
