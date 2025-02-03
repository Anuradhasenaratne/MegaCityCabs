package com.raavanacoding.mcc.repo;

import com.raavanacoding.mcc.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByVehicleId(Long vehicleID);

    Optional<Booking> findByBookingConfirmationCode(String bookingConfirmationCode);


    List<Booking> findByUserId(Long userId);

}
