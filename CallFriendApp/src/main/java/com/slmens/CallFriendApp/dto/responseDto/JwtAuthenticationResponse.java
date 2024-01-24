package com.slmens.CallFriendApp.dto.responseDto;

import lombok.Data;

import java.util.UUID;

@Data
public class JwtAuthenticationResponse {

    private String jwt;
    private UUID id;
}
