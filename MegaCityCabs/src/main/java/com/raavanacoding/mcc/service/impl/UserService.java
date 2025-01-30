package com.raavanacoding.mcc.service.impl;


import com.raavanacoding.mcc.dto.LoginRequest;
import com.raavanacoding.mcc.dto.Response;
import com.raavanacoding.mcc.dto.UserDTO;
import com.raavanacoding.mcc.entity.User;
import com.raavanacoding.mcc.exception.OurException;
import com.raavanacoding.mcc.repo.UserRepository;
import com.raavanacoding.mcc.service.interfac.IUserService;
import com.raavanacoding.mcc.utils.JWTUtils;
import com.raavanacoding.mcc.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public Response registerUser(User user) {
        Response response = new Response();
        try {
            if(user.getRole()== null || user.getRole().isBlank()){
                user.setRole("USER");
            }
            if(userRepository.existsByEmail(user.getEmail())){
               throw new OurException(user.getEmail()+" Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO= Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user registration"+e.getMessage());
        }
        return null;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new OurException("User  Not Found"));

            var token=jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("Successfully logged in");


        } catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error occurred during user Login"+e.getMessage());

        }

        return response;
    }



    @Override
    public Response getAllUsers() {

        Response response = new Response();
        try {
            List<User> usersList = userRepository.findAll();
            List<UserDTO> userDTOSList = Utils.mapUserListEntityToUserListDTO(usersList);
            response.setStatusCode(200);
            response.setMessage("Successfully");
            response.setUserList(userDTOSList);

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error getting all users"+e.getMessage());

        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(String userId) {
         Response response = new Response();
         try {
             User user =userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User  Not Found"));
             UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndVehicle(user);
             response.setStatusCode(200);
             response.setMessage("Successfully");
             response.setUser(userDTO);




         }catch (OurException e) {

             response.setStatusCode(404);
             response.setMessage(e.getMessage());

         }catch (Exception e) {

             response.setStatusCode(500);
             response.setMessage("Error user booking History"+e.getMessage());

         }

        return response;
    }

    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();
        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User  Not Found"));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(200);
            response.setMessage("Successfully");





        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error occurred during Delete User "+e.getMessage());

        }
        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();
        try {
            User user =userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new OurException("User  Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Successfully");
            response.setUser(userDTO);





        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error occurred during get user by id "+e.getMessage());

        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();
        try {
            User user =userRepository.findByEmail(email).orElseThrow(()-> new OurException("User  Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Successfully");
            response.setUser(userDTO);





        }catch (OurException e) {

            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        }catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error occurred during get user by id "+e.getMessage());

        }
        return response;
    }
}
