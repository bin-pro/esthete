package com.example.estheteadminservice.controller;

import com.example.estheteadminservice.dto.UserDto;
import com.example.estheteadminservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/managers")
@RequiredArgsConstructor
public class ManagerController {

    private final UserService userService;

    @PostMapping()
    public ResponseEntity<UserDto.CreateManagerResponse> createManager(@RequestBody UserDto.CreateManagerRequest createManagerRequest) {

        UserDto.CreateManagerResponse createManagerResponse = userService.createManager(createManagerRequest);

        return ResponseEntity.status(HttpStatus.OK).body(createManagerResponse);
    }

    @GetMapping
    public ResponseEntity<Page<UserDto.ManagerDto>> readAllManager(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                                   @RequestParam(value = "size", defaultValue = "10") Integer size) {

        Page<UserDto.ManagerDto> readAllManagerPage = userService.readAllManager(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readAllManagerPage);
    }
}
