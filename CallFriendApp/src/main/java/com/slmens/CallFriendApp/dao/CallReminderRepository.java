package com.slmens.CallFriendApp.dao;

import com.slmens.CallFriendApp.entities.CallReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallReminderRepository extends JpaRepository<CallReminder,Long> {
}
