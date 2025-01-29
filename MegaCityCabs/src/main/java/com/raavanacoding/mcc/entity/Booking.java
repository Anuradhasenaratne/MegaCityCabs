package com.raavanacoding.mcc.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
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
    private  Long id;
    @NotNull(message = "PickUp date is required")
    private LocalDate checkInDate;
    @Future(message = "DropOff date is required")
    private LocalDate checkOutDate;


    private String pickUpLocation;
    private String dropOffLocation;

    @Min(value = 0, message = "you can take driver free or with driver ")
    private int getDriver;

    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", pickUpLocation='" + pickUpLocation + '\'' +
                ", dropOffLocation='" + dropOffLocation + '\'' +
                ", getDriver=" + getDriver +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +

                '}';
    }
}
