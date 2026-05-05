package dev.guts.hbmarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.guts.hbmarathon.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

	
}
