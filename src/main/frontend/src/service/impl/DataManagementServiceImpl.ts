import {ImportForm} from "../../model/ImportForm";
import {DataManagementService} from "../DataManagementService";
import {Paths} from "../../utils/Paths";

export class DataManagementServiceImpl implements DataManagementService {

  constructor() {
  }

  async importData(importForm: ImportForm): Promise<ImportForm> {
    return await fetch(Paths.IMPORT_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(importForm)
    }).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return new ImportForm(json.data.importFile);
      } else {
        throw new Error("Failed to import data");
      }
    });
  }
}