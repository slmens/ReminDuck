package com.slmens.CallFriendApp.api;

import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.concretes.CallReminderManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public CallReminder CallReminderFindById(@PathVariable("id") Long id){
        return this.callReminderManager.findById(id);
    }

    @PostMapping("/save")
    public Boolean save(@RequestBody CallReminder callReminder){
        return this.callReminderManager.save(callReminder);
    }

    @PutMapping("/{id}")
    public Boolean update(@RequestBody CallReminder callReminder){
        return this.callReminderManager.update(callReminder);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable("id") Long id){
        return this.callReminderManager.delete(id);
    }
}
