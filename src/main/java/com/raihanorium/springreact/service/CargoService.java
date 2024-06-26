package com.raihanorium.springreact.service;

import com.raihanorium.springreact.dto.CargoDetailsDto;
import com.raihanorium.springreact.model.Cargo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CargoService {
    Optional<Cargo> findById(Long id);

    Optional<Cargo> findByName(String cargoName);

    Page<Cargo> findAll(String name, Pageable pageable);

    Cargo save(Cargo cargo);

    void deleteAll();

    CargoDetailsDto getCargoDetails(Long cargoId);
}
