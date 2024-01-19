package com.slmens.CallFriendApp.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {

    @Value("${reminduck.app.secret}")
    private String APP_SECRET;

    @Value("${reminduck.app.expires.in}")
    private Long EXPIRES_IN;

    public String generateJwtToken(Authentication authentication){
        JwtUserDetails userDetails = (JwtUserDetails) authentication.getPrincipal();
        Date expireDate = new Date(new Date().getTime() + EXPIRES_IN);
        return Jwts.builder()
                .setSubject(String.valueOf(userDetails.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512,APP_SECRET).compact();
    }

    UUID getUserIdFromJwt(String token){
        Claims claims = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody();
        return UUID.fromString(claims.getSubject());

    }

    boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
        }catch (SignatureException | IllegalArgumentException | UnsupportedJwtException | ExpiredJwtException |
                MalformedJwtException e){
            return false;
        }

        return !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());

    }
}
