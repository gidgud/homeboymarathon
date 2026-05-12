package dev.guts.hbmarathon.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.guts.hbmarathon.DTO.PaymentRequest;
import dev.guts.hbmarathon.DTO.PaymentResponse;
import dev.guts.hbmarathon.model.PaymentStatus;
import dev.guts.hbmarathon.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

	private final PaymentService paymentService;

	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	@PostMapping("/run-registration")
	public ResponseEntity<PaymentResponse> registerForRun(@RequestBody PaymentRequest request) {

		PaymentResponse response = paymentService.processPayment(request);

		HttpStatus status = response.status() == PaymentStatus.SUCCESS
		? HttpStatus.OK
		: HttpStatus.PAYMENT_REQUIRED;

		return ResponseEntity.status(status).body(response);
	}
}
