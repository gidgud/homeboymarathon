package dev.guts.hbmarathon.service;

import dev.guts.hbmarathon.DTO.RegistrationRequest;
import dev.guts.hbmarathon.DTO.RegistrationResponse;
import dev.guts.hbmarathon.mapper.RegistrationMapper;
import dev.guts.hbmarathon.model.Event;
import dev.guts.hbmarathon.model.Registration;
import dev.guts.hbmarathon.model.User;
import dev.guts.hbmarathon.repository.EventRepository;
import dev.guts.hbmarathon.repository.UserRepository;
import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.RegistrationRepository;

import java.util.List;

@Service
public class RegistrationService {

	private RegistrationRepository registrationRepository;
	private UserRepository userRepository;
	private EventRepository eventRepository;
	private RegistrationMapper registrationMapper;

	public RegistrationService(RegistrationRepository registrationRepository, UserRepository userRepository, EventRepository eventRepository, RegistrationMapper registrationMapper) {
		this.registrationRepository = registrationRepository;
		this.userRepository = userRepository;
		this.eventRepository = eventRepository;
		this.registrationMapper = registrationMapper;
	}

	public RegistrationResponse createRegistration(RegistrationRequest registrationRequest) {

		if(registrationRepository.existsByUser_IdAndEvent_Id(registrationRequest.userId(), registrationRequest.eventId())) {
			throw new RuntimeException();
		}

		User user = userRepository.findById(registrationRequest.userId()).orElseThrow();
		Event event = eventRepository.findById(registrationRequest.eventId()).orElseThrow();

		Registration registration = new Registration();
		registration.setUser(user);
		registration.setEvent(event);
		registration.setDistance(registrationRequest.distance());

		Registration savedRegistration = registrationRepository.save(registration);

		return registrationMapper.mapToResponse(savedRegistration);

	}

	public void deleteRegistration(Long registrationId) {

		Registration registration = registrationRepository.findById(registrationId).orElseThrow();

		registrationRepository.delete(registration);

	}

	public RegistrationResponse confirmPayment(Long registrationId) {

		Registration registration = registrationRepository.findById(registrationId).orElseThrow();

		registration.setPaid(true);

		registrationRepository.save(registration);

		return registrationMapper.mapToResponse(registration);

	}

	public List<RegistrationResponse> findRegistrationForSpecificEvent(Long eventId) {

		return registrationRepository.findAllByEvent_Id(eventId)
				.stream()
				.map(registrationMapper::mapToResponse)
				.toList();

	}




	
}
