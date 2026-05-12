package dev.guts.hbmarathon.DTO;


public record RegistrationResponse (

        Long id,
        String username,
        String eventName,
        Long eventId,
        Double price,
        Double distance

) {}
