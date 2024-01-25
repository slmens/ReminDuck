package com.slmens.CallFriendApp;

import com.slmens.CallFriendApp.config.TimerInfo;
import com.slmens.CallFriendApp.dao.CallReminderRepository;
import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.entities.CallReminder;
import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.entities.User;
import com.slmens.CallFriendApp.jobs.CallReminderJob;
import com.slmens.CallFriendApp.jobs.HelloWorldJob;
import com.slmens.CallFriendApp.service.concretes.SchedulerService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@SpringBootApplication
public class CallFriendAppApplication implements CommandLineRunner {
	@Value("${reminduck.app.admin.pass}")
	String AdminPass;

	private final UserRepository userRepository;
	private final SchedulerService schedulerService;

	public CallFriendAppApplication(UserRepository userRepository, SchedulerService schedulerService) {
		this.userRepository = userRepository;
		this.schedulerService = schedulerService;
	}

	public static void main(String[] args) {
		SpringApplication.run(CallFriendAppApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User admin = this.userRepository.findByRole(Role.ROLE_ADMIN);

		if (null == admin){
			User user = new User();

			user.setUsername("admin");
			user.setMail("admin@gmail.com");
			user.setEnabled(true);
			user.setAccountNonExpired(true);
			user.setAccountNonLocked(true);
			user.setCredentialsNonExpired(true);
			user.setRole(Role.ROLE_ADMIN);
			user.setPassword(new BCryptPasswordEncoder().encode((AdminPass)));

			this.userRepository.save(user);
		}

		final TimerInfo info = new TimerInfo();
		info.setRunForever(true);
		info.setRemainingFireCount(info.getTotalFireCount());
		info.setRepeatIntervalMs(30000);
		info.setInitialOffsetMs(100);
		info.setCallbackData("My callback data");


		schedulerService.schedule(CallReminderJob.class, info);
	}
}
