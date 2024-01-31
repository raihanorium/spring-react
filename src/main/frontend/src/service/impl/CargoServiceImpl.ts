import {Paths} from "../../utils/Paths";
import {Page} from "../../model/Page";
import {Cargo} from "../../model/Cargo";
import {CargoService} from "../CargoService";

export class CargoServiceImpl implements CargoService {
    constructor() {
    }

    async getCargos(): Promise<Page<Cargo>> {
        return await fetch(Paths.CARGOS).then(async response => {
            if (response.ok) {
                const json = await response.json();
                return new Page<Cargo>(json.data.content, json.data.number, json.data.size, json.data.totalElements);
            } else {
                throw new Error("Failed to fetch cargos");
            }
        });
    }

    async saveCargo(cargo: Cargo): Promise<Cargo> {
        return await fetch(Paths.CARGOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cargo)
        }).then(async response => {
            if (response.ok) {
                const json = await response.json();
                return new Cargo(json.data.id, json.data.name, json.data.proprietor, json.data.contactNo, json.data.address, json.data.reference);
            } else {
                throw new Error("Failed to save cargo");
            }
        });
    }
}