package com.example.estheteadminservice.repository;

import com.example.estheteadminservice.entity.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PhotographerRepository extends JpaRepository<Photographer, Long> {
    boolean existsByPhotographerId(UUID photographerId);

    Optional<Photographer> findByPhotographerId(UUID photographerId);
}
