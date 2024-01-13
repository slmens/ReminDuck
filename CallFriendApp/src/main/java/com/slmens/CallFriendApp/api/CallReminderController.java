package com.slmens.CallFriendApp.api;

import com.slmens.CallFriendApp.dto.requestDto.CallReminderSaveDTO;
import com.slmens.CallFriendApp.dto.requestDto.CallReminderUpdateDTO;
import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.concretes.CallReminderManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/callReminder")
public class CallReminderController {

    private final CallReminderManager callReminderManager;

    public CallReminderController(CallReminderManager callReminderManager) {
        this.callReminderManager = callReminderManager;
    }

    @GetMapping("")
    public List<CallReminder> findAll(){
        return this.callReminderManager.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CallReminder> CallReminderFindById(@PathVariable("id") Long id){
        return this.callReminderManager.findById(id);
    }

    @PostMapping("/save")
    public Boolean save(@RequestBody CallReminderSaveDTO callReminderSaveDTO){
        return this.callReminderManager.save(callReminderSaveDTO);
    }

    @PutMapping("/{id}")
    public Boolean update(@RequestBody CallReminderUpdateDTO callReminderUpdateDTO){
        return this.callReminderManager.update(callReminderUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable("id") Long id){
        return this.callReminderManager.delete(id);
    }
}
