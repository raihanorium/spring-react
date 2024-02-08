package com.raihanorium.springreact.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class VoucherDto {
    private Long id;
    private Long cargoId;
    private Long tripId;
    private String voucherNo;
    private LocalDate date;
    private Double dr;
    private Double cr;
    private String particular;
}
