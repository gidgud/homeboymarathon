package dev.guts.hbmarathon.service;

import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.RegistrationRepository;

@Service
public class RegistrationService {

	private RegistrationRepository registrationRepository;

	public RegistrationService(RegistrationRepository registrationRepository) {
		this.registrationRepository = registrationRepository;
	}
	
}
