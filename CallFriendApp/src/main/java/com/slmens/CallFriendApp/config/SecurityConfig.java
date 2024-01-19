package com.slmens.CallFriendApp.config;


/*
import com.slmens.CallFriendApp.security.JwtAuthenticationEntryPoint;
import com.slmens.CallFriendApp.security.JwtAuthenticationFilter;
import com.slmens.CallFriendApp.service.concretes.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtAuthenticationEntryPoint handler;


    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthenticationEntryPoint handler) {
        this.userDetailsService = userDetailsService;
        this.handler = handler;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    public AuthenticationManager authenticationManagerBean() throws Exception{
       // return AuthenticationManagerBean();
        return null;
    }
}
*/