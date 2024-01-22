package com.slmens.CallFriendApp.dao;

import com.slmens.CallFriendApp.entities.CallReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.rmi.server.UID;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CallReminderRepository extends JpaRepository<CallReminder, UUID> {
   List<CallReminder> findAllByUserId(UUID id);
}