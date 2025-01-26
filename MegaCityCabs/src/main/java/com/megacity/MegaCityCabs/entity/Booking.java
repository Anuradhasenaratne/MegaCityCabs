package com.megacity.MegaCityCabs.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Check-in date is required")
    private LocalDate checkInDate;

    @NotNull(message = "Check-out date is required")
    private LocalDate checkOutDate;

    private Integer driver;  // Nullable field
    private Integer wifi;    // Nullable field

    private int totalCostOfCustomer;

    @Column(unique = true)
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    // Calculate total cost dynamically, handling null values
    public void calculateTotalCostOfCustomer() {
        // Use 0 if driver or wifi is null
        int driverCost = (driver != null) ? driver : 0;
        int wifiCost = (wifi != null) ? wifi : 0;
        this.totalCostOfCustomer = driverCost + wifiCost;
    }

    // Ensure cost recalculates when setting driver or wifi
    public void setDriver(Integer driver) {
        this.driver = driver;
        calculateTotalCostOfCustomer();
    }

    public void setWifi(Integer wifi) {
        this.wifi = wifi;
        calculateTotalCostOfCustomer();
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", driver=" + driver +
                ", wifi=" + wifi +
                ", totalCostOfCustomer=" + totalCostOfCustomer +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
                '}';
    }
}
