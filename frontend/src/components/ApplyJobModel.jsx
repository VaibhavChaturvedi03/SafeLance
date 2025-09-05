import { useState } from "react";

export default function ApplyJobModal({ isOpen, onClose, portfolio  }) {
  const [selectedProjects, setSelectedProjects] = useState([]);

  const toggleProject = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Apply to Job</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Portfolio selection */}
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {portfolio.length === 0 ? (
            <p className="text-sm text-gray-500">
              You don’t have any portfolio items yet. Add some before applying.
            </p>
          ) : (
            portfolio.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedProjects.includes(item.id)}
                  onChange={() => toggleProject(item.id)}
                  className="mt-1"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </label>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Selected projects:", selectedProjects);
              // 👉 Hook this up to your submit logic
            }}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
