package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.UserDto;

public interface UserService {
    UserDto.SignInResponse signIn(UserDto.SignInRequest signInRequest);

    UserDto.CreateManagerResponse createManager(UserDto.CreateManagerRequest createManagerRequest);
}
