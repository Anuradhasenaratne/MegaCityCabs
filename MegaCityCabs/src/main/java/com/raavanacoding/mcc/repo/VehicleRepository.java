package com.raavanacoding.mcc.repo;

import com.raavanacoding.mcc.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("SELECT DISTINCT v.vehicleType FROM Vehicle v")
    List<String> findDistinctVehicleType();


//    @Query("SELECT v FROM Vehicle  v WHERE v.vehicleType LIKE %vehicleType% AND v.id NOT IN (SELECT bk.vehicle.id FROM Booking bk WHERE " +
//            "(bk.checkInDate <= :checkOutDate ) AND (bk.checkOutDate >= :checkInDate))")
//    List<Vehicle> findAvailableVehiclesByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String vehicleType);

    @Query("SELECT v FROM Vehicle v " +
            "WHERE v.vehicleType = :vehicleType " +
            "AND v.id NOT IN (" +
            "    SELECT b.vehicle.id FROM Booking b " +
            "    WHERE b.checkOutDate > :checkInDate " +
            "    AND b.checkInDate < :checkOutDate" +
            ")")
    List<Vehicle> findAvailableVehiclesByDatesAndTypes(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("vehicleType") String vehicleType
    );





    @Query("SELECT v FROM Vehicle v WHERE v.id NOT IN (SELECT b.vehicle.id FROM Booking b)")
    List<Vehicle> getAllAvailableVehicles();

}
