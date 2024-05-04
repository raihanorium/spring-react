package com.raihanorium.springreact.repository;

import com.raihanorium.springreact.model.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface TripQueryRepository {

    Page<Trip> search(String search, Pageable pageable);
}
