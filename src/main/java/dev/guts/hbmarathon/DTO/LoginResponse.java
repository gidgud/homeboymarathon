package dev.guts.hbmarathon.DTO;

public record LoginResponse(
        Long id,
        String email,
        String firstName
) {}
