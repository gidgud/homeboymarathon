package dev.guts.hbmarathon.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.guts.hbmarathon.DTO.PaymentRequest;
import dev.guts.hbmarathon.DTO.PaymentResponse;
import dev.guts.hbmarathon.model.PaymentStatus;
import dev.guts.hbmarathon.service.RegistrationPaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

	private final RegistrationPaymentService registrationPaymentService;

	public PaymentController(RegistrationPaymentService registrationPaymentService) {
		this.registrationPaymentService = registrationPaymentService;
	}

	@PostMapping("/run-registration/{registrationId}")
	public ResponseEntity<PaymentResponse> payForRegistration(@PathVariable Long registrationId, @RequestBody PaymentRequest request) {

		PaymentResponse response = registrationPaymentService.payForRegistration(registrationId, request);

		HttpStatus status = response.status() == PaymentStatus.SUCCESS
		? HttpStatus.OK
		: HttpStatus.PAYMENT_REQUIRED;

		return ResponseEntity.status(status).body(response);
	}
}
