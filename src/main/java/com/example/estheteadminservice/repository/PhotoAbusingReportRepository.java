package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import com.example.estheteadminservice.entity.Photo;
import com.example.estheteadminservice.entity.PhotoAbusingReport;
import com.example.estheteadminservice.entity.PhotoAbusingReportDailyCount;
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
public interface PhotoAbusingReportRepository extends JpaRepository<PhotoAbusingReport, Long> {

    @Query("SELECT new com.example.estheteadminservice.dto.PhotoAbusingReportDto$ReadDetailedInfoResponse(pab)" +
            "FROM PhotoAbusingReport pab " +
            "WHERE pab.photo.photoId = :photoId")
    Page<PhotoAbusingReportDto.ReadDetailedInfoResponse> findDetailedInfoOfReportedPhoto(@Param("photoId") UUID photoId, Pageable pageable);

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

    Optional<PhotoAbusingReport> findByReportId(UUID reportId);

    void deleteAllByPhoto(Photo photo);
}
