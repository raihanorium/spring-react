package com.raihanorium.springreact.service;

import com.raihanorium.springreact.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> findById(Long id);

    Optional<Company> findByName(String companyName);

    Page<Company> findAll(Pageable pageable);

    Company save(Company company);

    void deleteAll();
}
