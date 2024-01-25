package com.slmens.CallFriendApp.jobs;

import com.slmens.CallFriendApp.dao.CallReminderRepository;
import com.slmens.CallFriendApp.entities.CallReminder;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;


@Component
public class CallReminderJob implements Job {

    private static final Logger LOGGER = LoggerFactory.getLogger(CallReminderJob.class);

    private CallReminderRepository callReminderRepository; // Assuming you have a repository for CallReminder

    // Default constructor
    public CallReminderJob() {
        this.callReminderRepository = null; // or initialize it if needed
    }

    // Constructor with parameter
    public CallReminderJob(CallReminderRepository callReminderRepository) {
        this.callReminderRepository = callReminderRepository;
    }

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        LOGGER.info("Executing CallReminderJob...");

        CallReminderRepository callReminderRepository =
                (CallReminderRepository) jobExecutionContext.getJobDetail().getJobDataMap().get("callReminderRepository");

        List<CallReminder> remindersToCall = this.callReminderRepository.findAll();
        LocalTime currentTime = LocalTime.now();
        DayOfWeek currentDayOfWeek = java.time.LocalDate.now().getDayOfWeek();

        for (CallReminder reminder : remindersToCall) {
            if (reminder.getCallReminderTime().equals(currentTime) &&
                    reminder.getCallReminderDays().contains(currentDayOfWeek.toString())) {
                // Perform the action for the matching reminder
                LOGGER.info("Calling {} - {}", reminder.getWhoToCall(), reminder.getDescription());
            }
        }
    }
}