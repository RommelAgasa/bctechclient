export default function EmployeeFormModal({
  isOpen = true,
  isEditMode = false,
  isSubmitting = false,
  formData = { firstName: '', lastName: '', position: '', salary: '', hireDate: '' },
  onInputChange = () => {},
  onSubmit = (e) => e.preventDefault(),
  onClose = () => {},
}: {
  isOpen: boolean;
  isEditMode: boolean;
  isSubmitting?: boolean;
  formData: { firstName: string; lastName: string; position: string; salary: string; hireDate: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl border-2 border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-6">
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h2>

          <form onSubmit={onSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-light text-gray-600 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={onInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={onInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="75000"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-gray-600 mb-2">Hire Date</label>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={onInputChange}
                  required
                  disabled={isSubmitting || isEditMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}