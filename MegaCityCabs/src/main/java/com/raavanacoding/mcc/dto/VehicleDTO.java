package com.raavanacoding.mcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.raavanacoding.mcc.entity.Booking;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VehicleDTO {

    private Long id;
    private String vehicleType;
    private BigDecimal vehiclePrice;
    private String vehicleTransmission;
    private String vehicleSeats;
    private String vehicleDescription;
    private String vehiclePhotoUrl;

    private List<BookingDTO> bookings;
}
