package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.GuestBookDto;

import java.util.UUID;

public interface GuestBookService {
    GuestBookDto.DeleteResponse deleteGuestBook(UUID guestBookId);
}
