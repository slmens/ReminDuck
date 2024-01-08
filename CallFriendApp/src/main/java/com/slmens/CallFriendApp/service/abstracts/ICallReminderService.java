package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.entities.User;

import java.util.List;

public interface ICallReminderService {
    List<CallReminder> findAll();
    CallReminder findById(Long id);
    Boolean save(CallReminder callReminder);
    Boolean update(CallReminder callReminder);
    Boolean delete(Long id);
}
