package dev.guts.hbmarathon.repository;

import dev.guts.hbmarathon.model.Diploma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DiplomaRepository extends JpaRepository<Diploma, Long> {


}