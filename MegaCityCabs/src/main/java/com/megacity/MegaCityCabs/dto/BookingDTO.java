package com.megacity.MegaCityCabs.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private Long id;
    private LocalDate checkIndate;
    private String checkOutdate;
    private Integer driver;  // Nullable field
    private Integer wifi;
    private int totalCostOfCustomer;
    private String bookingConfirmationCode;
    private UserDTO user;
    private VehicleDTO vehicle;

}
