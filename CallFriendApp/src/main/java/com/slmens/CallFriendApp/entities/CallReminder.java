package com.slmens.CallFriendApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.slmens.CallFriendApp.core.DayOfWeek;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "callReminders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CallReminder {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Column(name = "whoToCall")
    private String whoToCall;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "callReminderTime")
    private LocalTime callReminderTime;

    @NotEmpty
    @Column(name = "callReminderDays")
    private List<String> callReminderDays;

    /* @JsonIgnoreProperties(value = {"callsToRemind"})
    @ManyToOne()
    private User user; */
}
