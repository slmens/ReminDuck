package com.slmens.CallFriendApp.security;

import com.slmens.CallFriendApp.entities.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class JwtUserDetails implements UserDetails {

    public UUID id;
    private String userName;
    private String password;
    private Collection<? extends  GrantedAuthority> authorities;

    private JwtUserDetails(UUID id, String userName, String password, Collection<? extends GrantedAuthority> authorities){
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.authorities = authorities;
    }

    public static JwtUserDetails create(User user){
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(("user")));
        return new JwtUserDetails(user.getId(),user.getUserName(),user.getPassword(),authorityList);
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
