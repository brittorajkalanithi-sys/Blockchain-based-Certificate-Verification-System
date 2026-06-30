package com.movie.Moviebackend.repository;

import com.movie.Moviebackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long>
{
	Employee findByEmployeeId(String employeeId);
}
