package com.raihanorium.springreact.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImportDto {
    private String fileName;
    private MultipartFile file;
}
