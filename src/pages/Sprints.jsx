import {
  Plus,
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Trash2,
  Play,
  CheckCircle2,
  Clock3,
  CircleDot,
} from "lucide-react";
import { useState } from "react";





const initialSprints = [
  {
    id: "SPR-01",
    name: "Sprint 1",
    goal: "Complete the initial website redesign",
    status: "Completed",
    startDate: "Sep 01, 2026",
    endDate: "Sep 14, 2026",
    issues: 12,
    completed: 12,
  },
  {
    id: "SPR-02",
    name: "Sprint 2",
    goal: "Build the main dashboard experience",
    status: "Active",
    startDate: "Sep 15, 2026",
    endDate: "Sep 28, 2026",
    issues: 18,
    completed: 11,
  },
  {
    id: "SPR-03",
    name: "Sprint 3",
    goal: "Implement project and issue management",
    status: "Planning",
    startDate: "Sep 29, 2026",
    endDate: "Oct 12, 2026",
    issues: 0,
    completed: 0,
  },
];

const statusOptions = [
  "All",
  "Planning",
  "Active",
  "Completed",
];

function Sprints() {
  const [sprints, setSprints] = useState(initialSprints);

  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingSprint, setEditingSprint] = useState(null);

  const [deleteSprint, setDeleteSprint] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
    status: "Planning",
  });

  const filteredSprints =
    statusFilter === "All"
      ? sprints
      : sprints.filter(
          (sprint) => sprint.status === statusFilter
        );

  const openCreateModal = () => {
    setEditingSprint(null);

    setFormData({
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      status: "Planning",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (sprint) => {
    setEditingSprint(sprint);

    setFormData({
      name: sprint.name,
      goal: sprint.goal,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      status: sprint.status,
    });

    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingSprint) {
      setSprints((prev) =>
        prev.map((sprint) =>
          sprint.id === editingSprint.id
            ? {
                ...sprint,
                ...formData,
              }
            : sprint
        )
      );
    } else {
      const newSprint = {
        id: `SPR-${String(sprints.length + 1).padStart(
          2,
          "0"
        )}`,
        ...formData,
        issues: 0,
        completed: 0,
      };

      setSprints((prev) => [
        ...prev,
        newSprint,
      ]);
    }

    setIsModalOpen(false);
    setEditingSprint(null);
  };

  const handleDelete = () => {
    setSprints((prev) =>
      prev.filter(
        (sprint) => sprint.id !== deleteSprint.id
      )
    );

    setDeleteSprint(null);
  };

  const handleStartSprint = (sprintId) => {
    setSprints((prev) =>
      prev.map((sprint) =>
        sprint.id === sprintId
          ? {
              ...sprint,
              status: "Active",
            }
          : sprint
      )
    );
  };

  const handleCompleteSprint = (sprintId) => {
    setSprints((prev) =>
      prev.map((sprint) =>
        sprint.id === sprintId
          ? {
              ...sprint,
              status: "Completed",
            }
          : sprint
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Sprints
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Plan, manage and track your development sprints.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Sprint
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <CircleDot size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Sprints
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {sprints.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Play size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Active
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {
                  sprints.filter(
                    (sprint) =>
                      sprint.status === "Active"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Planning
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {
                  sprints.filter(
                    (sprint) =>
                      sprint.status === "Planning"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Completed
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {
                  sprints.filter(
                    (sprint) =>
                      sprint.status === "Completed"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex overflow-x-auto rounded-lg border border-slate-200 bg-white p-1">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition ${
              statusFilter === status
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sprint List */}
      <div className="mt-6 space-y-4">
        {filteredSprints.map((sprint) => {
          const progress =
            sprint.issues === 0
              ? 0
              : Math.round(
                  (sprint.completed / sprint.issues) * 100
                );

          return (
            <div
              key={sprint.id}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            >
              {/* Top */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <CircleDot size={20} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-slate-900">
                        {sprint.name}
                      </h3>

                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {sprint.id}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          sprint.status === "Active"
                            ? "bg-indigo-50 text-indigo-700"
                            : sprint.status ===
                                "Completed"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {sprint.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {sprint.goal}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {sprint.status === "Planning" && (
                    <button
                      onClick={() =>
                        handleStartSprint(sprint.id)
                      }
                      className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-100"
                    >
                      <Play size={14} />
                      Start Sprint
                    </button>
                  )}

                  {sprint.status === "Active" && (
                    <button
                      onClick={() =>
                        handleCompleteSprint(
                          sprint.id
                        )
                      }
                      className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-600 hover:bg-green-100"
                    >
                      <CheckCircle2 size={14} />
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() =>
                      openEditModal(sprint)
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      setDeleteSprint(sprint)
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />

                  <span>
                    {sprint.startDate} -{" "}
                    {sprint.endDate}
                  </span>
                </div>

                <div className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">
                    {sprint.completed}
                  </span>{" "}
                  / {sprint.issues} issues completed
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Progress
                  </span>

                  <span className="text-xs font-semibold text-slate-700">
                    {progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSprints.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <CircleDot
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-900">
            No sprints found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try another status filter or create a new
            sprint.
          </p>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingSprint
                  ? "Edit Sprint"
                  : "Create Sprint"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {editingSprint
                  ? "Update sprint information."
                  : "Create a new sprint for your project."}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Sprint Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Sprint 4"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Sprint Goal
                </label>

                <textarea
                  rows={3}
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goal: e.target.value,
                    })
                  }
                  placeholder="What should this sprint achieve?"
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                >
                  <option>Planning</option>
                  <option>Active</option>
                  <option>Completed</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {editingSprint
                    ? "Save Changes"
                    : "Create Sprint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteSprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delete Sprint?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteSprint.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteSprint(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Sprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sprints;