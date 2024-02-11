import {Page} from "../model/Page";
import {Voucher} from "../model/Voucher";

export interface VoucherService {
    getVouchers(page?: number): Promise<Page<Voucher>>;
    saveVoucher(voucher: Voucher): Promise<Voucher>;
}