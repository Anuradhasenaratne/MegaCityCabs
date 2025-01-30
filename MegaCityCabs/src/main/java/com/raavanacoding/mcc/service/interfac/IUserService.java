package com.raavanacoding.mcc.service.interfac;

import com.raavanacoding.mcc.dto.LoginRequest;
import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.entity.User;

public interface IUserService {
    Response registerUser(User user);
    Response login(LoginRequest loginRequest);


    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);

}
