package dev.guts.hbmarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.guts.hbmarathon.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

	
}
