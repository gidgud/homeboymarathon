package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.DTO.ResultRequest;
import dev.guts.hbmarathon.mapper.EventMapper;
import dev.guts.hbmarathon.model.Event;
import dev.guts.hbmarathon.model.Result;
import dev.guts.hbmarathon.model.User;
import dev.guts.hbmarathon.repository.EventRepository;
import dev.guts.hbmarathon.repository.UserRepository;
import dev.guts.hbmarathon.service.ResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final EventMapper eventMapper;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private ResultService resultService;

    public ResultController (ResultService resultService, EventMapper eventMapper, EventRepository eventRepository, UserRepository userRepository){
        this.resultService = resultService;
        this.eventMapper = eventMapper;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Result>> findAllResults(){
        List<Result> allResults = resultService.findAllResults();

        return ResponseEntity.ok(allResults);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Result> findResultById (@PathVariable Long id){
        Result result = resultService.findResultById(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Result> createResult (@RequestBody ResultRequest requests){
        Event event = eventRepository.findById(requests.getEventId()).orElseThrow();
        User user = userRepository.findById(requests.getUserId()).orElseThrow();

        Duration duration = Duration.ofSeconds(requests.getTime());

        Result result = Result.builder()
                .event(event)
                .user(user)
                .time(duration)
                .build();

        Result saved = resultService.createResult(result);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Result>> findResultsByEvent(@PathVariable Long eventId) {
        List<Result> results = resultService.findResultsByEventId(eventId);
        return ResponseEntity.ok(results);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Result> updateResult(@PathVariable Long id, Result result){
        Result updateResult = resultService.updateResult(id, result);

        return ResponseEntity.ok(updateResult);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Result> deleteResult(@PathVariable Long id){
        resultService.deleteResult(id);

        return ResponseEntity.noContent().build();
    }
}
