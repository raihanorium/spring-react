import {ImportForm} from "../model/ImportForm";

export interface DataManagementService {
    importData(importForm: ImportForm): Promise<ImportForm>;
}