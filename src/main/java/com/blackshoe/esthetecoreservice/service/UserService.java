package com.blackshoe.esthetecoreservice.service;

import com.blackshoe.esthetecoreservice.dto.ExhibitionDto;
import com.blackshoe.esthetecoreservice.dto.UserDto;

import java.util.UUID;

public interface UserService {
    UserDto.ReadBasicInfoResponse readBasicInfo(UUID userId);

    ExhibitionDto.ReadCurrentOfUserResponse readCurrentExhibitionOfUser(UUID userId);

}
