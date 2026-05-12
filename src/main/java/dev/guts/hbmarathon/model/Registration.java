package dev.guts.hbmarathon.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(uniqueConstraints = {
		@UniqueConstraint(columnNames = {"user_id", "event_id"})
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Registration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private double distance;

	private double price;
	
	private boolean isPaid;

	@ManyToOne
	private User user;

	@ManyToOne
	private Event event;

}
