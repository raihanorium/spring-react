import {CompanyService} from "./CompanyService";
import {useMemo} from "react";
import {CompanyServiceImpl} from "./impl/CompanyServiceImpl";
import {CargoService} from "./CargoService";
import {CargoServiceImpl} from "./impl/CargoServiceImpl";
import {TripService} from "./TripService";
import {TripServiceImpl} from "./impl/TripServiceImpl";
import {VoucherService} from "./VoucherService";
import {VoucherServiceImpl} from "./impl/VoucherServiceImpl";

export const useCompanyService = (): CompanyService | null => {
    return useMemo((): CompanyService | null => {
        return new CompanyServiceImpl();
    }, []);
};

export const useCargoService = (): CargoService | null => {
    return useMemo((): CargoService | null => {
        return new CargoServiceImpl();
    }, []);
};

export const useTripService = (): TripService | null => {
    return useMemo((): TripService | null => {
        return new TripServiceImpl();
    }, []);
};

export const useVoucherService = (): VoucherService | null => {
    return useMemo((): VoucherService | null => {
        return new VoucherServiceImpl();
    }, []);
};
