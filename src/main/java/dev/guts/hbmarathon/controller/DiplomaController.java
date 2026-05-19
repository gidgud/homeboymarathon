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
import java.util.stream.Collectors;

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

    @GetMapping("/files")
    public ResponseEntity<List<String>> getDiplomaFiles() throws IOException {
        Path uploadDir = Paths.get("uploads/diplomas/");

        if (!Files.exists(uploadDir)) {
            return ResponseEntity.ok(List.of());
        }

        List<String> filePaths = Files.list(uploadDir)
                .map(path -> "/uploads/diplomas/" + path.getFileName().toString())
                .collect(Collectors.toList());

        return ResponseEntity.ok(filePaths);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiploma (@PathVariable Long id) {

        diplomaService.deleteDiploma(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/files/{filename}")
    public ResponseEntity<Void> deleteDiplomaFile(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get("uploads/diplomas/" + filename);

        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }

        Files.delete(filePath);
        return ResponseEntity.noContent().build();
    }



}
