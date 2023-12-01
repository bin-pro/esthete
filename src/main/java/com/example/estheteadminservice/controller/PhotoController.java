package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.PhotoDto;
import com.example.estheteadminservice.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/admin/photos")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @DeleteMapping("/{photoId}")
    public ResponseEntity<PhotoDto.DeleteResponse> deletePhoto(@PathVariable("photoId") UUID photoId) {

        PhotoDto.DeleteResponse photoDeleteResponse = photoService.deletePhoto(photoId);

        return ResponseEntity.status(HttpStatus.OK).body(photoDeleteResponse);
    }
}
