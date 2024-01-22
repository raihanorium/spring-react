package com.raihanorium.springreact.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Company {
    @Id
    private Long id;

    private String name;
}
