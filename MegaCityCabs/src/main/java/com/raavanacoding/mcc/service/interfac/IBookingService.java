package com.raavanacoding.mcc.service.interfac;


import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long vehicleId, Long userId, Booking bookingRequest);

     Response findBookingByConfirmationCode(String confirmationCode);

     Response getAllBookings();
     Response cancelBooking(Long bookingId);


}
