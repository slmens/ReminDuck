package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.requestDto.SigninRequest;
import com.slmens.CallFriendApp.dto.responseDto.JwtAuthenticationResponse;
import com.slmens.CallFriendApp.dto.responseDto.UserResponseDto;
import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.security.JwtAuthFilter;
import com.slmens.CallFriendApp.service.abstracts.IUserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService, IUserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // UserDetailsService Methods

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(EntityNotFoundException::new);
    }

    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // IUserService Methods

    @Override
    public List<UserResponseDto> findAll() {
        List<User> userList = this.userRepository.findAll();

        return userList.stream().map(user -> {
                    UserResponseDto userResponseDto = new UserResponseDto();
                    userResponseDto.setUser_id(user.getId());
                    userResponseDto.setUsername(user.getUsername());
                    return userResponseDto;
                })
                .toList();
    }

    @Override
    public UserResponseDto findById(UUID id) {
        UserResponseDto userResponseDto = new UserResponseDto();
        User user = this.userRepository.findById(id).orElse(null);
        if (user != null){
            userResponseDto.setUsername(user.getUsername());
            userResponseDto.setUser_id(user.getId());
            return userResponseDto;
        }else{
            return null;
        }
    }

    @Override
    public Boolean update(User user) {
        return null;
    }

    @Override
    public Boolean delete(UUID id) {
        return null;
    }

}