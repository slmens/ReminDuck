package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.entities.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();
    User findById(Long id);
    Boolean save(User user);
    Boolean update(User user);
    Boolean delete(Long id);
}
