package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.CallReminderRepository;
import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.service.abstracts.ICallReminderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CallReminderManager implements ICallReminderService {

    private final CallReminderRepository callReminderRepository;

    public CallReminderManager(CallReminderRepository callReminderRepository) {
        this.callReminderRepository = callReminderRepository;
    }

    @Override
    public List<CallReminder> findAll() {
        return null;
    }

    @Override
    public CallReminder findById(Long id) {
        return null;
    }

    @Override
    public Boolean save(CallReminder callReminder) {
        return null;
    }

    @Override
    public Boolean update(CallReminder callReminder) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }
}
