package com.slmens.CallFriendApp.api;

import com.slmens.CallFriendApp.dto.requestDto.AuthRequest;
import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.responseDto.UserResponseDto;
import com.slmens.CallFriendApp.service.concretes.JwtService;
import com.slmens.CallFriendApp.service.concretes.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.DeleteExchange;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService service;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    public UserController(UserService service, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.service = service;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello World! this is FOLSDEV";
    }

    @GetMapping("/")
    public List<UserResponseDto> getAll(){
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public UserResponseDto findById(@PathVariable("id") UUID id){
        return this.service.findById(id);
    }


    @PostMapping("/save")
    public Boolean addUser(@RequestBody CreateUserRequest request) {
        return service.createUser(request);
    }

    @PostMapping("/generateToken")
    public String generateToken(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(request.username());
        }
        log.info("invalid username " + request.username());
        throw new UsernameNotFoundException("invalid username {} " + request.username());
    }

    @PutMapping("/")
    public String getUserString() {
        return "This is updateMethod!";
    }

    @DeleteMapping("/")
    public String getAdminString() {
        return "This is delete api!";
    }
}
