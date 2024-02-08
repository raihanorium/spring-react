package com.raihanorium.springreact.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(targetEntity = Cargo.class, cascade = CascadeType.DETACH)
    private Cargo cargo;

    @ManyToOne(targetEntity = Trip.class, cascade = CascadeType.DETACH)
    private Trip trip;

    private String voucherNo;
    private LocalDate date;
    private Double dr;
    private Double cr;
    private String particular;
}
