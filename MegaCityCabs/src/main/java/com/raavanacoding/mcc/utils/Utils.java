package com.raavanacoding.mcc.utils;

import com.raavanacoding.mcc.dto.BookingDTO;
import com.raavanacoding.mcc.dto.UserDTO;
import com.raavanacoding.mcc.dto.VehicleDTO;
import com.raavanacoding.mcc.entity.Booking;
import com.raavanacoding.mcc.entity.User;
import com.raavanacoding.mcc.entity.Vehicle;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    private static final  String ALPHANUMARIC_STRING = "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    private  static  final SecureRandom secureRandom = new SecureRandom();


    public static String generateAlphaNumeric(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for(int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMARIC_STRING.length());
            char randomChar = ALPHANUMARIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        userDTO.setNic(user.getNic());
        return userDTO;


    }


    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndVehicle(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        userDTO.setNic(user.getNic());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedRoom(booking,false)).collect(Collectors.toList()));
        }


        return userDTO;

    }

    public  static BookingDTO mapBookingEntityToBookingDTOPlusBookedRoom(Booking booking,boolean mapUser) {
         BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setPickUpLocation(booking.getPickUpLocation());
        bookingDTO.setDropOffLocation(booking.getDropOffLocation());
        bookingDTO.setGetDriver(booking.getGetDriver());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if(mapUser){
            bookingDTO.setUser(mapUserEntityToUserDTO(booking.getUser()));

        }
        if (booking.getVehicle() != null) {
            VehicleDTO vehicleDTO = new VehicleDTO();

            vehicleDTO.setId(booking.getVehicle().getId());
            vehicleDTO.setVehicleType(booking.getVehicle().getVehicleType());
            vehicleDTO.setVehiclePrice(booking.getVehicle().getVehiclePrice());
            vehicleDTO.setVehicleTransmission(booking.getVehicle().getVehicleTransmission());
            vehicleDTO.setVehicleSeats(booking.getVehicle().getVehicleSeats());
            vehicleDTO.setVehicleDescription(booking.getVehicle().getVehicleDescription());
            vehicleDTO.setVehiclePhotoUrl(booking.getVehicle().getVehiclePhotoUrl());
            bookingDTO.setVehicle(vehicleDTO);
        }
        return bookingDTO;
    }

    public static VehicleDTO mapVehicleEntityToVehicleDTO(Vehicle vehicle) {
        VehicleDTO vehicleDTO = new VehicleDTO();

        vehicleDTO.setId(vehicle.getId());
        vehicleDTO.setVehicleType(vehicle.getVehicleType());
        vehicleDTO.setVehiclePrice(vehicle.getVehiclePrice());
        vehicleDTO.setVehicleTransmission(vehicle.getVehicleTransmission());
        vehicleDTO.setVehicleSeats(vehicle.getVehicleSeats());
        vehicleDTO.setVehicleDescription(vehicle.getVehicleDescription());
        vehicleDTO.setVehiclePhotoUrl(vehicle.getVehiclePhotoUrl());
        return vehicleDTO;


    }

    public static VehicleDTO mapVehicleEntityToVehicleDTOPlusBookings(Vehicle vehicle) {
        VehicleDTO vehicleDTO = new VehicleDTO();

        vehicleDTO.setId(vehicle.getId());
        vehicleDTO.setVehicleType(vehicle.getVehicleType());
        vehicleDTO.setVehiclePrice(vehicle.getVehiclePrice());
        vehicleDTO.setVehicleTransmission(vehicle.getVehicleTransmission());
        vehicleDTO.setVehicleSeats(vehicle.getVehicleSeats());
       vehicleDTO.setVehicleDescription(vehicle.getVehicleDescription());
        vehicleDTO.setVehiclePhotoUrl(vehicle.getVehiclePhotoUrl());

        if(vehicle.getBookings() != null) {
            vehicleDTO.setBookings(vehicle.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }



        return vehicleDTO;
    }

    public static  BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setPickUpLocation(booking.getPickUpLocation());
        bookingDTO.setDropOffLocation(booking.getDropOffLocation());
        bookingDTO.setGetDriver(booking.getGetDriver());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }

    public  static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public  static List<VehicleDTO> mapVehicleListEntityToVehicleListDTO(List<Vehicle> vehicleList) {
        return vehicleList.stream().map(Utils::mapVehicleEntityToVehicleDTO).collect(Collectors.toList());
    }
    public  static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }



}
