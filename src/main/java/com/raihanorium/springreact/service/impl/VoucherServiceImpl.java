package com.raihanorium.springreact.service.impl;

import com.raihanorium.springreact.model.Voucher;
import com.raihanorium.springreact.repository.VoucherRepository;
import com.raihanorium.springreact.service.VoucherService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor(onConstructor_ = @Nonnull)
public class VoucherServiceImpl implements VoucherService {

    @Nonnull
    private final VoucherRepository voucherRepository;


    @Override
    public Optional<Voucher> findById(Long id) {
        return voucherRepository.findById(id);
    }

    @Override
    public Page<Voucher> findAll(Pageable pageable) {
        return voucherRepository.findAll(pageable);
    }

    @Override
    public Page<Voucher> findAllByCargoId(Long cargoId, Pageable pageable) {
        return voucherRepository.findAllByCargoId(cargoId, pageable);
    }

    @Override
    public Voucher save(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    @Override
    public void deleteAll() {
        voucherRepository.deleteAll();
    }
}
