import {CompanyService} from "./CompanyService";
import {useMemo} from "react";
import {CompanyServiceImpl} from "./impl/CompanyServiceImpl";
import {CargoService} from "./CargoService";
import {CargoServiceImpl} from "./impl/CargoServiceImpl";

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