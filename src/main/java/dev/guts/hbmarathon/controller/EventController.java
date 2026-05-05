package dev.guts.hbmarathon.controller;

import org.springframework.web.bind.annotation.RestController;

import dev.guts.hbmarathon.Service.EventService;

@RestController
public class EventController {

	private EventService eventService;

	public EventController(EventService eventService) {
		this.eventService = eventService;
	}
}
