package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.AbusingReporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AbusingReporterRepository extends JpaRepository<AbusingReporter, Long> {
    Optional<AbusingReporter> findByAbusingReporterId(UUID abusingReportId);
}
