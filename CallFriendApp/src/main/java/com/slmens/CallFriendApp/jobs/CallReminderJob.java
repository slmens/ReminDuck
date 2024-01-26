package com.slmens.CallFriendApp.jobs;

import com.slmens.CallFriendApp.dao.CallReminderRepository;
import com.slmens.CallFriendApp.entities.CallReminder;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class CallReminderJob{

    private static final Logger LOGGER = LoggerFactory.getLogger(CallReminderJob.class);

    @Autowired
    private CallReminderRepository callReminderRepository; // Assuming you have a repository for CallReminder

    @Scheduled(fixedDelay = 60000)
    public void execute() throws JobExecutionException {
        LOGGER.info("Executing CallReminderJob...");

        List<CallReminder> remindersToCall = this.callReminderRepository.findAll();
        LocalTime currentTime = LocalTime.now();
        DayOfWeek currentDayOfWeek = java.time.LocalDate.now().getDayOfWeek();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime formattedTime = LocalTime.parse(currentTime.format(formatter));

        for (CallReminder reminder : remindersToCall) {
            if (reminder.getCallReminderTime().equals(formattedTime) &&
                    reminder.getCallReminderDays().contains(currentDayOfWeek.toString())) {
                // Perform the action for the matching reminder
                LOGGER.info("Calling {} - {}", reminder.getWhoToCall(), reminder.getDescription());
            }
        }
    }
}