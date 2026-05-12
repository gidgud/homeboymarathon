package dev.guts.hbmarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.guts.hbmarathon.model.Registration;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {


    List<Registration> findAllByEvent_Id(Long eventId);

    boolean existsByUser_IdAndEvent_Id(Long userId, Long eventId);
}
