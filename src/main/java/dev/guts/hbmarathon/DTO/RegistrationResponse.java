package dev.guts.hbmarathon.DTO;


public record RegistrationResponse (

        Long id,
        String username,
        String eventName,
        Double price,
        Double distance

) {}
