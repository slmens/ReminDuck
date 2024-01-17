package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.abstracts.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserManager implements IUserService {

    private final UserRepository userRepository;

    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public User findById(UUID id) {
        return null;
    }

    @Override
    public Boolean save(User user) {
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
