package dev.guts.hbmarathon.controller;

import org.springframework.web.bind.annotation.RestController;

import dev.guts.hbmarathon.service.UserService;

@RestController
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}
}
