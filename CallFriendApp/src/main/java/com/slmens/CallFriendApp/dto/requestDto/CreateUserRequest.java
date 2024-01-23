package com.slmens.CallFriendApp.dto.requestDto;

import com.slmens.CallFriendApp.entities.Role;
import lombok.Builder;

import java.util.Set;

@Builder
public record CreateUserRequest(
        String name,
        String username,
        String password,
        String mail,
        Role role
){
}