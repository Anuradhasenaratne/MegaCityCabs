package com.raavanacoding.megacitycabs.response;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class VehicleResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String vehicleType;


    private String vehicleModel;


    private BigDecimal vehiclePrice;

    private boolean isBooked = false;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String photo;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BookingResponse> bookings;

    public VehicleResponse(Long id, String vehicleType, String vehicleModel,
                           BigDecimal vehiclePrice, boolean isBooked,
                           byte[] photoBytes, List<BookingResponse> bookings) {
        this.id = id;
        this.vehicleType = vehicleType;
        this.vehicleModel = vehicleModel;
        this.vehiclePrice = vehiclePrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
        this.bookings = bookings;
    }


}
