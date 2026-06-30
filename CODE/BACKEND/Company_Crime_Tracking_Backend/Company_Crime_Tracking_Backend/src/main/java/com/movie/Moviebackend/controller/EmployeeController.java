package com.movie.Moviebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.movie.Moviebackend.model.Employee;
import com.movie.Moviebackend.model.LoginRequest;
import com.movie.Moviebackend.repository.EmployeeRepository;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.Date;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    private static final SecretKey secretKey;

    static {
        // Ensure the key is 16 bytes for AES-128
        String staticKey = "my_secret_key_12"; // 16 bytes
        secretKey = new SecretKeySpec(staticKey.getBytes(), "AES");
    }

    @PostMapping("/create")
    public String createEmployee(
            @RequestParam MultipartFile file,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String position,
            @RequestParam String startDate,
            @RequestParam String dob) throws Exception {

        // Create the uploads directory if it doesn't exist
        File uploadDir = new File("uploads");
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        // Save the image to the uploads directory
        String imagePath = "uploads/" + file.getOriginalFilename();
        try (FileOutputStream fos = new FileOutputStream(imagePath)) {
            fos.write(file.getBytes());
        }

        // Create and save the new employee
        Employee employee = new Employee();
        employee.setEmployeeId(generateEmployeeId());
        employee.setName(name);
        employee.setEmail(email);
        employee.setPosition(position);
        employee.setStartDate(Date.valueOf(startDate));
        employee.setDob(Date.valueOf(dob));
        employee.setImagePath(imagePath);
        employee.setStatus("waiting");

        employeeRepository.save(employee);
        return "Employee registered successfully!";
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    @GetMapping("/password/{employeeId}")
    public ResponseEntity<?> getDecryptedPassword(@PathVariable String employeeId) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Employee not found"));
        }

        String encryptedPassword = employee.getPassword();
        String decryptedPassword = decrypt(encryptedPassword);

        return ResponseEntity.ok(Map.of("success", true, "decryptedPassword", decryptedPassword));
    }

    @PostMapping("/set-password")
    public String setPassword(@RequestBody Map<String, String> payload) throws Exception {
        String employeeId = payload.get("employeeId");
        String password = payload.get("password");

        // Encrypt the password
        String encryptedPassword = encrypt(password);

        // Find the employee and update the password
        Employee employee = employeeRepository.findByEmployeeId(employeeId);
        if (employee != null) {
            employee.setPassword(encryptedPassword);
            employeeRepository.save(employee);
            return "Password updated successfully!";
        } else {
            return "Employee not found!";
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
        String employeeId = loginRequest.getEmployeeId();
        String password = loginRequest.getPassword();

        // Find the employee by employeeId
        Employee employee = employeeRepository.findByEmployeeId(employeeId);
        if (employee != null) {
            // Encrypt the input password for comparison
            String encryptedInputPassword = encrypt(password);
            if (encryptedInputPassword != null && encryptedInputPassword.equals(employee.getPassword())) {
                return ResponseEntity.ok(Map.of("success", true, "message", "Login successful"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("success", false, "message", "Invalid credentials"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Employee not found"));
        }
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateEmployeeStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status"); // Extract status from request body

        // Find the employee by id
        Employee employee = employeeRepository.findById(id).orElse(null);
        if (employee != null) {
            employee.setStatus(status); // Update the status
            employeeRepository.save(employee); // Save the updated employee
            return ResponseEntity.ok(Map.of("success", true, "message", "Employee status updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Employee not found"));
        }
    }
    
    @PostMapping("/set-end-date")
    public ResponseEntity<?> setEndDate(@RequestBody Map<String, String> payload) {
        String employeeId = payload.get("employeeId");
        String endDateString = payload.get("endDate");

        // Convert the end date string to a Date object
        Date endDate = Date.valueOf(endDateString);

        // Find the employee by employee ID
        Employee employee = employeeRepository.findByEmployeeId(employeeId);
        if (employee != null) {
            employee.setEndDate(endDate); // Assuming you have a setEndDate method in Employee
            employeeRepository.save(employee); // Save the updated employee
            return ResponseEntity.ok(Map.of("success", true, "message", "End date set successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Employee not found"));
        }
    }
    
    private String encrypt(String data) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedData = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Handle encryption errors
        }
    }

    private String generateEmployeeId() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder employeeId = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int randomIndex = (int) (Math.random() * characters.length());
            employeeId.append(characters.charAt(randomIndex));
        }
        return employeeId.toString();
    }
    
    private String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decodedData = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedData = cipher.doFinal(decodedData);
            return new String(decryptedData);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Handle decryption errors
        }
    }
}
