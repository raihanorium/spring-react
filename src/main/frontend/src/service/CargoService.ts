import {Page} from "../model/Page";
import {Cargo} from "../model/Cargo";

export interface CargoService {
    getCargos(): Promise<Page<Cargo>>;
    saveCargo(cargo: Cargo): Promise<Cargo>;
}