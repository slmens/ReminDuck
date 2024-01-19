package com.slmens.CallFriendApp.security;

import com.slmens.CallFriendApp.service.concretes.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

public class JwtAuthenticationFilter  extends OncePerRequestFilter {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwtToken = extractJwtFromRequest(request);
            if (StringUtils.hasText(jwtToken) && jwtTokenProvider.validateToken(jwtToken)){
                UUID id = jwtTokenProvider.getUserIdFromJwt(jwtToken);
                UserDetails userDetails = userDetailsService.loadUserById(id);
                if (userDetails != null){
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }catch (Exception e){
            return;
        }

        filterChain.doFilter(request,response);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")){
            return bearer.substring("Bearer".length() + 1);
        }
        return null;
    }
}
