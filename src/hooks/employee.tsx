// src/services/employee.ts
import { apiClient } from "../services/api";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  hireDate: string;
}

export interface CreateEmployeeDTO {
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  hireDate?: string;
}

export const employeeApi = {
  /**
   * Get all employees
   */
  async getAll(): Promise<Employee[]> {
    try {
      return await apiClient.get<Employee[]>('/api/employee');
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },

  /**
   * Get employee by ID
   */
  async getById(id: number): Promise<Employee> {
    try {
      return await apiClient.get<Employee>(`/api/employee/${id}`);
    } catch (error) {
      console.error(`Failed to fetch employee ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new employee
   */
  async create(employee: CreateEmployeeDTO): Promise<Employee> {
    try {
      return await apiClient.post<Employee>('/api/employee', employee);
    } catch (error) {
      console.error('Failed to create employee:', error);
      throw error;
    }
  },

  /**
   * Update an existing employee
   */
  async update(id: number, employee: Partial<CreateEmployeeDTO>): Promise<Employee> {
    try {
      return await apiClient.put<Employee>(`/api/employee/${id}`, {
        id,
        ...employee,
      });
    } catch (error) {
      console.error(`Failed to update employee ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an employee
   */
  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete<void>(`/api/employee/${id}`);
    } catch (error) {
      console.error(`Failed to delete employee ${id}:`, error);
      throw error;
    }
  },
};