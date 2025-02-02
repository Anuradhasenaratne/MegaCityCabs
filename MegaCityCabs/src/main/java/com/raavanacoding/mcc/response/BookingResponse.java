package com.raavanacoding.megacitycabs.response;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {



    private Long id;

   private LocalDate checkInDate;
    private LocalDate checkOutDate;


    private String vehicleType;


    private String vehicleModel;

    private String customerFullName;

    private String customerEmail;

    private BigDecimal vehiclePrice;

    private boolean isBooked = false;

    private String bookingConfirmationCode;

    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate,
                           String bookingConfirmationCode) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
