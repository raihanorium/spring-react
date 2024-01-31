package com.raihanorium.springreact.exception;

public class CargoNotFoundException extends NotFoundException {
    public CargoNotFoundException() {
        super("Cargo not found!");
    }
}
