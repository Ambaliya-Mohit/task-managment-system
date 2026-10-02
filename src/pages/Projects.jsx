import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  FolderKanban,
  Users,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";

const initialProjects = [
  {
    id: "1",
    name: "Website Redesign",
    key: "WEB",
    description: "Redesign the company website",
    status: "Active",
    members: 8,
    dueDate: "Oct 15, 2026",
    progress: 72,
  },
  {
    id: "2",
    name: "Mobile App",
    key: "APP",
    description: "Build the new mobile application",
    status: "Active",
    members: 12,
    dueDate: "Nov 02, 2026",
    progress: 48,
  },
  {
    id: "3",
    name: "Internal Tools",
    key: "TOOLS",
    description: "Improve internal productivity tools",
    status: "Planning",
    members: 5,
    dueDate: "Dec 10, 2026",
    progress: 20,
  },
  {
    id: "4",
    name: "Marketing Campaign",
    key: "MKT",
    description: "Q4 marketing campaign",
    status: "Completed",
    members: 6,
    dueDate: "Sep 30, 2026",
    progress: 100,
  },
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [deleteProject, setDeleteProject] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    key: "",
    description: "",
    status: "Planning",
    members: 1,
    dueDate: "",
  });

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.key.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingProject(null);

    setFormData({
      name: "",
      key: "",
      description: "",
      status: "Planning",
      members: 1,
      dueDate: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);

    setFormData({
      name: project.name,
      key: project.key,
      description: project.description,
      status: project.status,
      members: project.members,
      dueDate: project.dueDate,
    });

    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...formData,
              }
            : project
        )
      );
    } else {
      const newProject = {
        id: Date.now().toString(),
        ...formData,
        progress: 0,
      };

      setProjects((prev) => [...prev, newProject]);
    }

    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = () => {
    setProjects((prev) =>
      prev.filter((project) => project.id !== deleteProject.id)
    );

    setDeleteProject(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Projects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track your projects.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col  gap-3 sm:flex-row">
        <div className="relative max-w-md flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
          />
        </div>

       <div className="flex items-center rounded-lg border  border-slate-200 bg-white p-1">
  {["All", "Active", "Planning", "Completed"].map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`rounded-md px-3 py-2 text-sm font-medium transition ${
        statusFilter === status
          ? "bg-indigo-600 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {status}
    </button>
  ))}
</div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Total Projects</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Active</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {projects.filter((p) => p.status === "Active").length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {projects.filter((p) => p.status === "Completed").length}
          </p>
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <FolderKanban size={21} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      {/* <h3 className="font-semibold text-slate-900">
                        {project.name}
                      </h3> */}
                      <Link
                         to={`/projects/${project.id}`}
                        className="font-semibold text-slate-900 hover:text-indigo-600">
                      {project.name}
                            </Link>

                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {project.key}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              {/* Project Meta */}
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  {project.members} members
                </div>

                <div className="flex items-center gap-1.5">
                  <CalendarDays size={16} />
                  {project.dueDate}
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    project.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : project.status === "Completed"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">
                    Progress
                  </span>

                  <span className="font-semibold text-slate-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  onClick={() => setDeleteProject(project)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <FolderKanban
            size={40}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-900">
            No projects found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filter.
          </p>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingProject ? "Edit Project" : "Create Project"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {editingProject
                  ? "Update your project information."
                  : "Create a new project to start managing your work."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Website Redesign"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project Key
                </label>

                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      key: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="e.g. WEB"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm uppercase outline-none focus:border-indigo-400"
                />
              </div>

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
                  placeholder="Describe your project..."
                  required
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Members
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={formData.members}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        members: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

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

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delete Project?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteProject.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteProject(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;