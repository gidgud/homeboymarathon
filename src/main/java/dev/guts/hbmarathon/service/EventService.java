package dev.guts.hbmarathon.service;

import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.EventRepository;
import dev.guts.hbmarathon.mapper.EventMapper;

@Service
public class EventService {

	private EventRepository eventRepository;

	private EventMapper eventMapper;

	public EventService(EventRepository eventRepository, EventMapper eventMapper) {
		this.eventRepository = eventRepository;
		this.eventMapper = eventMapper;
	}
}
