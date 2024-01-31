import {CompanyService} from "./CompanyService";
import {useMemo} from "react";
import {CompanyServiceImpl} from "./impl/CompanyServiceImpl";

export const useCompanyService = (): CompanyService | null => {
    return useMemo((): CompanyService | null => {
        return new CompanyServiceImpl();
    }, []);
};