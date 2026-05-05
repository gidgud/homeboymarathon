package dev.guts.hbmarathon.service;

import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.AdminRepository;

@Service
public class AdminService {

	private AdminRepository adminRepository;

	public AdminService(AdminRepository adminRepository) {
		this.adminRepository = adminRepository;
	}
}
