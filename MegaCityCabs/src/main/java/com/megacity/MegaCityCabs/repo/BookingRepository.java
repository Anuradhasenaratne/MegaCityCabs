package com.megacity.MegaCityCabs.repo;

import com.megacity.MegaCityCabs.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // 1. Find all bookings by a specific user
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId")
    List<Booking> findByUserId(@Param("userId") Long userId);

    // 2. Find all bookings for a specific vehicle
    @Query("SELECT b FROM Booking b WHERE b.vehicle.id = :vehicleId")
    List<Booking> findByVehicleId(@Param("vehicleId") Long vehicleId);

    // 3. Find all bookings between specific dates
    @Query("SELECT b FROM Booking b WHERE b.checkInDate >= :startDate AND b.checkOutDate <= :endDate")
    List<Booking> findBookingsBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    // 4. Check for overlapping bookings for a specific vehicle
    @Query("""
        SELECT b FROM Booking b
        WHERE b.vehicle.id = :vehicleId
          AND b.checkInDate <= :checkOutDate
          AND b.checkOutDate >= :checkInDate
    """)
    List<Booking> findOverlappingBookings(
            @Param("vehicleId") Long vehicleId,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate
    );

    // 5. Find all bookings that include a driver
    @Query("SELECT b FROM Booking b WHERE b.driver > 0")
    List<Booking> findBookingsWithDriver();

    // 6. Find bookings by confirmation code
    @Query("SELECT b FROM Booking b WHERE b.bookingConfamationCode = :code")
    Booking findByConfirmationCode(@Param("code") String confirmationCode);

    // 7. Find all bookings for a user within a specific date range
    @Query("""
        SELECT b FROM Booking b
        WHERE b.user.id = :userId
          AND b.checkInDate >= :startDate
          AND b.checkOutDate <= :endDate
    """)
    List<Booking> findUserBookingsInDateRange(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
