package dev.guts.hbmarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.guts.hbmarathon.model.Result;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

	
}
