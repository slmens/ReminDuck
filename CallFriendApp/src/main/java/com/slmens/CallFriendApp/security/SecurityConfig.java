package com.slmens.CallFriendApp.security;

import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.service.abstracts.IUserService;
import com.slmens.CallFriendApp.service.concretes.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    private final UserDetailsService userService;

    private final PasswordEncoder passwordEncoder;


    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService userService, PasswordEncoder passwordEncoder) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(x ->
                        x.requestMatchers(HttpMethod.POST,"/user/signIn/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/user/signUp/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/timer/runCallReminderJob").permitAll()

                )
                .authorizeHttpRequests(x ->
                        x.requestMatchers(HttpMethod.GET,"/callReminder/byUser/{id}").authenticated()
                                .requestMatchers(HttpMethod.POST,"/callReminder/save").authenticated()
                                .requestMatchers(HttpMethod.GET,"/user/{id}").authenticated()
                                .requestMatchers(HttpMethod.POST,"/user/refresh").authenticated()
                                .requestMatchers(HttpMethod.PUT,"/callReminder/{id}").authenticated()
                                .requestMatchers(HttpMethod.DELETE,"/callReminder/{id}").authenticated()
                                //.requestMatchers(HttpMethod.POST,"user/generateToken").authenticated()
                                .anyRequest().hasAnyAuthority(Role.ROLE_ADMIN.getAuthority())
                )
                .sessionManagement(x -> x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();

    }
}