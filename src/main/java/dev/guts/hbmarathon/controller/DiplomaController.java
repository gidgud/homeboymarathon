package dev.guts.hbmarathon.controller;

import dev.guts.hbmarathon.model.Diploma;
import dev.guts.hbmarathon.service.DiplomaService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/diplomas")
public class DiplomaController {

    private final DiplomaService diplomaService;

    public DiplomaController(DiplomaService diplomaService) {
        this.diplomaService = diplomaService;
    }

    @GetMapping
    public ResponseEntity<List<Diploma>> findAllDiplomas (){

        List<Diploma> allDiplomas = diplomaService.findAllDiplomas();

        return ResponseEntity.ok(allDiplomas);
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Diploma> findDiploma (@PathVariable Long id){

        Diploma diploma = diplomaService.findDiplomaById(id);

        return ResponseEntity.ok(diploma);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file) throws IOException {
        String uploadDir = "uploads/diplomas/";
        Files.createDirectories(Paths.get(uploadDir));


        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + filename);
        Files.write(filePath, file.getBytes());

        return ResponseEntity.ok(Map.of("imagePath", "/" + uploadDir + filename));

    }

    @DeleteMapping
    public ResponseEntity<Void> deleteDiploma (@PathVariable Long id) {

        diplomaService.deleteDiploma(id);

        return ResponseEntity.noContent().build();
    }



}
