package com.slmens.CallFriendApp.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.slmens.CallFriendApp.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class NotificationDTO {

    // user id belki lazım olur

    private UUID id;

    @NotBlank
    private String whoToCall;

    private String description;

    @NotNull
    private LocalTime callReminderTime;
}
