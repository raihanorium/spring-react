package com.raihanorium.springreact.service;

import com.raihanorium.springreact.model.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    Optional<Company> findById(Long id);

    List<Company> findAll(Long id);

    Company save(Company company);
}
