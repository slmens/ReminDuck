package com.slmens.CallFriendApp.dto.requestDto;

import com.slmens.CallFriendApp.entities.Role;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Builder
@Data
public class CreateUserRequest{
    String username;
    String password;
    String mail;
}

