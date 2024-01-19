package com.slmens.CallFriendApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    // no password for now

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Column(name = "name",unique = true)
    private String userName;

    @NotBlank
    @Email
    @Column(name = "mail")
    private String mail;

    @NotBlank
    @Column(name = "password")
    private String password;

    /*@JsonIgnoreProperties(value = {"user"})
    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
    @Column(name = "callsToRemind")
    private List<CallReminder> callsToRemind;*/
}
