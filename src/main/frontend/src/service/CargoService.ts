import {Page} from "../model/Page";
import {Cargo} from "../model/Cargo";
import {PageParams} from "../model/PageParams";

export interface CargoService {
    getCargos(page: PageParams): Promise<Page<Cargo>>;
    getCargo(id?: number): Promise<Cargo>;
    saveCargo(cargo: Cargo): Promise<Cargo>;
}