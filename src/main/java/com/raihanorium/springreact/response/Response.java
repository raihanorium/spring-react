package com.raihanorium.springreact.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class Response<T> {
    boolean success;
    T data;
    HttpStatus code;
    String message;
}
