import {Page} from "../model/Page";
import {Voucher} from "../model/Voucher";

export interface VoucherService {
    getVouchers(): Promise<Page<Voucher>>;
    saveVoucher(voucher: Voucher): Promise<Voucher>;
}