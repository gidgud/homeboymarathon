package dev.guts.hbmarathon.service;

import org.springframework.stereotype.Service;

import dev.guts.hbmarathon.DTO.PaymentRequest;
import dev.guts.hbmarathon.DTO.PaymentResponse;
import dev.guts.hbmarathon.model.PaymentStatus;

@Service
public class RegistrationPaymentService {

	private final PaymentService paymentService;
	private final RegistrationService registrationService;

	public RegistrationPaymentService(PaymentService paymentService, RegistrationService registrationService) {

		this.paymentService = paymentService;
		this.registrationService = registrationService;
	}

	public PaymentResponse payForRegistration(Long registrationId, PaymentRequest request) {

		PaymentResponse response = paymentService.processPayment(request);

		if(response.status() == PaymentStatus.SUCCESS) {
			registrationService.confirmPayment(registrationId);
		}
		
		return response;
	}
}
