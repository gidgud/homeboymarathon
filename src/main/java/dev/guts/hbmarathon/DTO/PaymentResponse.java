package dev.guts.hbmarathon.DTO;

import java.time.Instant;

import dev.guts.hbmarathon.model.PaymentStatus;

public record PaymentResponse(
	String transactionId,
	PaymentStatus status,
	String message,
	Instant timestamp
) {
}
