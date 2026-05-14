package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.model.Result;
import dev.guts.hbmarathon.service.ResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private ResultService resultService;

    public ResultController (ResultService resultService){
        this.resultService = resultService;
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
    public ResponseEntity<Result> createResult (@RequestBody Result result){
        Result newResult = resultService.createResult(result);

        return ResponseEntity.ok(newResult);
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
