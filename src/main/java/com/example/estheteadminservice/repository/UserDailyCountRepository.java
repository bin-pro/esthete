package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.dto.DailyCountDto;
import com.example.estheteadminservice.entity.UserDailyCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDailyCountRepository extends JpaRepository<UserDailyCount, Long> {
    @Query("SELECT new com.example.estheteadminservice.dto.DailyCountDto$User(udc) " +
            "FROM UserDailyCount udc " +
            "ORDER BY udc.date DESC")
    Page<DailyCountDto.User> getCountPage(Pageable pageable);
}
