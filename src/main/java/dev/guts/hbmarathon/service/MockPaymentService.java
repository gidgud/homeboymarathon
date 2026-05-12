package dev.guts.hbmarathon.service;


import java.time.Instant;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.DTO.PaymentRequest;
import dev.guts.hbmarathon.DTO.PaymentResponse;
import dev.guts.hbmarathon.model.PaymentStatus;

@Service
public class MockPaymentService implements PaymentService {

	private static final Logger log = LoggerFactory.getLogger(MockPaymentService.class);

	@Override
	public PaymentResponse processPayment(PaymentRequest request) {
		log.info("Mock payment: user={} run={} amount={} {}",
		request.userId(), request.runId(), request.amount(), request.currency());

		if ("fail_test".equals(request.cardToken())) {
			return new PaymentResponse(
				null,
				PaymentStatus.FAILED,
				"Payment declined (mock)",
				Instant.now()
			);
		}

		return new PaymentResponse(
			"MOCK-" + UUID.randomUUID(),
			PaymentStatus.SUCCESS,
			"Payment confirmed (mock)",
			Instant.now()
		);

	}
	
}
