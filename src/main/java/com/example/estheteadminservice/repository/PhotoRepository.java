package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.PhotoAbusingReportDto;
import com.example.estheteadminservice.entity.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Optional<Photo> findByPhotoId(UUID photoId);

    @Query("SELECT new com.example.estheteadminservice.dto.PhotoAbusingReportDto$ReadReportedPhotoResponse(p) " +
            "FROM Photo p ")
    Page<PhotoAbusingReportDto.ReadReportedPhotoResponse> findAllReportedPhoto(Pageable pageable);
}
