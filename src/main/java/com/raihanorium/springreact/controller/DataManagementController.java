package com.raihanorium.springreact.controller;

import com.raihanorium.springreact.dto.ImportDto;
import com.raihanorium.springreact.response.Response;
import com.raihanorium.springreact.service.DataManagementService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping(Paths.DATA_MANAGEMENT)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Log4j2
public class DataManagementController {

    @Nonnull private final ThreadPoolTaskExecutor threadPoolTaskExecutor;
    @Nonnull private final DataManagementService dataManagementService;

    @PostMapping(path = "/import")
    public ResponseEntity<Response<String>> importData(@ModelAttribute ImportDto importDto) {
        if (importDto.getFile() == null || importDto.getFile().isEmpty()) {
            return ResponseEntity.badRequest().body(Response.<String>builder()
                    .success(false)
                    .message("File is empty or not provided")
                    .build());
        }
        File tempFile = dataManagementService.createTempFile(importDto.getFile());
        threadPoolTaskExecutor.execute(() -> dataManagementService.importData(importDto.getFileName(), tempFile));

        return ResponseEntity.ok(Response.<String>builder()
                .success(true)
                .data("Data import process initiated")
                .build());
    }
}
