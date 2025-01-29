package com.raavanacoding.mcc.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.raavanacoding.mcc.entity.Booking;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)

public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;

    private List<BookingDTO> bookings=new ArrayList<>();

}
