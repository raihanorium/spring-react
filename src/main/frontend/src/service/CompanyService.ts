import {Company} from "../model/Company";
import {Page} from "../model/Page";

export interface CompanyService {
    getCompanies(): Promise<Page<Company>>;
    saveCompany(company: Company): Promise<Company>;
}