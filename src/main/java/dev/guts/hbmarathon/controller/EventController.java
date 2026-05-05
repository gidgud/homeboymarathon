package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.model.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.guts.hbmarathon.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

	private EventService eventService;

	public EventController(EventService eventService) {
		this.eventService = eventService;
	}

	@GetMapping
	public ResponseEntity<List<Event>> findAllEvents() {

		List<Event> allEvents = eventService.findAllEvents();

		return ResponseEntity.ok(allEvents);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Event> findEventById(@PathVariable Long eventId) {

		Event event = eventService.findEventById(eventId);

		return ResponseEntity.ok(event);

	}

	@PostMapping
	public ResponseEntity<Event> createEvent(@RequestBody Event event) {

		Event newEvent = eventService.createEvent(event);

		return ResponseEntity.ok().body(newEvent);

	}

	@PutMapping("/{id}")
	public ResponseEntity<Event> updateEvent(@RequestBody Event event, @PathVariable Long eventId) {

		Event updatedEvent = eventService.updateEvent(event, eventId);

		return ResponseEntity.ok().body(updatedEvent);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {

		eventService.deleteEvent(eventId);

		return ResponseEntity.noContent().build();

	}

}
