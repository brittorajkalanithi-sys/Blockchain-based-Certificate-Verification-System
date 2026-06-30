package com.movie.Moviebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.Moviebackend.model.EmployeeCertificate;

public interface EmployeeCertificateRepository extends JpaRepository<EmployeeCertificate, Long> {
    EmployeeCertificate findByEmployeeId(String employeeId);
}
