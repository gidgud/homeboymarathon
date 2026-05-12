package dev.guts.hbmarathon.service;

import dev.guts.hbmarathon.DTO.PaymentRequest;
import dev.guts.hbmarathon.DTO.PaymentResponse;

public interface PaymentService {

	PaymentResponse processPayment(PaymentRequest request);
}
