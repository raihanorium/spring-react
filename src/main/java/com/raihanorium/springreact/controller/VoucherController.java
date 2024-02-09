package com.raihanorium.springreact.controller;

import com.raihanorium.springreact.dto.VoucherDto;
import com.raihanorium.springreact.exception.CargoNotFoundException;
import com.raihanorium.springreact.exception.TripNotFoundException;
import com.raihanorium.springreact.exception.VoucherNotFoundException;
import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.model.Trip;
import com.raihanorium.springreact.model.Voucher;
import com.raihanorium.springreact.response.Response;
import com.raihanorium.springreact.service.CargoService;
import com.raihanorium.springreact.service.TripService;
import com.raihanorium.springreact.service.VoucherService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping(Paths.VOUCHERS)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class VoucherController {

    @Nonnull
    private final VoucherService voucherService;
    private final CargoService cargoService;
    private final TripService tripService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Voucher>> getVoucher(@PathVariable Long id) {
        return ResponseEntity.ok(Response.<Voucher>builder()
                .success(true)
                .data(voucherService.findById(id).orElseThrow(VoucherNotFoundException::new))
                .code(HttpStatus.OK)
                .build());
    }

    @GetMapping
    public ResponseEntity<Response<Page<Voucher>>> getVouchers(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(Response.<Page<Voucher>>builder()
                .success(true)
                .data(voucherService.findAll(Pageable.ofSize(size).withPage(page)))
                .code(HttpStatus.OK)
                .build());
    }

    @PostMapping
    public ResponseEntity<Response<Voucher>> createVoucher(@RequestBody VoucherDto voucherDto) {
        Cargo cargo = cargoService.findById(voucherDto.getCargoId()).orElseThrow(CargoNotFoundException::new);
        Trip trip = Objects.isNull(voucherDto.getTripId()) ? null : tripService.findById(voucherDto.getTripId()).orElseThrow(TripNotFoundException::new);
        Voucher voucher = Voucher.builder()
                .cargo(cargo)
                .trip(trip)
                .voucherNo(voucherDto.getVoucherNo())
                .date(voucherDto.getDate())
                .dr(voucherDto.getDr())
                .cr(voucherDto.getCr())
                .particular(voucherDto.getParticular())
                .build();
        return ResponseEntity.ok(Response.<Voucher>builder()
                .success(true)
                .data(voucherService.save(voucher))
                .code(HttpStatus.CREATED)
                .build());
    }
}
