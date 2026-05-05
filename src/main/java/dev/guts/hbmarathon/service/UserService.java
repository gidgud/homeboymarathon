package dev.guts.hbmarathon.service;

import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.UserRepository;
import dev.guts.hbmarathon.mapper.UserMapper;

@Service
public class UserService {

	private UserRepository userRepository;
	private UserMapper userMapper;


	public UserService(UserRepository userRepository, UserMapper userMapper) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
	}
	
}
