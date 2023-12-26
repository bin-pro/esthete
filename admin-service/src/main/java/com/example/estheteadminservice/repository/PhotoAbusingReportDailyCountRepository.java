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

    @Query("SELECT new com.example.estheteadminservice.dto.DailyCountDto$PhotoAbusingReport(pa) " +
            "FROM PhotoAbusingReportDailyCount pa " +
            "ORDER BY pa.aggregateDate DESC")
    Page<DailyCountDto.PhotoAbusingReport> getCountPage(Pageable pageable);
}
