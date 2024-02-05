package com.raihanorium.springreact.exception;

public class TripNotFoundException extends NotFoundException {
    public TripNotFoundException() {
        super("Trip not found!");
    }
}
