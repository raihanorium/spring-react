package com.raihanorium.springreact.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(Paths.DATA_MANAGEMENT)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class DataManagementController {

    @PostMapping("/import")
    public Map<String, String> importData(@RequestBody String data) {
        Map<String, String> response = Map.of("message", data);
        return response;
    }
}
