package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.responseDto.UserResponseDto;
import com.slmens.CallFriendApp.entities.User;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    List<UserResponseDto> findAll();
    UserResponseDto findById(UUID id);
    Boolean save(CreateUserRequest user);
    Boolean update(User user);
    Boolean delete(UUID id);
}
