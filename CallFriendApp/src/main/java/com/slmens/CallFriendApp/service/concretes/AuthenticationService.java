package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.requestDto.RefreshTokenRequest;
import com.slmens.CallFriendApp.dto.requestDto.SigninRequest;
import com.slmens.CallFriendApp.dto.responseDto.JwtAuthenticationResponse;
import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.abstracts.IAuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthenticationService implements IAuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    public ResponseEntity<String> createUser(CreateUserRequest request) {
        if (userRepository.existsByusername(request.getUsername())){
            return new ResponseEntity<>("Username already in use!", HttpStatus.BAD_REQUEST);
        }
        System.out.println("Received password: " + request.getPassword());
        User newUser = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .mail(request.getMail())
                .role(Role.ROLE_USER)
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .isEnabled(true)
                .accountNonLocked(true)
                .build();

        User user = userRepository.save(newUser);
        if (this.userRepository.existsById(user.getId())){
            return new ResponseEntity<>("User created!", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("Couldn't create the user!", HttpStatus.NOT_FOUND);
        }
    }

    public JwtAuthenticationResponse signIn(SigninRequest signInRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUsername(),signInRequest.getPassword()));

        var user = userRepository.findByUsername(signInRequest.getUsername()).orElseThrow(() -> new IllegalArgumentException("Invalid username or password!"));

        var jwt = jwtService.generateToken(user.getUsername());
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setId(user.getId());
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userName = jwtService.extractUser(refreshTokenRequest.getToken());
        User user = userRepository.findByUsername(userName).orElseThrow();
        if (jwtService.validateToken(refreshTokenRequest.getToken(),user)){
            var jwt = jwtService.generateToken(user.getUsername());

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setId(user.getId());
            return jwtAuthenticationResponse;
        }
        return null;
    }
}
