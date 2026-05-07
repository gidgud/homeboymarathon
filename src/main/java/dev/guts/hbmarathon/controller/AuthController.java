package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.DTO.LoginRequest;
import dev.guts.hbmarathon.DTO.LoginResponse;
import dev.guts.hbmarathon.model.User;
import dev.guts.hbmarathon.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService.findByEmail(request.email());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        if (!user.getPassword().equals(request.password())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}