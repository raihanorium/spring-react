package com.raihanorium.springreact.controller;

import com.raihanorium.springreact.exception.CompanyNotFoundException;
import com.raihanorium.springreact.model.Company;
import com.raihanorium.springreact.response.Response;
import com.raihanorium.springreact.service.CompanyService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/api/v1/companies")
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class CompanyController {

    @Nonnull
    private final CompanyService companyService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Company>> getCompany(@PathVariable Long id) {
        return ResponseEntity.ok(Response.<Company>builder()
                .data(companyService.findById(id).orElseThrow(CompanyNotFoundException::new))
                .build());
    }
}
