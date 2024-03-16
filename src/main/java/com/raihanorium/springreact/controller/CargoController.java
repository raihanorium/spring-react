package com.raihanorium.springreact.controller;

import com.raihanorium.springreact.exception.CargoNotFoundException;
import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.response.Response;
import com.raihanorium.springreact.service.CargoService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Paths.CARGOS)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class CargoController {

    @Nonnull
    private final CargoService cargoService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Cargo>> getCargo(@PathVariable Long id) {
        return ResponseEntity.ok(Response.<Cargo>builder()
                .success(true)
                .data(cargoService.findById(id).orElseThrow(CargoNotFoundException::new))
                .code(HttpStatus.OK)
                .build());
    }

    @GetMapping
    public ResponseEntity<Response<Page<Cargo>>> getCargos(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(Response.<Page<Cargo>>builder()
                .success(true)
                .data(cargoService.findAll(Pageable.ofSize(size).withPage(page)))
                .code(HttpStatus.OK)
                .build());
    }

    @PostMapping
    public ResponseEntity<Response<Cargo>> saveCargo(@RequestBody Cargo cargo) {
        return ResponseEntity.ok(Response.<Cargo>builder()
                .success(true)
                .data(cargoService.save(cargo))
                .code(HttpStatus.CREATED)
                .build());
    }
}
