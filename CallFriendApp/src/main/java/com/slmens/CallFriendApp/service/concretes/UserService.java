package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.responseDto.UserResponseDto;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.abstracts.IUserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService, IUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public Boolean createUser(CreateUserRequest request) {
        User newUser = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .mail(request.mail())
                .role(request.role())
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .isEnabled(true)
                .accountNonLocked(true)
                .build();

        User user = userRepository.save(newUser);
        if (this.userRepository.existsById(user.getId())){
            return true;
        }
        return false;
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