package com.movie.Moviebackend.model;

import lombok.Data;
import jakarta.persistence.*;

import java.sql.Date;

@Data
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeId;
    private String name;
    private String email;
    private String position;

    private Date startDate;
    private Date dob;
    private Date endDate; // New field for end date

    private String imagePath; // Store the path to the image file

    private String status;
    private String password; // Encrypted password

    // Default constructor
    public Employee() {}

    // Parameterized constructor
    public Employee(Long id, String employeeId, String name, String email, String position, Date startDate, 
                    Date dob, Date endDate, String imagePath, String status, String password) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.position = position;
        this.startDate = startDate;
        this.dob = dob;
        this.endDate = endDate; // Set end date
        this.imagePath = imagePath;
        this.status = status;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getEndDate() { // Getter for end date
        return endDate;
    }

    public void setEndDate(Date endDate) { // Setter for end date
        this.endDate = endDate;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
