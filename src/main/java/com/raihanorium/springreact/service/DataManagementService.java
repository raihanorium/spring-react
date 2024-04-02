package com.raihanorium.springreact.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface DataManagementService {

    File createTempFile(MultipartFile file);
    void importData(String fileName, File file);
}
