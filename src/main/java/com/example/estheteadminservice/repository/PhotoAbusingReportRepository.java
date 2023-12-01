package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.PhotoAbusingReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoAbusingReportRepository extends JpaRepository<PhotoAbusingReport, Long> {
}
