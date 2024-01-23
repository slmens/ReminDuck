package com.slmens.CallFriendApp.dto.requestDto;

import com.slmens.CallFriendApp.entities.Role;
import lombok.Builder;

import java.util.Set;

@Builder
public record CreateUserRequest(
        String username,
        String password,
        String mail
){
}