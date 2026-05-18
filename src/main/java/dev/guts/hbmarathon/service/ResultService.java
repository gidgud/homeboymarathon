package dev.guts.hbmarathon.service;

import dev.guts.hbmarathon.model.Registration;
import dev.guts.hbmarathon.model.Result;
import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.repository.ResultRepository;

import java.time.Duration;
import java.util.List;

@Service
public class ResultService {

	private ResultRepository resultRepository;

	public ResultService(ResultRepository resultRepository) {
		this.resultRepository = resultRepository;
	}

	public List<Result> findAllResults(){
		return resultRepository.findAll();
	}

	public Result findResultById (Long id) {
		return resultRepository.findById(id).orElseThrow();
	}

	public Result createResult (Result result){
		return resultRepository.save(result);
	}

	public List<Result> findResultsByEventId(Long eventId) {
		return resultRepository.findByEventId(eventId);
	}

	public Result updateResult (Long id, Result result){
		Result oldResult = resultRepository.findById(id).orElseThrow();

		oldResult.setTime(result.getTime());

		Result updatedResult = resultRepository.save(oldResult);

		return updatedResult;
	}

	public void deleteResult(Long id){
		Result result = resultRepository.findById(id).orElseThrow();

		resultRepository.delete(result);
	}

	public String calculatePace (Result result, Registration registration){
		Duration time = result.getTime();

		double timeInSeconds = time.toSeconds();
		double distance = registration.getDistance();

		double paceInSeconds = timeInSeconds/distance;

		int minutes = (int) paceInSeconds/60;
		int seconds = (int) paceInSeconds%60;

		return String.format("%d:%02d min/km", minutes,seconds);
	}

}
