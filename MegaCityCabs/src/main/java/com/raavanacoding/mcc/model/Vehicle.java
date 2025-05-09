package com.raavanacoding.megacitycabs.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor

public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehicleType;
    private String vehicleModel;
    private BigDecimal vehiclePrice;
    private boolean isBooked=false;
    @Lob
    private Blob photo;

    @OneToMany(mappedBy="vehicle", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedVehicle> bookings;

    public Vehicle() {
        this.bookings = new ArrayList<BookedVehicle>();
    }

    public void addBooking(BookedVehicle booking) {
        if(bookings == null){
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setVehicle(this);
        isBooked=true;

        String bookingCode= RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);
    }
}
