package com.slmens.CallFriendApp;

import com.slmens.CallFriendApp.dao.UserRepository;
import com.slmens.CallFriendApp.entities.Role;
import com.slmens.CallFriendApp.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class CallFriendAppApplication implements CommandLineRunner {
	@Value("${reminduck.app.admin.pass}")
	String AdminPass;

	private final UserRepository userRepository;

	public CallFriendAppApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
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
	}
}
