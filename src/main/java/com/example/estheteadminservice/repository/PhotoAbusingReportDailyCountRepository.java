package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoAbusingReportDailyCountRepository extends JpaRepository<PhotoAbusingReportDailyCount, Long> {
    @Query("SELECT new com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount(count(pa)) " +
            "FROM PhotoAbusingReport pa " +
            "WHERE FUNCTION('trunc', 'DAY', pa.createdAt) = FUNCTION('trunc', 'DAY', CURRENT_DATE - 1)")
    PhotoAbusingReportDailyCount getDailyCount();
}
