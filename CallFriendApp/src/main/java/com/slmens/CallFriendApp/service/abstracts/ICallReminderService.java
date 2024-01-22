package com.slmens.CallFriendApp.service.abstracts;

import com.slmens.CallFriendApp.dto.requestDto.CallReminderSaveDTO;
import com.slmens.CallFriendApp.dto.requestDto.CallReminderUpdateDTO;
import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.entities.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ICallReminderService {
    List<CallReminder> findAll();
    Optional<CallReminder> findById(UUID id);
    List<CallReminder> findAllByUserId(UUID id);
    Boolean save(CallReminderSaveDTO callReminderSaveDTO);
    Boolean update(CallReminderUpdateDTO callReminderUpdateDTO);
    Boolean delete(UUID id);
}
