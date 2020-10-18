package com.iamalexvybornyi.backend.controller;

import com.iamalexvybornyi.backend.model.Employee;
import com.iamalexvybornyi.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Get all employees.
     *
     * @return list of all employees in the DB
     */
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Add new employee.
     *
     * @param employee - employee object
     * @return added employee
     */
    @PostMapping("employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }
}
