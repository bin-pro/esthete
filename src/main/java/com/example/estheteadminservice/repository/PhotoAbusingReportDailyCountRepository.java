package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface PhotoAbusingReportDailyCountRepository extends JpaRepository<PhotoAbusingReportDailyCount, Long> {

    default PhotoAbusingReportDailyCount getDailyCount(LocalDateTime now, Integer countIntervalMinutes) {
        LocalDateTime start = now.minusMinutes(countIntervalMinutes);
        LocalDateTime end = now;
        return getDailyCount(start, end);
    }

    @Query("SELECT new com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount(count(pa)) " +
            "FROM PhotoAbusingReport pa " +
            "WHERE pa.createdAt >= :start " +
            "AND pa.createdAt < :end ")
    PhotoAbusingReportDailyCount getDailyCount(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT new com.example.estheteadminservice.dto.DailyCountDto$PhotoAbusingReport(pa) " +
            "FROM PhotoAbusingReportDailyCount pa " +
            "ORDER BY pa.aggregateDate DESC")
    Page<DailyCountDto.PhotoAbusingReport> getCountPage(Pageable pageable);
}
