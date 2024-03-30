export class Paths {
    public static API_BASE: string = process.env.REACT_APP_API_BASE_URL || "/rest/api/v1";
    public static COMPANIES: string = Paths.API_BASE + "/companies";
    public static CARGOS: string = Paths.API_BASE + "/cargos";
    public static TRIPS: string = Paths.API_BASE + "/trips";
    public static VOUCHERS: string = Paths.API_BASE + "/vouchers";
    public static DATA_MANAGEMENT: string = Paths.API_BASE + "/data-management";
    public static IMPORT_DATA: string = Paths.DATA_MANAGEMENT + "/import";
}