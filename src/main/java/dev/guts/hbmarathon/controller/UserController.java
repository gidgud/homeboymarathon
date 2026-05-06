package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.guts.hbmarathon.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<User> createUser (@RequestBody User user){

		User newUser = userService.createUser(user);

		return ResponseEntity.ok().body(newUser);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> findUserById(@PathVariable Long userId){

		User newUser = userService.findUserById(userId);

		return ResponseEntity.ok(newUser);

	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUserById(@RequestBody User user, @PathVariable Long userId) {

		User updatedUser = userService.updateUser(user, userId);

		return ResponseEntity.ok().body(updatedUser);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<User> deleteUserById(@PathVariable Long userId){

		userService.deleteUser(userId);

		return ResponseEntity.noContent().build();

	}


}
