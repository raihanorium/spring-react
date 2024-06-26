package com.raihanorium.springreact.service.impl;

import com.raihanorium.springreact.model.Cargo;
import com.raihanorium.springreact.model.Company;
import com.raihanorium.springreact.model.Trip;
import com.raihanorium.springreact.model.Voucher;
import com.raihanorium.springreact.service.*;
import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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
    @Nonnull
    private final VoucherService voucherService;

    @Value("${application.upload.temporary.directory}")
    private String tempDirectory;

    private static final Map<Long, Long> tripIdMap = new HashMap<>();

    @Transactional
    @Override
    public void importData(String fileName, File file) {
        try {
            cleanupData();
            try (InputStream in = new FileInputStream(file)) {
                Workbook workbook = new XSSFWorkbook(in);
                importCompanies(workbook);
                importCargos(workbook);
                importTrips(workbook);
                importVouchers(workbook);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error occurred while importing data", e);
        } finally {
            deleteTempFile(file);
        }
    }

    private void cleanupData() {
        voucherService.deleteAll();
        tripService.deleteAll();
        cargoService.deleteAll();
        companyService.deleteAll();
    }

    private void deleteTempFile(File file) {
        if (!file.delete()) {
            throw new RuntimeException("Failed to delete temporary file");
        }
    }

    public File createTempFile(MultipartFile file) {
        File directory = new File(tempDirectory);
        if (!directory.exists() && !directory.mkdirs()) {
            throw new RuntimeException("Failed to create directory");
        }
        File tmpFile = new File(directory, Objects.requireNonNull(file.getOriginalFilename()));
        try {
            if (tmpFile.createNewFile()) {
                try (OutputStream os = new FileOutputStream(tmpFile)) {
                    os.write(file.getBytes());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create temporary file");
        }
        return tmpFile;
    }

    private void importCompanies(Workbook workbook) {
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
        Sheet sheet = workbook.getSheet("Trip");
        for (Row row : sheet) {
            if (isNotBlank(row) && isNotHeaderRow(row)) {
                Long tripNumber = (long) row.getCell(0).getNumericCellValue();
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
                                    .load(row.getCell(9).getNumericCellValue())
                                    .rate(row.getCell(10).getNumericCellValue())
                                    .shortage(row.getCell(11).getNumericCellValue())
                                    .shortageRate(row.getCell(12).getNumericCellValue())
                                    .companyRent(row.getCell(14).getNumericCellValue())
                                    .build();
                            Trip saved = tripService.save(trip);
                            tripIdMap.put(tripNumber, saved.getId());
                        }));
            }
        }
        log.info("Done importing trips.");
    }

    private void importVouchers(Workbook workbook) {
        Sheet sheet = workbook.getSheet("Voucher");
        for (Row row : sheet) {
            if (isNotBlank(row) && isNotHeaderRow(row)) {
                cargoService.findByName(row.getCell(3).getStringCellValue().trim()).ifPresent(cargo -> {
                    String tripValue = StringUtils.defaultIfBlank(row.getCell(1).getStringCellValue().trim(), null);
                    Trip trip = null;
                    if (StringUtils.isNoneBlank(tripValue)) {
                        Long tripId = StringUtils.trimToNull(tripValue.split(" ")[0]) != null ?
                                Long.parseLong(tripValue.split(" ")[0]) : null;
                        trip = tripId != null ? tripService.findById(tripIdMap.get(tripId)).orElse(null) : null;
                    }
                    Voucher voucher = Voucher.builder()
                            .cargo(cargo)
                            .trip(trip)
                            .voucherNo(row.getCell(2).getStringCellValue().trim())
                            .date(getDateValue(row.getCell(4)))
                            .dr(row.getCell(5).getNumericCellValue())
                            .cr(row.getCell(6).getNumericCellValue())
                            .particular(row.getCell(7).getStringCellValue())
                            .build();
                    voucherService.save(voucher);
                });
            }
        }
        log.info("Done importing vouchers.");
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
