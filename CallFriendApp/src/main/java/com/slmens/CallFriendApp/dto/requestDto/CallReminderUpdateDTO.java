package com.slmens.CallFriendApp.dto.requestDto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Getter
public class CallReminderUpdateDTO {

    private UUID id;

    private String whoToCall;

    private String description;

    private LocalTime callReminderTime;

    private List<String> callReminderDays;
}
