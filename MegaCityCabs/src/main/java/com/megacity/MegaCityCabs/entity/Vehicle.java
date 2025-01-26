package com.megacity.MegaCityCabs.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vehicle type is required")
    private String vehicleType;

    @NotNull(message = "Vehicle price is required")
    @Column(precision = 10, scale = 2)
    private BigDecimal vehiclePrice;

    @NotBlank(message = "Vehicle model is required")
    private String vehicleModel;

    @Pattern(regexp = "https?://.*", message = "Photo URL must be a valid HTTP/HTTPS URL")
    private String vehiclePhotoUrl;

    @Column(name = "description", length = 500)  // Optional: limit description length
    private String vehicleDescription;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", vehicleType='" + vehicleType + '\'' +
                ", vehiclePrice=" + vehiclePrice +
                ", vehicleModel='" + vehicleModel + '\'' +
                ", vehiclePhotoUrl='" + vehiclePhotoUrl + '\'' +
                ", description='" + vehicleDescription + '\'' +
                '}';
    }
}
