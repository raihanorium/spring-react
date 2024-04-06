import {Paths} from "../../utils/Paths";
import {Page} from "../../model/Page";
import {Voucher} from "../../model/Voucher";
import {VoucherService} from "../VoucherService";

export class VoucherServiceImpl implements VoucherService {
  constructor() {
  }

  async getVouchers(page?: number): Promise<Page<Voucher>> {
    const url = page ? `${Paths.VOUCHERS}?page=${page}` : Paths.VOUCHERS;
    return await this.getVouchersPage(url);
  }

  async getVouchersByCargo(cargoId: number, page?: number): Promise<Page<Voucher>> {
    const url = page ? `${Paths.VOUCHERS}/cargo/${cargoId}?page=${page}` : `${Paths.VOUCHERS}/cargo/${cargoId}`;
    return await this.getVouchersPage(url);
  }

  private async getVouchersPage(url: string) {
    return await fetch(url).then(async response => {
      if (response.ok) {
        const json = await response.json();
        const vouchers = json.data.content.map((voucher: any) => new Voucher(voucher.id, voucher.cargo.name, voucher.trip?.id, voucher.voucherNo, new Date(voucher.date), voucher.dr, voucher.cr, voucher.particular));
        return new Page<Voucher>(vouchers, json.data.number, json.data.size, json.data.totalElements);
      } else {
        throw new Error("Failed to fetch vouchers");
      }
    });
  }

  async getVoucher(id: number): Promise<Voucher> {
    return await fetch(`${Paths.VOUCHERS}/${id}`).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return new Voucher(json.data.id, json.data.cargo?.id, json.data.trip?.id, json.data.voucherNo, new Date(json.data.date), json.data.dr, json.data.cr, json.data.particular);
      } else {
        throw new Error("Failed to fetch voucher");
      }
    });
  }

  async saveVoucher(voucher: Voucher): Promise<Voucher> {
    return await fetch(Paths.VOUCHERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(voucher)
    }).then(async response => {
      if (response.ok) {
        const json = await response.json();
        return new Voucher(json.data.id, json.data.cargoId, json.data.tripId, json.data.voucherNo, json.data.date, json.data.dr, json.data.cr, json.data.particular);
      } else {
        throw new Error("Failed to save voucher");
      }
    });
  }
}