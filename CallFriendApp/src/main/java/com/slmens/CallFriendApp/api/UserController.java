package com.slmens.CallFriendApp.api;

import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.service.concretes.UserManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserManager userManager;

    public UserController(UserManager userManager) {
        this.userManager = userManager;
    }

    @GetMapping("")
    public List<User> findAll(){
        return this.userManager.findAll();
    }

    @GetMapping("/{id}")
    public User UserFindById(@PathVariable("id") UUID id){
        return this.userManager.findById(id);
    }

    @PostMapping("/save")
    public Boolean save(@RequestBody User user){
        return this.userManager.save(user);
    }

    @PutMapping("/{id}")
    public Boolean update(@RequestBody User user){
        return this.userManager.update(user);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable("id") UUID id){
        return this.userManager.delete(id);
    }


}
