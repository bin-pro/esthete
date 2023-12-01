package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.UserDailyCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDailyCountRepository extends JpaRepository<UserDailyCount, Long> {
}
