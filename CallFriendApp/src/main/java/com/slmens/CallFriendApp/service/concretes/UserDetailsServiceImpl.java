package com.slmens.CallFriendApp.service.concretes;
/*
import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.security.JwtUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        return JwtUserDetails.create(user);
    }

    public UserDetails loadUserById(UUID id){
        if (userRepository.existsById(id)){
            User user = userRepository.findById(id).get();
            return JwtUserDetails.create(user);
        }
        return null;
    }
}
*/