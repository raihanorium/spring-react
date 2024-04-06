import {Paths} from "../../utils/Paths";
import {Page} from "../../model/Page";
import {Cargo} from "../../model/Cargo";
import {CargoService} from "../CargoService";
import {PageParams} from "../../model/PageParams";
import {CargoDetailsDto} from "../../model/CargoDetailsDto";

export class CargoServiceImpl implements CargoService {
  constructor() {
  }

  async getCargos(params: PageParams): Promise<Page<Cargo>> {
    const url = params.isNotBlank() ? `${Paths.CARGOS}?${params.toParamsString()}` : Paths.CARGOS;
    return await fetch(url).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return new Page<Cargo>(json.data.content, json.data.number, json.data.size, json.data.totalElements);
      } else {
        throw new Error("Failed to fetch cargos");
      }
    });
  }

  async getCargo(id: number): Promise<Cargo> {
    return await fetch(`${Paths.CARGOS}/${id}`).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return new Cargo(json.data.id, json.data.name, json.data.proprietor, json.data.contactNo, json.data.address, json.data.reference);
      } else {
        throw new Error("Failed to fetch cargo");
      }
    });
  }

  async getCargoDetails(id: number): Promise<CargoDetailsDto> {
    return await fetch(`${Paths.CARGOS}/${id}/details`).then(async response => {
      if (response.ok) {
        const json = await response.json();
        const cargo = new Cargo(
            json.data.cargo.id,
            json.data.cargo.name,
            json.data.cargo.proprietor,
            json.data.cargo.contactNo,
            json.data.cargo.address,
            json.data.cargo.reference
        );
        return new CargoDetailsDto(cargo, json.data.totalRent, json.data.totalReturn, json.data.totalPaid, json.data.balance);
      } else {
        throw new Error("Failed to fetch cargo details");
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