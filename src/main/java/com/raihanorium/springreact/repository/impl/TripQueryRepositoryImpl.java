package com.raihanorium.springreact.repository.impl;

import com.querydsl.jpa.JPQLQuery;
import com.raihanorium.springreact.model.QTrip;
import com.raihanorium.springreact.model.Trip;
import com.raihanorium.springreact.repository.QueryDslPageUtils;
import com.raihanorium.springreact.repository.TripQueryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Objects;

@Repository
public class TripQueryRepositoryImpl extends QuerydslRepositorySupport implements TripQueryRepository {
    public TripQueryRepositoryImpl() {
        super(Trip.class);
    }

    @Override
    public Page<Trip> search(String search, Pageable pageable) {
        QTrip trip = new QTrip("trip");

        JPQLQuery<Trip> query = from(trip)
                .select(trip)
                .where(trip.cargo.name.containsIgnoreCase(search)
                        .or(trip.company.name.containsIgnoreCase(search))
                        .or(trip.from.containsIgnoreCase(search))
                        .or(trip.to.containsIgnoreCase(search)));

        return QueryDslPageUtils.createPage(Objects.requireNonNull(getQuerydsl()), query, pageable);
    }
}
