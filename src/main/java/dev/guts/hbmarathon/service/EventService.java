package dev.guts.hbmarathon.service;

import dev.guts.hbmarathon.model.Event;
import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.EventRepository;
import dev.guts.hbmarathon.mapper.EventMapper;

import java.util.List;

@Service
public class EventService {

	private EventRepository eventRepository;

	private EventMapper eventMapper;

	public EventService(EventRepository eventRepository, EventMapper eventMapper) {
		this.eventRepository = eventRepository;
		this.eventMapper = eventMapper;
	}

	public List<Event> findAllEvents() {

		return eventRepository.findAll();

	}

	public Event findEventById(Long eventId) {

		return eventRepository.findById(eventId).orElseThrow();

	}

	public Event createEvent(Event event) {

		return eventRepository.save(event);

	}

	public Event updateEvent(Event event, Long eventId) {

		Event oldEvent = eventRepository.findById(eventId).orElseThrow();

		oldEvent.setName(event.getName());
		oldEvent.setDate(event.getDate());
		oldEvent.setImagePath(event.getImagePath());
		oldEvent.setPrice(event.getPrice());

		Event updatedEvent = eventRepository.save(oldEvent);

		return updatedEvent;

	}

	public void deleteEvent(Long eventId) {

		Event event = eventRepository.findById(eventId).orElseThrow();

		eventRepository.delete(event);

	}

}
