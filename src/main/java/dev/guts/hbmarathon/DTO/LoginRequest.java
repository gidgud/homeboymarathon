package dev.guts.hbmarathon.DTO;

public record LoginRequest(
        String email,
        String password,
        String firstName
) {}
