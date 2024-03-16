package com.raihanorium.springreact.controller;

import com.raihanorium.springreact.exception.CompanyNotFoundException;
import com.raihanorium.springreact.model.Company;
import com.raihanorium.springreact.response.Response;
import com.raihanorium.springreact.service.CompanyService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Paths.COMPANIES)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class CompanyController {

    @Nonnull
    private final CompanyService companyService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Company>> getCompany(@PathVariable Long id) {
        return ResponseEntity.ok(Response.<Company>builder()
                .success(true)
                .data(companyService.findById(id).orElseThrow(CompanyNotFoundException::new))
                .code(HttpStatus.OK)
                .build());
    }

    @GetMapping
    public ResponseEntity<Response<Page<Company>>> getCompanies(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(Response.<Page<Company>>builder()
                .success(true)
                .data(companyService.findAll(Pageable.ofSize(size).withPage(page)))
                .code(HttpStatus.OK)
                .build());
    }

    @PostMapping
    public ResponseEntity<Response<Company>> saveCompany(@RequestBody Company company) {
        return ResponseEntity.ok(Response.<Company>builder()
                .success(true)
                .data(companyService.save(company))
                .code(HttpStatus.CREATED)
                .build());
    }
}
