import {Page} from "../model/Page";
import {Cargo} from "../model/Cargo";
import {PageParams} from "../model/PageParams";
import {CargoDetailsDto} from "../model/CargoDetailsDto";

export interface CargoService {
    getCargos(page: PageParams): Promise<Page<Cargo>>;
    getCargo(id?: number): Promise<Cargo>;
    getCargoDetails(id?: number): Promise<CargoDetailsDto>;
    saveCargo(cargo: Cargo): Promise<Cargo>;
}