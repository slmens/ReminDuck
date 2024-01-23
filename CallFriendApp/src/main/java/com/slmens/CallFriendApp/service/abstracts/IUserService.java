package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.requestDto.SigninRequest;
import com.slmens.CallFriendApp.dto.responseDto.JwtAuthenticationResponse;
import com.slmens.CallFriendApp.dto.responseDto.UserResponseDto;
import com.slmens.CallFriendApp.entities.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserService {
    List<UserResponseDto> findAll();
    UserResponseDto findById(UUID id);
    Boolean update(User user);
    Boolean delete(UUID id);
    Optional<User> getByUsername(String username);

}
