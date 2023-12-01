package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestBookAbusingReportDailyCountRepository extends JpaRepository<GuestBookAbusingReportDailyCount, Long> {
    @Query("SELECT new com.example.estheteadminservice.entity.GuestBookAbusingReportDailyCount(count(gba)) " +
            "FROM GuestBookAbusingReport gba " +
            "WHERE FUNCTION('trunc', 'DAY', gba.createdAt) = FUNCTION('trunc', 'DAY', CURRENT_DATE - 1)")
    GuestBookAbusingReportDailyCount getDailyCount();
}
