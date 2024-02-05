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
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(targetEntity = Company.class, cascade = CascadeType.ALL)
    private Company company;

    @ManyToOne(targetEntity = Cargo.class, cascade = CascadeType.ALL)
    private Cargo cargo;

    private LocalDate startDate;
    private LocalDate endDate;

    @Column(name = "trip_from")
    private String from;

    @Column(name = "trip_to")
    private String to;
    private Double rent;
}
