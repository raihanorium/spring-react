package com.raihanorium.springreact.service.impl;

import com.raihanorium.springreact.model.Company;
import com.raihanorium.springreact.repository.CompanyRepository;
import com.raihanorium.springreact.service.CompanyService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = @Nonnull)
public class CompanyServiceImpl implements CompanyService {

    @Nonnull
    private final CompanyRepository companyRepository;


    @Override
    public Optional<Company> findById(Long id) {
        return companyRepository.findById(id);
    }

    @Override
    public List<Company> findAll(Long id) {
        return companyRepository.findAll();
    }

    @Override
    public Company save(Company company) {
        return companyRepository.save(company);
    }
}