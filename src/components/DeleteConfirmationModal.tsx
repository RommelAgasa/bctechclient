export default function DeleteConfirmationModal({
  isOpen,
  employeeName,
  isSubmitting = false,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  employeeName: string;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onCancel}>
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl border-2 border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-2">Delete Employee?</h2>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete <strong>{employeeName}</strong>? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}