package dev.guts.hbmarathon.DTO;

public record RegistrationRequest(

        Long userId,
        Long eventId,
        Double distance

) {
}
