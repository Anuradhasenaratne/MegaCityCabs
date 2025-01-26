package com.megacity.MegaCityCabs.dto;



import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role;
    private List<BookingDTO> bookings =new ArrayList<>();

}
