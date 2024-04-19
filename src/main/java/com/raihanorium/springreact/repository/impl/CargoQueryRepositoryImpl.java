package com.raihanorium.springreact.repository.impl;

import com.raihanorium.springreact.dto.CargoDetailsDto;
import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.model.QCargo;
import com.raihanorium.springreact.model.QTrip;
import com.raihanorium.springreact.model.QVoucher;
import com.raihanorium.springreact.repository.CargoQueryRepository;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class CargoQueryRepositoryImpl extends QuerydslRepositorySupport implements CargoQueryRepository {
    public CargoQueryRepositoryImpl() {
        super(Cargo.class);
    }

    @Override
    public CargoDetailsDto getCargoDetails(Long cargoId) {
        QCargo cargo = new QCargo("c");
        QTrip trip = new QTrip("t");
        QVoucher voucher = new QVoucher("v");

        Cargo cargoDetail = from(cargo)
                .where(cargo.id.eq(cargoId))
                .fetchOne();

        Double totalRent = from(trip)
                .select(trip.rent.sum().coalesce(0d))
                .where(trip.cargo.id.eq(cargoId))
                .fetchOne();

        Double totalReturn = from(voucher)
                .select(voucher.dr.sum().coalesce(0d))
                .where(voucher.cargo.id.eq(cargoId))
                .fetchOne();

        Double totalPaid = from(voucher)
                .select(voucher.cr.sum().coalesce(0d))
                .where(voucher.cargo.id.eq(cargoId))
                .fetchOne();

        return CargoDetailsDto.builder()
                .cargo(cargoDetail)
                .totalRent(totalRent)
                .totalReturn(totalReturn)
                .totalPaid(totalPaid)
                .balance((totalRent + totalReturn) - totalPaid)
                .build();
    }
}
