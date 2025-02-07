package com.raavanacoding.mcc.service.impl;

import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.dto.VehicleDTO;
import com.raavanacoding.mcc.entity.Vehicle;
import com.raavanacoding.mcc.exception.OurException;
import com.raavanacoding.mcc.repo.BookingRepository;
import com.raavanacoding.mcc.repo.VehicleRepository;
import com.raavanacoding.mcc.service.AwsS3Service;
import com.raavanacoding.mcc.service.interfac.IVehicleService;
import com.raavanacoding.mcc.utils.Utils;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
public class VehicleService implements IVehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AwsS3Service awsS3Service;








    @Override
    public Response addNewVehicle(MultipartFile photo, String vehicleType, BigDecimal vehiclePrice, String vehicleTransmission, String vehicleSeats, String vehicleDescription) {
        Response response = new Response();
        try {
            String imageUrl =awsS3Service.saveImageToS3(photo);
            Vehicle vehicle = new Vehicle();
            vehicle.setVehiclePhotoUrl(imageUrl);
            vehicle.setVehicleType(vehicleType);
            vehicle.setVehiclePrice(vehiclePrice);
            vehicle.setVehicleTransmission(vehicleTransmission);
            vehicle.setVehicleSeats(vehicleSeats);
            vehicle.setVehicleDescription(vehicleDescription);

            Vehicle savedVehicle=vehicleRepository.save(vehicle);
            VehicleDTO vehicleDTO = Utils.mapVehicleEntityToVehicleDTO(savedVehicle);
            response.setStatusCode(200);
            response.setMessage("Vehicle added successfully");
            response.setVehicle(vehicleDTO);


        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error Saving a Vehicle "+e.getMessage());

        }
               return response;
    }

    @Override
    public List<String> getAllVehicleTypes() {

        return vehicleRepository.findDistinctVehicleType();


    }

    @Override
    public Response getAllVehicles() {
        Response response = new Response();
        try {
            List<Vehicle> vehicleList = vehicleRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
            List<VehicleDTO> vehicleDTOList=Utils.mapVehicleListEntityToVehicleListDTO(vehicleList);
            response.setStatusCode(200);
            response.setMessage("successfully");
            response.setVehicleList(vehicleDTOList);


        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error get all Vehicles "+e.getMessage());

        }
        return response;
    }

    @Override
    public Response deleteVehicle(Long vehicleId) {
        Response response = new Response();
        try {

            vehicleRepository.findById(vehicleId).orElseThrow(()->new OurException("Vehicle not found"));
            vehicleRepository.deleteById(vehicleId);
            response.setMessage("successfully");
            response.setStatusCode(200);



        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error get deleteVehicle "+e.getMessage());

        }
        return response;
    }


    @Override
    public Response updateVehicle(Long vehicleId, String vehicleType, BigDecimal vehiclePrice, String vehicleTransmission, String vehicleSeats, String vehicleDescription, MultipartFile photo) {
        Response response = new Response();
        try {
            String imageUrl =null;
            if(photo!=null && !photo.isEmpty()){
                imageUrl=awsS3Service.saveImageToS3(photo);
            }
            Vehicle vehicle=vehicleRepository.findById(vehicleId).orElseThrow(()->new OurException("Vehicle not found"));

            if(vehicleType != null )vehicle.setVehicleType(vehicleType);
            if(vehiclePrice != null )vehicle.setVehiclePrice(vehiclePrice);
            if(vehicleTransmission != null )vehicle.setVehicleTransmission(vehicleTransmission);
            if(vehicleSeats != null )vehicle.setVehicleSeats(vehicleSeats);
            if(vehicleDescription != null )vehicle.setVehicleDescription(vehicleDescription);
            if(imageUrl != null )vehicle.setVehiclePhotoUrl(imageUrl);

            Vehicle updateVehicle =vehicleRepository.save(vehicle);
            VehicleDTO vehicleDTO = Utils.mapVehicleEntityToVehicleDTO(updateVehicle);
            response.setMessage("successfully");
            response.setStatusCode(200);
            response.setVehicle(vehicleDTO);



        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error updateVehicle "+e.getMessage());

        }
        return response;

    }

    @Override
    public Response getVehicleById(Long vehicleId) {
        Response response = new Response();
        try {

           Vehicle vehicle= vehicleRepository.findById(vehicleId).orElseThrow(()->new OurException("Vehicle not found"));
           VehicleDTO vehicleDTO = Utils.mapVehicleEntityToVehicleDTOPlusBookings(vehicle);

            response.setMessage("successfully");
            response.setStatusCode(200);
            response.setVehicle(vehicleDTO);



        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error get deleteVehicle "+e.getMessage());

        }

        return response;
    }

//    @Override
//    public Response getAvailableVehiclesByDateAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String vehicleType) {
//        Response response = new Response();
//        try {
//
//           List<Vehicle> availableVehicle= vehicleRepository.findAvailableVehiclesByDatesAndTypes(checkInDate,checkOutDate,vehicleType);
//            response.setMessage("successfully");
//            response.setStatusCode(200);
//
//
//
//
//        }catch (OurException e) {
//
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//
//        }catch (Exception e) {
//
//            response.setStatusCode(500);
//            response.setMessage("Error get deleteVehicle "+e.getMessage());
//
//        }
//        return response;
//    }

    @Override
    public Response getAvailableVehiclesByDateAndTypes(org.joda.time.LocalDate checkInDate, org.joda.time.LocalDate checkOutDate, String vehicleType) {
        Response response = new Response();
        try {
            // Convert Joda-Time LocalDate to Java 8 LocalDate
            LocalDate convertedCheckInDate = LocalDate.of(checkInDate.getYear(), checkInDate.getMonthOfYear(), checkInDate.getDayOfMonth());
            LocalDate convertedCheckOutDate = LocalDate.of(checkOutDate.getYear(), checkOutDate.getMonthOfYear(), checkOutDate.getDayOfMonth());

            List<Vehicle> availableVehicle= vehicleRepository.findAvailableVehiclesByDatesAndTypes(convertedCheckInDate, convertedCheckOutDate, vehicleType);
            List<VehicleDTO> vehicleDTOList=Utils.mapVehicleListEntityToVehicleListDTO(availableVehicle);
            response.setMessage("Successfully fetched available vehicles");
            response.setStatusCode(200);
            response.setVehicleList(vehicleDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching available vehicles: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableVehicles() {
        Response response = new Response();
        try {

           List<Vehicle> vehicleList = vehicleRepository.getAllAvailableVehicles();
           List<VehicleDTO> vehicleDTOList=Utils.mapVehicleListEntityToVehicleListDTO(vehicleList);

            response.setMessage("successfully");
            response.setStatusCode(200);
            response.setVehicleList(vehicleDTOList);



        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error get deleteVehicle "+e.getMessage());

        }

        return response;
    }
}
