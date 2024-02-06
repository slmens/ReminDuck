package com.slmens.CallFriendApp.socket;

import com.slmens.CallFriendApp.dto.responseDto.NotificationDTO;
import com.slmens.CallFriendApp.entities.CallReminder;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WSService {
    private final SimpMessagingTemplate messagingTemplate;

    public WSService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendGlobalNotification(CallReminder callReminder) {
        NotificationDTO notification = new NotificationDTO(callReminder.getId(),callReminder.getWhoToCall(),callReminder.getDescription(),callReminder.getCallReminderTime());

        messagingTemplate.convertAndSend("/topic/globalNotifications", notification);
    }

    public void sendPrivateNotification(final UUID userId, CallReminder callReminder) {
        NotificationDTO notification = new NotificationDTO(callReminder.getId(),callReminder.getWhoToCall(),callReminder.getDescription(),callReminder.getCallReminderTime());

        messagingTemplate.convertAndSendToUser(String.valueOf(userId),"/topic/privateNotifications", notification);
    }
}
