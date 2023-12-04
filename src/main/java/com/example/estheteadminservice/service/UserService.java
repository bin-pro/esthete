package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.UserDto;
import org.springframework.data.domain.Page;

public interface UserService {
    UserDto.SignInResponse signIn(UserDto.SignInRequest signInRequest);

    UserDto.CreateManagerResponse createManager(UserDto.CreateManagerRequest createManagerRequest);

    Page<UserDto.ManagerDto> readAllManager(Integer page, Integer size);
}
