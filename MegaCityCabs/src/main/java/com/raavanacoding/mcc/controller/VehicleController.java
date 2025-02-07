package com.raavanacoding.mcc.controller;


import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.service.impl.VehicleService;
import com.raavanacoding.mcc.service.interfac.IBookingService;
import com.raavanacoding.mcc.service.interfac.IVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.joda.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {
    @Autowired
    private IVehicleService vehicleService;
    @Autowired
    private IBookingService bookingService;





@PostMapping("/add")
@PreAuthorize("hasAuthority('ADMIN')")
public ResponseEntity<Response> addNewVehicle(
        @RequestParam(value = "photo", required = false) MultipartFile photo,
        @RequestParam(value = "vehicleType", required = false) String vehicleType,
        @RequestParam(value = "vehiclePrice", required = false) BigDecimal vehiclePrice,
        @RequestParam(value = "vehicleTransmission", required = false) String vehicleTransmission,
        @RequestParam(value = "vehicleDescription", required = false) String vehicleDescription,
        @RequestParam(value = "vehicleSeats", required = false) String vehicleSeats
) {
    if (photo == null || photo.isEmpty() ||
            vehicleType == null || vehicleType.isBlank() ||
            vehiclePrice == null || vehiclePrice.compareTo(BigDecimal.ZERO) < 0 ||
            vehicleTransmission == null || vehicleTransmission.isBlank() ||
            vehicleSeats == null || vehicleSeats.isBlank()) {

        Response response = new Response();
        response.setStatusCode(400);
        response.setMessage("Please fill all the required fields");

        // Return immediately if validation fails
        return ResponseEntity.status(400).body(response);
    }

    // If validation passes, proceed with the service call
    Response response = vehicleService.addNewVehicle(photo, vehicleType,
            vehiclePrice, vehicleTransmission, vehicleDescription, vehicleSeats);

    return ResponseEntity.status(response.getStatusCode()).body(response);
}


    @GetMapping("/all")
    public ResponseEntity<Response> getAllVehicles() {
        Response response = vehicleService.getAllVehicles();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @GetMapping("/types")
    public List<String> getVehicleTypes() {
        return vehicleService.getAllVehicleTypes();

    }
    @GetMapping("/vehicle-by-id/{vehicleId}")
    public ResponseEntity<Response> getVehicleById(@PathVariable Long vehicleId) {
        Response response = vehicleService.getVehicleById(vehicleId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-vehicles")
    public ResponseEntity<Response> getAvailableVehicle() {
        Response response = vehicleService.getAllAvailableVehicles();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



//    @GetMapping("/available-vehicles-by-date-and-type")
//    public ResponseEntity<Response> getAvailableVehiclesByDateAndType(
//            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) org.joda.time.LocalDate checkInDate,
//            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) org.joda.time.LocalDate checkOutDate ,
//            @RequestParam(required = false) String vehicleType
//    ) {
//        if (checkInDate == null || checkOutDate == null || vehicleType == null || vehicleType.isBlank()) {
//            Response response = new Response();
//            response.setStatusCode(400);
//           response.setMessage("Please fill all the required fields");
//            return ResponseEntity.status(response.getStatusCode()).body(response);
//        }
//
//        Response response = vehicleService.getAvailableVehiclesByDateAndTypes( checkInDate, checkOutDate , vehicleType);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }
@GetMapping("/available-vehicles-by-date-and-type")
public ResponseEntity<Response> getAvailableVehiclesByDateAndType(
        @RequestParam(required = false) String checkInDate,
        @RequestParam(required = false) String checkOutDate,
        @RequestParam(required = false) String vehicleType
) {
    if (checkInDate == null || checkOutDate == null || vehicleType == null || vehicleType.isBlank()) {
        Response response = new Response();
        response.setStatusCode(400);
        response.setMessage("Please fill all the required fields");
        return ResponseEntity.status(400).body(response);
    }

    try {
        // Convert String to Joda-Time LocalDate
        LocalDate jodaCheckInDate = LocalDate.parse(checkInDate);
        LocalDate jodaCheckOutDate = LocalDate.parse(checkOutDate);

        Response response = vehicleService.getAvailableVehiclesByDateAndTypes(jodaCheckInDate, jodaCheckOutDate, vehicleType);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    } catch (Exception e) {
        Response errorResponse = new Response();
        errorResponse.setStatusCode(400);
        errorResponse.setMessage("Invalid date format. Please use YYYY-MM-DD.");
        return ResponseEntity.status(400).body(errorResponse);
    }
}




    @PutMapping("/update/{vehicleId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateVehicle(@PathVariable Long vehicleId,
                                                  @RequestParam(value = "photo" , required = false)MultipartFile photo,
                                                  @RequestParam(value = "vehicleType" , required = false)String vehicleType,
                                                  @RequestParam(value = "vehiclePrice" , required = false)BigDecimal vehiclePrice,
                                                  @RequestParam(value = "vehicleTransmission" , required = false)String vehicleTransmission,
                                                  @RequestParam(value = "vehicleDescription" , required = false)String   vehicleDescription,
                                                  @RequestParam(value = "vehicleSeats" , required = false)String vehicleSeats
                                                  ){
        Response response =vehicleService.updateVehicle(vehicleId,vehicleType,vehiclePrice,vehicleTransmission,vehicleSeats,vehicleDescription,photo);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



    @DeleteMapping("/delete/{vehicleId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteVehicle(@PathVariable Long vehicleId) {
        Response response =vehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    }



