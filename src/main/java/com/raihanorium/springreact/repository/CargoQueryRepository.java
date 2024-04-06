package com.raihanorium.springreact.repository;

import com.raihanorium.springreact.dto.CargoDetailsDto;
import org.springframework.stereotype.Repository;

@Repository
public interface CargoQueryRepository {

    CargoDetailsDto getCargoDetails(Long cargoId);

}
