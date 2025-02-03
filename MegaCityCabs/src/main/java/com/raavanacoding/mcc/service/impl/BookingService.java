package com.raavanacoding.mcc.service.impl;

import com.raavanacoding.mcc.dto.BookingDTO;
import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.entity.Booking;
import com.raavanacoding.mcc.entity.User;
import com.raavanacoding.mcc.entity.Vehicle;
import com.raavanacoding.mcc.exception.OurException;
import com.raavanacoding.mcc.repo.BookingRepository;
import com.raavanacoding.mcc.repo.UserRepository;
import com.raavanacoding.mcc.repo.VehicleRepository;
import com.raavanacoding.mcc.service.interfac.IBookingService;
import com.raavanacoding.mcc.service.interfac.IVehicleService;
import com.raavanacoding.mcc.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private IVehicleService vehicleService;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;



    @Override
    public Response saveBooking(Long vehicleId, Long userId, Booking bookingRequest) {

        Response response = new Response();
        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
                throw new IllegalArgumentException("Check in date must come after check out date");

            }
            Vehicle vehicle=vehicleRepository.findById(vehicleId).orElseThrow(()->new OurException("Vehicle not found"));
            User user=userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));

            List<Booking> existingBookings =vehicle.getBookings();

            if(!vehicleisAvailable(bookingRequest,existingBookings)){
                throw new OurException("Vehicle is not available for selected date range");
            }

            bookingRequest.setVehicle(vehicle);
            bookingRequest.setUser(user);
            String bookingConfirmationCode= Utils.generateRandomConfirmationCode(10);

            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.save(bookingRequest);
            response.setStatusCode(200);
            response.setMessage("Booking successful");
            response.setBookingConfirmationCode(bookingConfirmationCode);


        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Saving a Booking"+e.getMessage());
        }
        return response;
    }



    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {
        Response response = new Response();
        try {


           Booking booking=bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()->new OurException("Booking not found"));
            BookingDTO bookingDTO=Utils.mapBookingEntityToBookingDTO(booking);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setBooking(bookingDTO);


        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error finding a Booking"+e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();
        try {


            List<Booking> bookingList=bookingRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
            List<BookingDTO> bookingDTOList=Utils.mapBookingListEntityToBookingListDTO(bookingList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setBookingList(bookingDTOList);


        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting all Booking"+e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {
        Response response = new Response();
        try {


           bookingRepository.findById(bookingId).orElseThrow(()->new OurException("Booking not Exist"));
           bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("successful");


        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Cancelling a Booking"+e.getMessage());
        }
        return response;
    }

    private boolean vehicleisAvailable(Booking bookingRequest, List<Booking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()) );
    }
}
