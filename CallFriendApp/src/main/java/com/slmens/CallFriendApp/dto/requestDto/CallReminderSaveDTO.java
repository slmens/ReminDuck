package com.slmens.CallFriendApp.dto.requestDto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalTime;
import java.util.List;

@Getter
public class CallReminderSaveDTO {

    @NotBlank
    @Column(name = "whoToCall")
    private String whoToCall;

    @Column(name = "description")
    private String description;

    @NotBlank
    @Column(name = "callReminderTime")
    private LocalTime callReminderTime;

    @NotEmpty
    @Column(name = "callReminderDays")
    private List<String> callReminderDays;
}
