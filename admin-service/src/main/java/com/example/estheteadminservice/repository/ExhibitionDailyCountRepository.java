package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.entity.ExhibitionDailyCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExhibitionDailyCountRepository extends JpaRepository<ExhibitionDailyCount, Long> {
    @Query("SELECT new com.example.estheteadminservice.dto.DailyCountDto$Exhibition(edc) " +
            "FROM ExhibitionDailyCount edc " +
            "ORDER BY edc.aggregateDate DESC")
    Page<DailyCountDto.Exhibition> getCountPage(Pageable pageable);
}
