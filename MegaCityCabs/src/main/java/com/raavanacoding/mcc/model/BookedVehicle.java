package com.raavanacoding.megacitycabs.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "check_In")
    private LocalDate checkInDate;

    @Column(name = "check_Out")
    private LocalDate checkOutDate;

    @Column(name = "customer_FullName")
    private String customerFullName;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "confirmation_Code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    // New fields for driver
    @Column(name = "driver_required")
    private boolean driverRequired = false; // Default to false

    @Column(name = "driver_cost")
    private int driverCost = 0; // Default to 0

    // Method to update driver cost based on driver requirement
    public void updateDriverCost() {
        if (driverRequired) {
            this.driverCost = 100; // Set driver cost if driver is required
        } else {
            this.driverCost = 0; // Reset driver cost if driver is not required
        }
    }


    public void setDriverRequired(boolean driverRequired) {
        this.driverRequired = driverRequired;
        updateDriverCost(); // Update driver cost whenever driverRequired is set
    }
    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}