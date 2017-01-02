package weeklygrocery.controllers;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import weeklygrocery.beans.User;
import weeklygrocery.beans.User.Role;
import weeklygrocery.repositories.UserRepo;
import weeklygrocery.util.Response;
import weeklygrocery.util.Util;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private UserRepo userRepo;
	private PasswordEncoder passwordEncoder;

	public UserController(UserRepo userRepo, PasswordEncoder passwordEncoder) {
		super();
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody User user) {
		if (userRepo.existsByUsername(user.getUsername())) {
			return ResponseEntity.badRequest().body(Response.of("user.already.exists"));
		}

		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setRole(Role.ROLE_USER);
		userRepo.save(newUser);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/login")
	public ResponseEntity<User> login() {
		return ResponseEntity.ok(Util.currentUser().get());
	}
}
