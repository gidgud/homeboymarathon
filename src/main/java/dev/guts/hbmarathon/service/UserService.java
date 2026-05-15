package dev.guts.hbmarathon.service;

import dev.guts.hbmarathon.model.User;
import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.UserRepository;
import dev.guts.hbmarathon.mapper.UserMapper;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;


    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers () {
        return userRepository.findAll();
    }

    public User findUserById(Long userId){
        return userRepository.findById(userId).orElseThrow();
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }

    public User updateUser(User user, Long userId){

        User oldUser = userRepository.findById(userId).orElseThrow();

        oldUser.setEmail(user.getEmail());
        oldUser.setPhoneNumber(user.getPhoneNumber());
        oldUser.setPassword(user.getPassword());

        User updatedUser = userRepository.save(oldUser);

        return updatedUser;

    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();

        userRepository.delete(user);
    }

}
