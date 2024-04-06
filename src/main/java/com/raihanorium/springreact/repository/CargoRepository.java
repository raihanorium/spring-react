package com.raihanorium.springreact.repository;

import com.raihanorium.springreact.model.Cargo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long>, CargoQueryRepository, QuerydslPredicateExecutor<Cargo> {
    Optional<Cargo> findByName(String cargoName);

    Page<Cargo> findAllByNameLikeIgnoreCase(String name, Pageable pageable);
}
