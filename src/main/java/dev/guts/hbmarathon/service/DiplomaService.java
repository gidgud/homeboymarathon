package dev.guts.hbmarathon.service;


import dev.guts.hbmarathon.model.Diploma;
import dev.guts.hbmarathon.repository.DiplomaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DiplomaService {

    private final DiplomaRepository diplomaRepository;

    public DiplomaService(DiplomaRepository diplomaRepository) {
        this.diplomaRepository = diplomaRepository;
    }

    public List<Diploma> findAllDiplomas (){
        return diplomaRepository.findAll();
    }

    public Diploma findDiplomaById (Long id) {
        return diplomaRepository.findById(id).orElseThrow();
    }

    public void createDiploma (MultipartFile file) throws IOException {

        Diploma diploma = new Diploma();

        diploma.setFileName(file.getOriginalFilename());
        diploma.setFileType(file.getContentType());
        diploma.setData(file.getBytes());

        diplomaRepository.save(diploma);
    }

    public void deleteDiploma (Long id){
        Diploma diploma = diplomaRepository.findById(id).orElseThrow();

        diplomaRepository.delete(diploma);
    }
}
