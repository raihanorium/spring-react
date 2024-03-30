export interface DataManagementService {
    importData(formData: FormData): Promise<string>;
}