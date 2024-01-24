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
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class CallReminderSaveDTO {

    @NotBlank
    private String whoToCall;

    @NotBlank
    private String description;

    @NotBlank
    private LocalTime callReminderTime;

    @NotEmpty
    private List<String> callReminderDays;

    @NotNull
    private UUID user_id;
}
