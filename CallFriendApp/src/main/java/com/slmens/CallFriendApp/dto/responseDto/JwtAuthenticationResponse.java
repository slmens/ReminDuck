package com.slmens.CallFriendApp.dto.responseDto;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
}
