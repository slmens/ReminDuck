package com.slmens.CallFriendApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "callReminders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CallReminder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(name = "whoToCall")
    private String whoToCall;

    @Column(name = "description")
    private String description;

    @NotEmpty
    @Column(name = "callReminderTime")
    private LocalTime callReminderTime;

    @NotEmpty
    @Column(name = "callReminderDays")
    private List<String> callReminderDays;

    @JsonIgnoreProperties(value = {"callsToRemind"})
    @ManyToOne()
    private User user;
}
