package com.raihanorium.springreact.exception;

public class CompanyNotFoundException extends NotFoundException {
    public CompanyNotFoundException() {
        super("Company not found!");
    }
}
