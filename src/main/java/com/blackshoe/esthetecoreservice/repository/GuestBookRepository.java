package com.blackshoe.esthetecoreservice.repository;

import com.blackshoe.esthetecoreservice.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestBookRepository extends JpaRepository<GuestBook, Long> {
}
