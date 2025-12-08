export default function DeleteConfirmationModal({
  isOpen,
  employeeName,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onCancel}>
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-2">Delete Employee?</h2>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete <strong>{employeeName}</strong>? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition"
            >
              Delete
            </button>
            <button
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
