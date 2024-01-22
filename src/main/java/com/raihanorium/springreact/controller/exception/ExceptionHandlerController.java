package com.raihanorium.springreact.controller.exception;

import com.raihanorium.springreact.exception.NotFoundException;
import com.raihanorium.springreact.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExceptionHandlerController {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Response<NotFoundException>> handleException(NotFoundException ex) {
        return ResponseEntity.ok(Response.<NotFoundException>builder()
                .data(ex)
                .build());
    }
}
