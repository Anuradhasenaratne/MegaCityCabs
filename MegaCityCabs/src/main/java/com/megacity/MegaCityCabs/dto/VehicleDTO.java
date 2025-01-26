package com.megacity.MegaCityCabs.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VehicleDTO {

    private long id;
    private String vehicleType;
    private BigDecimal vehiclePrice;
    private String vehiclePhotoUrl;
    private String vehicleDescription;

    // List of associated bookings (if needed)
    private List<BookingDTO> bookings;
}
