package com.raihanorium.springreact.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TripDto {
    private Long id;
    private Long companyId;
    private Long cargoId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String from;
    private String to;
    private Double rent;
}
