package com.slmens.CallFriendApp.service.concretes;

import com.slmens.CallFriendApp.dao.CallReminderRepository;
import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.dto.requestDto.CallReminderSaveDTO;
import com.slmens.CallFriendApp.dto.requestDto.CallReminderUpdateDTO;
import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.abstracts.ICallReminderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

// update hallet string localtime falan

@Service
public class CallReminderManager implements ICallReminderService {

    private final CallReminderRepository callReminderRepository;
    private final UserRepository userRepository;

    public CallReminderManager(CallReminderRepository callReminderRepository, UserRepository userRepository) {
        this.callReminderRepository = callReminderRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<CallReminder> findAll() {
        return this.callReminderRepository.findAll();
    }

    @Override
    public Optional<CallReminder> findById(UUID id) {
        return this.callReminderRepository.findById(id);
    }

    @Override
    public List<CallReminder> findAllByUserId(UUID id) {
        return this.callReminderRepository.findAllByUserId(id);
    }

    @Override
    public Boolean save(CallReminderSaveDTO callReminderSaveDTO) {
        Optional<User> userOpt = this.userRepository.findById(callReminderSaveDTO.getUser_id());
        User user = userOpt.orElseThrow(() -> new RuntimeException("User not found"));

        CallReminder callReminderToSave = new CallReminder();
        callReminderToSave.setWhoToCall(callReminderSaveDTO.getWhoToCall());
        //callReminderToSave.setCallReminderTime(LocalTime.parse(callReminderSaveDTO.getCallReminderTime()));
        callReminderToSave.setCallReminderTime(callReminderSaveDTO.getCallReminderTime());
        callReminderToSave.setCallReminderDays(callReminderSaveDTO.getCallReminderDays());
        callReminderToSave.setDescription(callReminderSaveDTO.getDescription());
        callReminderToSave.setUser(user);
        try {
            this.callReminderRepository.save(callReminderToSave);

            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public Boolean update(CallReminderUpdateDTO callReminderUpdateDTO) {
        CallReminder callReminderToUpdate = this.callReminderRepository.findById(callReminderUpdateDTO.getId()).orElse(null);
        if (callReminderToUpdate == null){
            return false;
        }else{
            try {
                /*
                List<String> dayStrings = callReminderUpdateDTO.getCallReminderDays();
                List<DayOfWeek> dayEnums = DayOfWeekConverter.convertToEnumList(dayStrings);
                 */

                callReminderToUpdate.setDescription(callReminderUpdateDTO.getDescription());
                callReminderToUpdate.setWhoToCall(callReminderUpdateDTO.getWhoToCall());
                //callReminderToUpdate.setCallReminderDays(dayEnums);
                callReminderToUpdate.setCallReminderDays(callReminderUpdateDTO.getCallReminderDays());
                callReminderToUpdate.setCallReminderTime(callReminderUpdateDTO.getCallReminderTime());

                this.callReminderRepository.save(callReminderToUpdate);

                return true;
            }catch (Exception e){
                return false;
            }
        }
    }

    @Override
    public Boolean delete(UUID id) {
        if (this.callReminderRepository.existsById(id)){
            try {

                this.callReminderRepository.deleteById(id);

                return true;
            }catch (Exception e){
                return false;
            }
        }
        return false;
    }
}
