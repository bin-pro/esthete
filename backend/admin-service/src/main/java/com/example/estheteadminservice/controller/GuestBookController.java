package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.GuestBookDto;
import com.example.estheteadminservice.service.GuestBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/admin/guest-books")
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookService guestBookService;

    @DeleteMapping("/{guestBookId}")
    public ResponseEntity<GuestBookDto.DeleteResponse> deleteGuestBook(@PathVariable("guestBookId") UUID guestBookId) {

        GuestBookDto.DeleteResponse guestBookDeleteResponse = guestBookService.deleteGuestBook(guestBookId);

        return ResponseEntity.status(HttpStatus.OK).body(guestBookDeleteResponse);
    }
}
