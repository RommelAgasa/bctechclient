import { useState } from "react";
import { Plus } from 'lucide-react';
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  hireDate: string;
}

// Main App Component
export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    salary: '',
    hireDate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      position: formData.position,
      salary: parseFloat(formData.salary),
      hireDate: formData.hireDate,
    };
    setEmployees([...employees, newEmployee]);
    closeFormModal();
  };

  const handleUpdateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    
    const updatedEmployees = employees.map(emp =>
      emp.id === selectedEmployee.id
        ? {
            ...emp,
            firstName: formData.firstName,
            lastName: formData.lastName,
            position: formData.position,
            salary: parseFloat(formData.salary),
            hireDate: formData.hireDate,
          }
        : emp
    );
    setEmployees(updatedEmployees);
    closeFormModal();
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
      salary: employee.salary.toString(),
      hireDate: employee.hireDate,
    });
    setFormModalOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setDeleteModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  const openCreateModal = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
    setFormData({
      firstName: '',
      lastName: '',
      position: '',
      salary: '',
      hireDate: new Date().toISOString().split('T')[0],
    });
    setFormModalOpen(true);
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light text-black uppercase">Manage Employees</h1>
          <button
            onClick={openCreateModal}
            className="w-12 h-12 rounded-full bg-purple-400 text-white flex items-center justify-center hover:bg-purple-500 transition shadow-md"
          >
            <Plus size={24} />
          </button>
        </div>

        <EmployeeTable 
          employees={employees} 
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <EmployeeFormModal
          isOpen={formModalOpen}
          isEditMode={isEditMode}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={isEditMode ? handleUpdateEmployee : handleCreateEmployee}
          onClose={closeFormModal}
        />

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          employeeName={selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      </div>
    </div>
  );
}