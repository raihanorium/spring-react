import {CompanyService} from "../CompanyService";
import {Paths} from "../../utils/Paths";
import {Page} from "../../model/Page";
import {Company} from "../../model/Company";

export class CompanyServiceImpl implements CompanyService {
    constructor() {
    }

    async getCompanies(page?: number): Promise<Page<Company>> {
        const url = page ? `${Paths.COMPANIES}?page=${page}` : Paths.COMPANIES;
        return await fetch(url).then(async response => {
            if (response.ok) {
                const json = await response.json();
                return new Page<Company>(json.data.content, json.data.number, json.data.size, json.data.totalElements);
            } else {
                throw new Error("Failed to fetch companies");
            }
        });
    }

    async getCompany(id: number): Promise<Company> {
        return await fetch(`${Paths.COMPANIES}/${id}`).then(async response => {
            if (response.ok) {
                const json = await response.json();
                return new Company(json.data.id, json.data.name, json.data.contactPerson, json.data.contactNo, json.data.officeAddress);
            } else {
                throw new Error("Failed to fetch company");
            }
        });
    }

    async saveCompany(company: Company): Promise<Company> {
        return await fetch(Paths.COMPANIES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(company)
        }).then(async response => {
            if (response.ok) {
                const json = await response.json();
                return new Company(json.data.id, json.data.name, json.data.contactPerson, json.data.contactNo, json.data.officeAddress);
            } else {
                throw new Error("Failed to save company");
            }
        });
    }
}