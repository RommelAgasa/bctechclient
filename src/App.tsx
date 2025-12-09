import { useState, useEffect } from "react";
import { Plus } from 'lucide-react';
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { employeeApi, type Employee} from "./hooks/employee";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    salary: '',
    hireDate: new Date().toISOString().split('T')[0],
  });

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch employees';
      setError(message);
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newEmployeeData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        position: formData.position,
        salary: parseFloat(formData.salary),
        hireDate: formData.hireDate,
      };

      const newEmployee = await employeeApi.create(newEmployeeData);
      setEmployees([...employees, newEmployee]);
      closeFormModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create employee';
      setError(message);
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    
    setIsSubmitting(true);
    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        position: formData.position,
        salary: parseFloat(formData.salary),
        hireDate: formData.hireDate,
      };

      const updated = await employeeApi.update(selectedEmployee.id, updatedData);
      setEmployees(employees.map(emp =>
        emp.id === selectedEmployee.id ? updated : emp
      ));
      closeFormModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update employee';
      setError(message);
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
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

  const confirmDelete = async () => {
    if (!selectedEmployee) return;
    
    setIsSubmitting(true);
    try {
      await employeeApi.delete(selectedEmployee.id);
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      setDeleteModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete employee';
      setError(message);
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
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
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            <strong>Error:</strong> {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-600 hover:text-red-800 font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light text-black uppercase">Manage Employees</h1>
          <button
            onClick={openCreateModal}
            disabled={loading}
            className="w-12 h-12 rounded-full bg-purple-400 text-white flex items-center justify-center hover:bg-purple-500 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400">Loading employees...</p>
          </div>
        ) : (
          <EmployeeTable 
            employees={employees} 
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        <EmployeeFormModal
          isOpen={formModalOpen}
          isEditMode={isEditMode}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={isEditMode ? handleUpdateEmployee : handleCreateEmployee}
          onClose={closeFormModal}
          isSubmitting={isSubmitting}
        />

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          employeeName={selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}