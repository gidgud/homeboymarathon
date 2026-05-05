package dev.guts.hbmarathon.service;

import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.ResultRepository;

@Service
public class ResultService {

	private ResultRepository resultRepository;

	public ResultService(ResultRepository resultRepository) {
		this.resultRepository = resultRepository;
	}

}
