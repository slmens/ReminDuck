package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.dto.requestDto.CreateUserRequest;
import com.slmens.CallFriendApp.dto.responseDto.UserResponseDto;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.abstracts.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserManager implements IUserService {

    private final UserRepository userRepository;

    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponseDto> findAll() {
        List<User> userList = this.userRepository.findAll();
        List<UserResponseDto> userResponseList = userList.stream().map(user -> {
           UserResponseDto userResponseDto = new UserResponseDto();
           userResponseDto.setUser_id(user.getUser_id());
           userResponseDto.setUsername(user.getUsername());
           return userResponseDto;
        })
                .toList();

        return null;
    }

    @Override
    public UserResponseDto findById(UUID id) {
        UserResponseDto userResponseDto = new UserResponseDto();
        User user = this.userRepository.findById(id).orElse(null);
        if (user != null){
            userResponseDto.setUsername(user.getUsername());
            userResponseDto.setUser_id(user.getUser_id());
            return userResponseDto;
        }else{
            return null;
        }
    }

    @Override
    public Boolean save(CreateUserRequest user) {
        return null;
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
