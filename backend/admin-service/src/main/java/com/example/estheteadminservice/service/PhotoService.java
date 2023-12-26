package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.PhotoDto;

import java.util.UUID;

public interface PhotoService {
    PhotoDto.DeleteResponse deletePhoto(UUID photoId);
}
