import { useState } from "react";

export default function ProjectMilestoneModal({ project, onClose, onUpdate }) {
  const [currentProject, setCurrentProject] = useState(project);

  const handleMilestoneAction = (tier, action) => {
    if (action === "accept") {
      // Update local state
      const updated = {
        ...currentProject,
        progress: tier,
        spent: (currentProject.budget * tier) / 100,
      };
      setCurrentProject(updated);

      // Send update back to parent (dashboard)
      onUpdate(updated);

      // TODO: trigger your smart contract call here
      console.log(`✅ Milestone ${tier}% accepted, funds released`);
    } else {
      console.log(`❌ Milestone ${tier}% rejected, needs revision`);
      alert("Freelancer needs to revise this milestone.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative">
        {/* Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-emerald-700 mb-4">
          {currentProject.title}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {currentProject.description}
        </p>

        {/* Milestones */}
        <div className="space-y-4">
          {[25, 50, 75, 100].map((tier) => {
            const isUnlocked = currentProject.progress + 25 >= tier; 
            const isCompleted = currentProject.progress >= tier;

            return (
              <div
                key={tier}
                className={`p-4 rounded-lg flex justify-between items-center ${
                  isCompleted
                    ? "bg-emerald-100 text-emerald-700"
                    : isUnlocked
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="font-medium">{tier}% Milestone</span>

                {/* Status / Actions */}
                {isCompleted ? (
                  <span>✔ Completed</span>
                ) : isUnlocked ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMilestoneAction(tier, "accept")}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleMilestoneAction(tier, "reject")}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span>🔒 Locked</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Amount Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Budget: ${currentProject.budget}</span>
            <span>Spent: ${currentProject.spent}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-emerald-600 h-3 rounded-full"
              style={{ width: `${currentProject.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
