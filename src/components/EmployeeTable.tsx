import { Edit2, Trash2 } from 'lucide-react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  hireDate: string;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

// EmployeeTable Component
export default function EmployeeTable({ employees, onEdit, onDelete }: {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">No employees yet</p>
      </div>
    );
  }

  return (
    <div className="border-t border-b border-gray-300">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-white">
        <div className="col-span-1 text-xs font-light text-gray-600">ID</div>
        <div className="col-span-2 text-xs font-light text-gray-600">First Name</div>
        <div className="col-span-2 text-xs font-light text-gray-600">Last Name</div>
        <div className="col-span-2 text-xs font-light text-gray-600">Position</div>
        <div className="col-span-2 text-xs font-light text-gray-600">Salary</div>
        <div className="col-span-2 text-xs font-light text-gray-600">Hired Date</div>
      </div>

      {employees.map((emp, index) => (
        <div key={emp.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition">
          <div className="col-span-1 text-sm text-gray-800">{index + 1}</div>
          <div className="col-span-2 text-sm text-gray-800">{emp.firstName}</div>
          <div className="col-span-2 text-sm text-gray-800">{emp.lastName}</div>
          <div className="col-span-2 text-sm text-gray-800">{emp.position}</div>
          <div className="col-span-2 text-sm text-gray-800">₱{emp.salary.toLocaleString()}</div>
          <div className="col-span-2 text-sm text-gray-800">{formatDate(emp.hireDate)}</div>
          
          <div className="col-span-1 flex gap-3 justify-end">
            <button
              onClick={() => onEdit(emp)}
              className="p-1 hover:bg-gray-300 rounded transition"
              title="Edit"
            >
              <Edit2 size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(emp)}
              className="p-1 hover:bg-gray-300 rounded transition"
              title="Delete"
            >
              <Trash2 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}