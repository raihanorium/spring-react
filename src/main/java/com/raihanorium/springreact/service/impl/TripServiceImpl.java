package com.raihanorium.springreact.service.impl;

import com.raihanorium.springreact.model.Trip;
import com.raihanorium.springreact.repository.TripRepository;
import com.raihanorium.springreact.service.TripService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = @Nonnull)
public class TripServiceImpl implements TripService {

    @Nonnull
    private final TripRepository tripRepository;


    @Override
    public Optional<Trip> findById(Long id) {
        return tripRepository.findById(id);
    }

    @Override
    public Page<Trip> findAll(Pageable pageable) {
        return tripRepository.findAll(pageable);
    }

    @Override
    public Trip save(Trip trip) {
        return tripRepository.save(trip);
    }
}
