package com.raavanacoding.mcc.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;


    private String vehicleType;
    private BigDecimal vehiclePrice;
    private String vehicleTransmission;
    private String vehicleSeats;
    private String vehicleDescription;
    private String vehiclePhotoUrl;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings =new ArrayList<>();

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", vehicleType='" + vehicleType + '\'' +
                ", vehiclePrice=" + vehiclePrice +
                ", vehicleTransmission='" + vehicleTransmission + '\'' +
                ", vehicleSeats='" + vehicleSeats + '\'' +
                ", vehicleDescription='" + vehicleDescription + '\'' +
                ", vehiclePhotoUrl='" + vehiclePhotoUrl + '\'' +
                ", bookings=" + bookings +
                '}';
    }
}
