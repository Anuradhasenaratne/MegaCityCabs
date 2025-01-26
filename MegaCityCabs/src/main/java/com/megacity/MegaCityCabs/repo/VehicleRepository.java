package com.megacity.MegaCityCabs.repo;

import com.megacity.MegaCityCabs.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("SELECT DISTINCT v.vehicleType FROM Vehicle v")
    List<String> findDistinctVehicleTypes();

    @Query("SELECT v FROM Vehicle v WHERE v.id NOT IN (SELECT b.vehicle.id FROM Booking b)")
    List<Vehicle> getAllAvailableVehicles();

    @Query("""
    SELECT v 
    FROM Vehicle v 
    WHERE v.vehicleType LIKE %:vehicleType% 
      AND v.id NOT IN (
          SELECT bk.vehicle.id 
          FROM Booking bk 
          WHERE 
              (bk.checkInDate <= :checkoutDate AND bk.checkOutDate >= :checkinDate)
      )
""")
    List<Vehicle> findAvailableVehicleByDateAndTypes(
            @Param("checkinDate") LocalDate checkinDate,
            @Param("checkoutDate") LocalDate checkoutDate,
            @Param("vehicleType") String vehicleType
    );

}
