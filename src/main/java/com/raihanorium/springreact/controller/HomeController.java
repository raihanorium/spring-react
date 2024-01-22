package com.raihanorium.springreact.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/rest/api/v1")
public class HomeController {

    @GetMapping("/home")
    public Map<String, String> home() {
        return Map.of("message", "Hello World!");
    }
}
