package dev.guts.hbmarathon.mapper;

import dev.guts.hbmarathon.DTO.RegistrationResponse;
import dev.guts.hbmarathon.model.Registration;
import org.springframework.stereotype.Component;

@Component
public class RegistrationMapper {

    public RegistrationResponse mapToResponse(Registration registration) {

        return new RegistrationResponse(
                registration.getId(),
                registration.getUser().getEmail(),
                registration.getEvent().getName(),
                registration.getDistance()

        );

    }

}
