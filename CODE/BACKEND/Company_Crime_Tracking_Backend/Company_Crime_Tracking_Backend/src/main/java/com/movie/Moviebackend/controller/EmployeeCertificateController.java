package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.movie.Moviebackend.model.EmployeeCertificate;
import com.movie.Moviebackend.repository.EmployeeCertificateRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/certifications")
public class EmployeeCertificateController {

    @Autowired
    private EmployeeCertificateRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    private static final String STORAGE_DIR = "uploads/certificates/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCertificate(
            @RequestParam("employeeId") String employeeId,
            @RequestParam("file") MultipartFile file) {
        try {
            Path directory = Paths.get(STORAGE_DIR);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            Path path = directory.resolve(file.getOriginalFilename());
            Files.write(path, file.getBytes());

            String hash = generateFileHash(path.toFile());

            EmployeeCertificate certificate = new EmployeeCertificate();
            certificate.setEmployeeId(employeeId);
            certificate.setFilePath(path.toString());
            certificate.setHash(hash);

            repository.save(certificate);

            return ResponseEntity.ok("Certificate uploaded successfully for employee ID: " + employeeId);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload certificate: " + e.getMessage());
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeCertificate>> getAllCertificates() {
        List<EmployeeCertificate> certificates = repository.findAll();
        certificates.forEach(certificate -> {
            String modifiedPath = certificate.getFilePath().replace("uploads/certificates/", "");
            certificate.setFilePath(modifiedPath);
        });
        return ResponseEntity.ok(certificates);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCertificate(
            @RequestParam("employeeId") String employeeId,
            @RequestParam("file") MultipartFile file) {
        try {
            EmployeeCertificate certificate = repository.findByEmployeeId(employeeId);
            if (certificate == null) {
                return ResponseEntity.status(404).body("Certificate not found for employee ID: " + employeeId);
            }

            String hash = generateFileHash(file);
            if (hash.equals(certificate.getHash())) {
                return ResponseEntity.ok("Certificate is valid.");
            } else {
                return ResponseEntity.status(400).body("Certificate is invalid.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Verification failed: " + e.getMessage());
        }
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeCertificate> getCertificateByEmployeeId(@PathVariable String employeeId) {
        EmployeeCertificate certificate = repository.findByEmployeeId(employeeId);
        if (certificate == null) {
            return ResponseEntity.status(404).body(null);
        }
        
        String modifiedPath = certificate.getFilePath().replace("uploads/certificates/", "");
        certificate.setFilePath(modifiedPath);
        
        return ResponseEntity.ok(certificate);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable Long id) {
        EmployeeCertificate certificate = repository.findById(id).orElse(null);
        if (certificate == null) {
            return ResponseEntity.status(404).body(null); // 404 if not found
        }

        try {
            Path filePath = Paths.get(certificate.getFilePath());
            byte[] fileContent = Files.readAllBytes(filePath);

            return ResponseEntity.ok()
                    .contentType(Files.probeContentType(filePath) != null ?
                            MediaType.parseMediaType(Files.probeContentType(filePath)) : MediaType.APPLICATION_OCTET_STREAM)
                    .header("Content-Disposition", "attachment; filename=\"" + filePath.getFileName() + "\"")
                    .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null); // 500 for server error
        }
    }

    private String generateFileHash(File file) throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] fileBytes = Files.readAllBytes(file.toPath());
            byte[] hashBytes = digest.digest(fileBytes);
            return bytesToHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new IOException("Could not generate file hash: algorithm not found", e);
        }
    }

    private String generateFileHash(MultipartFile file) throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(file.getBytes());
            byte[] hashBytes = digest.digest();
            return bytesToHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new IOException("Could not generate file hash: algorithm not found", e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
