package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.GuestBookAbusingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestBookAbusingReportRepository extends JpaRepository<GuestBookAbusingReport, Long> {
}
