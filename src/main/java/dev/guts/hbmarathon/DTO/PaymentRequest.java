package dev.guts.hbmarathon.DTO;

import java.math.BigDecimal;

public record PaymentRequest(
	String userId,
	String runId,
	BigDecimal amount,
	String currency,
	String cardToken
) {
}
