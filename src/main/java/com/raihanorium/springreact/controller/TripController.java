package com.raihanorium.springreact.controller;

import com.raihanorium.springreact.dto.TripDto;
import com.raihanorium.springreact.exception.CargoNotFoundException;
import com.raihanorium.springreact.exception.CompanyNotFoundException;
import com.raihanorium.springreact.exception.TripNotFoundException;
import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.model.Company;
import com.raihanorium.springreact.model.Trip;
import com.raihanorium.springreact.response.Response;
import com.raihanorium.springreact.service.CargoService;
import com.raihanorium.springreact.service.CompanyService;
import com.raihanorium.springreact.service.TripService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Paths.TRIPS)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class TripController {

    @Nonnull
    private final CompanyService companyService;
    @Nonnull
    private final CargoService cargoService;
    @Nonnull
    private final TripService tripService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Trip>> getTrip(@PathVariable Long id) {
        return ResponseEntity.ok(Response.<Trip>builder()
                .success(true)
                .data(tripService.findById(id).orElseThrow(TripNotFoundException::new))
                .code(HttpStatus.OK)
                .build());
    }

    @GetMapping
    public ResponseEntity<Response<Page<Trip>>> getTrips(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size,
                                                         @RequestParam(defaultValue = "id") String sort,
                                                         @RequestParam(defaultValue = "desc") String direction,
                                                         @RequestParam(defaultValue = "") String search) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sort);
        return ResponseEntity.ok(Response.<Page<Trip>>builder()
                .success(true)
                .data(tripService.findAll(search, pageRequest))
                .code(HttpStatus.OK)
                .build());
    }

    @GetMapping("/cargo/{cargoId}")
    public ResponseEntity<Response<Page<Trip>>> getTripsByCargo(@PathVariable Long cargoId,
                                                                @RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(Response.<Page<Trip>>builder()
                .success(true)
                .data(tripService.findAllByCargoId(cargoId, PageRequest.of(page, size, Sort.by("id").descending())))
                .code(HttpStatus.OK)
                .build());
    }

    @PostMapping
    public ResponseEntity<Response<Trip>> saveTrip(@RequestBody TripDto tripDto) {
        Company company = companyService.findById(tripDto.getCompanyId()).orElseThrow(CompanyNotFoundException::new);
        Cargo cargo = cargoService.findById(tripDto.getCargoId()).orElseThrow(CargoNotFoundException::new);
        Trip trip = Trip.builder()
                .id(tripDto.getId())
                .company(company)
                .cargo(cargo)
                .startDate(tripDto.getStartDate())
                .endDate(tripDto.getEndDate())
                .from(tripDto.getFrom())
                .to(tripDto.getTo())
                .rent(tripDto.getRent())
                .companyRent(tripDto.getCompanyRent())
                .load(tripDto.getLoad())
                .rate(tripDto.getRate())
                .shortage(tripDto.getShortage())
                .shortageRate(tripDto.getShortageRate())
                .build();
        return ResponseEntity.ok(Response.<Trip>builder()
                .success(true)
                .data(tripService.save(trip))
                .code(HttpStatus.CREATED)
                .build());
    }
}
