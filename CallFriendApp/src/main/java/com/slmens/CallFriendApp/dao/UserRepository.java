package com.slmens.CallFriendApp.dao;

import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String userName);

    User findByRole(Role role);

    boolean existsByUserName(String username);
}
