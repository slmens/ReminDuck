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

@Getter
public class CallReminderUpdateDTO {

    private Long id;

    private String whoToCall;

    private String description;

    private String callReminderTime;

    private List<String> callReminderDays;
}
