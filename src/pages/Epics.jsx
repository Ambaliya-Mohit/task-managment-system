import {
  Plus,
  Search,
  Pencil,
  Trash2,
  MoreHorizontal,
  Milestone,
  CheckCircle2,
  Clock3,
  CircleDot,
} from "lucide-react";
import { useState } from "react";

const initialEpics = [
  {
    id: "EPIC-01",
    name: "Website Redesign",
    description:
      "Modernize the company website and improve the overall user experience.",
    status: "In Progress",
    project: "WEB",
    issues: 12,
    completed: 7,
    dueDate: "Oct 20, 2026",
  },
  {
    id: "EPIC-02",
    name: "Authentication",
    description:
      "Implement login, registration and account management.",
    status: "Planning",
    project: "APP",
    issues: 8,
    completed: 0,
    dueDate: "Nov 05, 2026",
  },
  {
    id: "EPIC-03",
    name: "Dashboard",
    description:
      "Build the main project management dashboard.",
    status: "Completed",
    project: "WEB",
    issues: 10,
    completed: 10,
    dueDate: "Sep 25, 2026",
  },
];

const statusOptions = [
  "All",
  "Planning",
  "In Progress",
  "Completed",
];

function Epics() {
  const [epics, setEpics] = useState(initialEpics);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingEpic, setEditingEpic] = useState(null);

  const [deleteEpic, setDeleteEpic] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    project: "WEB",
    status: "Planning",
    dueDate: "",
  });

  const filteredEpics = epics.filter((epic) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      epic.name.toLowerCase().includes(searchText) ||
      epic.description.toLowerCase().includes(searchText) ||
      epic.id.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      epic.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingEpic(null);

    setFormData({
      name: "",
      description: "",
      project: "WEB",
      status: "Planning",
      dueDate: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (epic) => {
    setEditingEpic(epic);

    setFormData({
      name: epic.name,
      description: epic.description,
      project: epic.project,
      status: epic.status,
      dueDate: epic.dueDate,
    });

    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEpic) {
      setEpics((prev) =>
        prev.map((epic) =>
          epic.id === editingEpic.id
            ? {
                ...epic,
                ...formData,
              }
            : epic
        )
      );
    } else {
      const newEpic = {
        id: `EPIC-${String(epics.length + 1).padStart(
          2,
          "0"
        )}`,
        ...formData,
        issues: 0,
        completed: 0,
      };

      setEpics((prev) => [newEpic, ...prev]);
    }

    setIsModalOpen(false);
    setEditingEpic(null);
  };

  const handleDelete = () => {
    setEpics((prev) =>
      prev.filter(
        (epic) => epic.id !== deleteEpic.id
      )
    );

    setDeleteEpic(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Epics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Organize large pieces of work into manageable issues.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Epic
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Milestone size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Epics
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {epics.length}
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
                  epics.filter(
                    (epic) =>
                      epic.status === "Planning"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <CircleDot size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                In Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {
                  epics.filter(
                    (epic) =>
                      epic.status === "In Progress"
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
                  epics.filter(
                    (epic) =>
                      epic.status === "Completed"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search epics..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        <div className="flex overflow-x-auto rounded-lg border border-slate-200 bg-white p-1">
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
      </div>

      {/* Epic List */}
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {filteredEpics.map((epic) => {
          const progress =
            epic.issues === 0
              ? 0
              : Math.round(
                  (epic.completed / epic.issues) * 100
                );

          return (
            <div
              key={epic.id}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Milestone size={20} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {epic.name}
                      </h3>

                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {epic.id}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-5 text-slate-500">
                      {epic.description}
                    </p>
                  </div>
                </div>

                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Status + Project */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    epic.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : epic.status === "In Progress"
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {epic.status}
                </span>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  Project: {epic.project}
                </span>
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

              {/* Meta */}
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-xs text-slate-500">
                    Issues
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {epic.completed} / {epic.issues}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {epic.dueDate}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => openEditModal(epic)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  onClick={() => setDeleteEpic(epic)}
                  className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEpics.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <Milestone
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-900">
            No epics found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try another search or status filter.
          </p>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingEpic
                  ? "Edit Epic"
                  : "Create Epic"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {editingEpic
                  ? "Update epic information."
                  : "Create a new epic for your project."}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Epic Name
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
                  placeholder="e.g. User Authentication"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this epic..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>

              {/* Project + Status */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Project
                  </label>

                  <select
                    value={formData.project}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        project: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                  >
                    <option value="WEB">
                      Website Redesign
                    </option>

                    <option value="APP">
                      Mobile App
                    </option>

                    <option value="TOOLS">
                      Internal Tools
                    </option>
                  </select>
                </div>

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
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Due Date
                </label>

                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dueDate: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
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
                  {editingEpic
                    ? "Save Changes"
                    : "Create Epic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteEpic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delete Epic?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteEpic.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteEpic(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Epic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Epics;