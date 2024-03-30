import {DataManagementService} from "../DataManagementService";
import {Paths} from "../../utils/Paths";

export class DataManagementServiceImpl implements DataManagementService {

  constructor() {
  }

  async importData(formData: FormData): Promise<string> {
    return await fetch(Paths.IMPORT_DATA, {
      method: "POST",
      headers: {
      },
      body: formData
    }).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return json.data;
      } else {
        throw new Error("Failed to import data");
      }
    });
  }
}