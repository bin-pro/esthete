package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.ExhibitionDailyCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExhibitionDailyCountRepository extends JpaRepository<ExhibitionDailyCount, Long> {
}
