package com.example.estheteadminservice.service;

import com.example.estheteadminservice.dto.UserDto;
import com.example.estheteadminservice.entity.User;
import com.example.estheteadminservice.exception.UserErrorResult;
import com.example.estheteadminservice.exception.UserException;
import com.example.estheteadminservice.repository.UserRepository;
import com.example.estheteadminservice.security.JwtTokenProvider;
import jdk.jshell.spi.ExecutionControl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public UserDto.SignInResponse signIn(UserDto.SignInRequest signInRequest) {

        final String username = signInRequest.getUsername();
        final String password = signInRequest.getPassword();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserException(UserErrorResult.USER_NOT_FOUND));

        if (!user.getPassword().equals(password)) {
            throw new UserException(UserErrorResult.PASSWORD_NOT_MATCHED);
        }

        final String accessToken = jwtTokenProvider.create(user);

        final UserDto.SignInResponse signInResponse = UserDto.SignInResponse.builder()
                .userId(user.getId().toString())
                .username(user.getUsername())
                .accessToken(accessToken)
                .role(user.getRole().toString())
                .build();

        return signInResponse;
    }

    @Override
    public UserDto.CreateManagerResponse createManager(UserDto.CreateManagerRequest createManagerRequest) {

        final Long createNumber = createManagerRequest.getCreateNumber();

        UserDto.CreateManagerResponse createManagerResponse = UserDto.CreateManagerResponse.builder()
                .createdManagers(new ArrayList<>())
                .build();

        for (long i = 0; i < createNumber; i++) {
            final User user = new User();

            final User savedUser = userRepository.save(user);

            UserDto.CreatedManagerDto createdUser = UserDto.CreatedManagerDto.builder()
                    .userId(savedUser.getId().toString())
                    .username(savedUser.getUsername())
                    .password(savedUser.getPassword())
                    .role(savedUser.getRole().toString())
                    .build();

            createManagerResponse.getCreatedManagers().add(createdUser);
        }

        return createManagerResponse;
    }
}
