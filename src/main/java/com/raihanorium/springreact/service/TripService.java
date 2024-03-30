package com.raihanorium.springreact.service;

import com.raihanorium.springreact.model.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TripService {
    Optional<Trip> findById(Long id);

    Page<Trip> findAll(Pageable pageable);

    Trip save(Trip trip);

    void deleteAll();
}
