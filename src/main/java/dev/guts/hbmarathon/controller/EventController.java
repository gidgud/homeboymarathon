package dev.guts.hbmarathon.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.guts.hbmarathon.model.Event;
import dev.guts.hbmarathon.service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {

	private final EventService eventService;

	public EventController(EventService eventService) {
		this.eventService = eventService;
	}

	@GetMapping
	public ResponseEntity<List<Event>> findAllEvents() {

		List<Event> allEvents = eventService.findAllEvents();

		return ResponseEntity.ok(allEvents);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Event> findEventById(@PathVariable Long id) {

		Event event = eventService.findEventById(id);

		return ResponseEntity.ok(event);

	}

	@PostMapping
	public ResponseEntity<Event> createEvent(@RequestBody Event event) {

		Event newEvent = eventService.createEvent(event);

		return ResponseEntity.ok().body(newEvent);

	}


	@PostMapping("/upload-image")
	public ResponseEntity<Map<String, String>> uploadImage(
		@RequestParam("file") MultipartFile file) throws IOException {
		String uploadDir = "uploads/events/";
		Files.createDirectories(Paths.get(uploadDir));


		String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
		Path filePath = Paths.get(uploadDir + filename);
		Files.write(filePath, file.getBytes());

		return ResponseEntity.ok(Map.of("imagePath", "/" + uploadDir + filename));

	}

	@PutMapping("/{id}")
	public ResponseEntity<Event> updateEvent(@RequestBody Event event, @PathVariable Long id) {

		Event updatedEvent = eventService.updateEvent(event, id);

		return ResponseEntity.ok().body(updatedEvent);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {

		eventService.deleteEvent(id);

		return ResponseEntity.noContent().build();

	}

}
