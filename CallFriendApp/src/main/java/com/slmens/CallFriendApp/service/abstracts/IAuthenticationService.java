package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.requestDto.SigninRequest;
import com.slmens.CallFriendApp.dto.responseDto.JwtAuthenticationResponse;
import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.entities.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.HashMap;

public interface IAuthenticationService {
    Boolean createUser(CreateUserRequest request);
    JwtAuthenticationResponse signIn(SigninRequest signInRequest);
}
