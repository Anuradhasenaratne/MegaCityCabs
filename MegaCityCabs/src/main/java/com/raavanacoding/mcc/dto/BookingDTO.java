package com.raavanacoding.mcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.raavanacoding.mcc.entity.User;
import com.raavanacoding.mcc.entity.Vehicle;
import lombok.Data;
import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {


    private  Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String pickUpLocation;
    private String dropOffLocation;
    private int getDriver;
    private String bookingConfirmationCode;
    private UserDTO user;
    private VehicleDTO vehicle;

}
