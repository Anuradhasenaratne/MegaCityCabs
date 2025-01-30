package com.raavanacoding.mcc.service.interfac;

import com.raavanacoding.mcc.dto.Response;

import org.joda.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface IVehicleService {

    Response addNewVehicle(MultipartFile photo,String vehicleType,BigDecimal vehiclePrice,String vehicleTransmission,String vehicleSeats,String vehicleDescription );

    List<String> getAllVehicleTypes();

    Response getAllVehicles();


    Response deleteVehicle(Long vehicleId);

    Response updateVehicle(Long vehicleId,String vehicleType,BigDecimal vehiclePrice,String vehicleTransmission,String vehicleSeats,String vehicleDescription,MultipartFile photo );

    Response getVehicleById(Long vehicleId);

    Response getAvailableVehiclesByDateAndTypes(LocalDate checkInDate, LocalDate checkOutDate,String vehicleType);

    Response getAllAvailableVehicles();

}
