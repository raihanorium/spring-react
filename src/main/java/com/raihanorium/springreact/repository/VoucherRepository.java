package com.raihanorium.springreact.repository;

import com.raihanorium.springreact.model.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Page<Voucher> findAllByCargoId(Long cargoId, Pageable pageable);
}
