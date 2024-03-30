package com.raihanorium.springreact.service;

import org.springframework.web.multipart.MultipartFile;

public interface DataManagementService {
    void importData(String fileName, MultipartFile file);
}
