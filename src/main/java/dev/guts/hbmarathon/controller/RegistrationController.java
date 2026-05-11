package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.DTO.RegistrationRequest;
import dev.guts.hbmarathon.DTO.RegistrationResponse;
import dev.guts.hbmarathon.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {

        this.registrationService = registrationService;

    }

    @PostMapping
    public ResponseEntity<RegistrationResponse> createRegistration(@RequestBody RegistrationRequest registrationRequest) {

        return ResponseEntity.ok(registrationService.createRegistration(registrationRequest));

    }

    @DeleteMapping("/{registrationId}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long registrationId) {

        registrationService.deleteRegistration(registrationId);

        return ResponseEntity.noContent().build();

    }

    @PatchMapping("/{registrationId}")
    public ResponseEntity<RegistrationResponse> confirmPayment(@PathVariable Long registrationId) {

        return ResponseEntity.ok().body(registrationService.confirmPayment(registrationId));

    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<RegistrationResponse>> findRegistrationForSpecificEvent(@PathVariable Long eventId) {

        return ResponseEntity.ok(registrationService.findRegistrationForSpecificEvent(eventId));

    }

}
