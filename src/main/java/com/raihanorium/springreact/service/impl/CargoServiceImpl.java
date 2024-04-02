package com.raihanorium.springreact.service.impl;

import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.repository.CargoRepository;
import com.raihanorium.springreact.service.CargoService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = @Nonnull)
public class CargoServiceImpl implements CargoService {

    @Nonnull
    private final CargoRepository cargoRepository;


    @Override
    public Optional<Cargo> findById(Long id) {
        return cargoRepository.findById(id);
    }

    @Override
    public Optional<Cargo> findByName(String cargoName) {
        return cargoRepository.findByName(cargoName);
    }

    @Override
    public Page<Cargo> findAll(String name, Pageable pageable) {
        if (StringUtils.isNotBlank(name)) {
            return cargoRepository.findAllByNameLikeIgnoreCase("%" + name + "%", pageable);
        } else {
            return cargoRepository.findAll(pageable);
        }
    }

    @Override
    public Cargo save(Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    @Override
    public void deleteAll() {
        cargoRepository.deleteAll();
    }
}
