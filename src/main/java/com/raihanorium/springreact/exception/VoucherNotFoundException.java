package com.raihanorium.springreact.exception;

public class VoucherNotFoundException extends NotFoundException {
    public VoucherNotFoundException() {
        super("Voucher not found!");
    }
}
