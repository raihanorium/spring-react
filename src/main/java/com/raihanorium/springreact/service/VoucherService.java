package com.raihanorium.springreact.service;

import com.raihanorium.springreact.model.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface VoucherService {
    Optional<Voucher> findById(Long id);

    Page<Voucher> findAll(Pageable pageable);

    Voucher save(Voucher voucher);
}
