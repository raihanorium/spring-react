package com.raihanorium.springreact.service.impl;

import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.model.Company;
import com.raihanorium.springreact.model.Trip;
import com.raihanorium.springreact.service.CargoService;
import com.raihanorium.springreact.service.CompanyService;
import com.raihanorium.springreact.service.DataManagementService;
import com.raihanorium.springreact.service.TripService;
import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor(onConstructor_ = @Nonnull)
@Log4j2
public class DataManagementServiceImpl implements DataManagementService {

    @Nonnull
    private final CompanyService companyService;
    @Nonnull
    private final CargoService cargoService;
    @Nonnull
    private final TripService tripService;

    @Transactional
    @Override
    public void importData(String fileName, MultipartFile file) {
        try {
            InputStream in = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(in);
            importCompanies(workbook);
            importCargos(workbook);
            importTrips(workbook);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void importCompanies(Workbook workbook) {
        companyService.deleteAll();
        Sheet sheet = workbook.getSheet("Company");
        for (Row row : sheet) {
            if (isNotBlank(row) && isNotHeaderRow(row)) {
                Company company = Company.builder()
                        .name(row.getCell(1).getStringCellValue().trim())
                        .contactPerson(row.getCell(2).getStringCellValue().trim())
                        .contactNo(row.getCell(3).getStringCellValue().trim())
                        .officeAddress(row.getCell(4).getStringCellValue().trim())
                        .build();
                companyService.save(company);
            }
        }
        log.info("Done importing companies.");
    }

    private void importCargos(Workbook workbook) {
        cargoService.deleteAll();
        Sheet sheet = workbook.getSheet("Cargo");
        for (Row row : sheet) {
            if (isNotBlank(row) && isNotHeaderRow(row)) {
                if (!StringUtils.isBlank(row.getCell(1).getStringCellValue().trim())) {
                    Cargo cargo = Cargo.builder()
                            .name(row.getCell(1).getStringCellValue().trim())
                            .proprietor(row.getCell(2).getStringCellValue().trim())
                            .contactNo(row.getCell(3).getStringCellValue())
                            .address(row.getCell(4).getStringCellValue())
                            .contactNo(row.getCell(5).getStringCellValue())
                            .build();
                    cargoService.save(cargo);
                }
            }
        }
        log.info("Done importing cargos.");
    }

    private void importTrips(Workbook workbook) {
        tripService.deleteAll();
        Sheet sheet = workbook.getSheet("Trip");
        for (Row row : sheet) {
            if (isNotBlank(row) && isNotHeaderRow(row)) {
                companyService.findByName(row.getCell(2).getStringCellValue().trim()).ifPresent(company ->
                        cargoService.findByName(row.getCell(3).getStringCellValue().trim()).ifPresent(cargo -> {
                            Trip trip = Trip.builder()
                                    .company(company)
                                    .cargo(cargo)
                                    .startDate(getDateValue(row.getCell(4)))
                                    .endDate(getDateValue(row.getCell(5)))
                                    .from(row.getCell(6).getStringCellValue().trim())
                                    .to(row.getCell(7).getStringCellValue().trim())
                                    .rent(row.getCell(8).getNumericCellValue())
                                    .build();
                            tripService.save(trip);
                        }));
            }
        }
        log.info("Done importing trips.");
    }

    private static LocalDate getDateValue(Cell cell) {
        if (cell.getLocalDateTimeCellValue() != null) {
            return cell.getLocalDateTimeCellValue().toLocalDate();
        }
        return null;
    }

    public static boolean isNotBlank(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK)
                return true;
        }
        return false;
    }

    public static boolean isNotHeaderRow(final Row row) {
        return !row.getCell(row.getFirstCellNum()).getCellType().equals(CellType.STRING) ||
                !row.getCell(row.getFirstCellNum()).getStringCellValue().trim().equalsIgnoreCase("id");
    }
}
