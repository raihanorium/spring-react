package com.raihanorium.springreact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.raihanorium.springreact.model.Cargo;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CargoDetailsDto {
    private Cargo cargo;
    private Double totalRent;
    private Double totalReturn;
    private Double totalPaid;
    private Double balance;
}
