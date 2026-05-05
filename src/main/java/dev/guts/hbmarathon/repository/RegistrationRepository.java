package dev.guts.hbmarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.guts.hbmarathon.model.Registration;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

	
}
