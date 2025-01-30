package com.raavanacoding.mcc.service.impl;

import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.service.interfac.IVehicleService;
import org.joda.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
public class VehicleService implements IVehicleService {

    @Override
    public Response addNewVehicle(MultipartFile photo, String vehicleType, BigDecimal vehiclePrice, String vehicleTransmission, String vehicleSeats, String vehicleDescription) {
               return null;
    }

    @Override
    public List<String> getAllVehicleTypes() {
        return List.of();
    }

    @Override
    public Response getAllVehicles() {
        return null;
    }

    @Override
    public Response deleteVehicle(Long vehicleId) {
        return null;
    }

    @Override
    public Response updateVehicle(Long vehicleId, String vehicleType, BigDecimal vehiclePrice, String vehicleTransmission, String vehicleSeats, String vehicleDescription, MultipartFile photo) {
        return null;
    }

    @Override
    public Response getVehicleById(Long vehicleId) {
        return null;
    }

    @Override
    public Response getAvailableVehiclesByDateAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String vehicleType) {
        return null;
    }

    @Override
    public Response getAllAvailableVehicles() {
        return null;
    }
}
