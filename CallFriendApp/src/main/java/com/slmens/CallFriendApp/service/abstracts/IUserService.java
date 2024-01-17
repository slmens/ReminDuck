package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.entities.User;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    List<User> findAll();
    User findById(UUID id);
    Boolean save(User user);
    Boolean update(User user);
    Boolean delete(UUID id);
}
