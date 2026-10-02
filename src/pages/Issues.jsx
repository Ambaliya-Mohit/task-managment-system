  import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    CircleDot,
    CheckCircle2,
    Clock3,
    Eye,
  } from "lucide-react";
  import { useState } from "react";

  const initialIssues = [
    {
      id: "WEB-101",
      title: "Design homepage",
      description: "Create the new homepage design.",
      status: "Done",
      priority: "High",
      assignee: "Arjun",
      dueDate: "Oct 05, 2026",
      storyPoints: 5,
      project: "WEB",
    },
    {
      id: "WEB-102",
      title: "Implement navigation",
      description: "Build responsive navigation component.",
      status: "In Progress",
      priority: "Medium",
      assignee: "Rahul",
      dueDate: "Oct 08, 2026",
      storyPoints: 3,
      project: "WEB",
    },
    {
      id: "WEB-103",
      title: "Create responsive layout",
      description: "Make homepage responsive for all devices.",
      status: "Review",
      priority: "High",
      assignee: "Vikas",
      dueDate: "Oct 10, 2026",
      storyPoints: 5,
      project: "WEB",
    },
    {
      id: "APP-201",
      title: "Login screen",
      description: "Create mobile login screen.",
      status: "Todo",
      priority: "Low",
      assignee: "Priya",
      dueDate: "Oct 15, 2026",
      storyPoints: 2,
      project: "APP",
    },
    {
      id: "APP-202",
      title: "API integration",
      description: "Connect mobile app with API.",
      status: "In Progress",
      priority: "High",
      assignee: "Arjun",
      dueDate: "Oct 18, 2026",
      storyPoints: 8,
      project: "APP",
    },
  ];

  const statusOptions = [
    "All",
    "Todo",
    "In Progress",
    "Review",
    "Done",
  ];

  const priorityOptions = [
    "All",
    "High",
    "Medium",
    "Low",
  ];

  function Issues() {
    const [issues, setIssues] = useState(initialIssues);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingIssue, setEditingIssue] = useState(null);

    const [deleteIssue, setDeleteIssue] = useState(null);

    const [formData, setFormData] = useState({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      assignee: "Unassigned",
      dueDate: "",
      storyPoints: 1,
      project: "WEB",
    });

    const filteredIssues = issues.filter((issue) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        issue.id.toLowerCase().includes(searchText) ||
        issue.title.toLowerCase().includes(searchText) ||
        issue.assignee.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        issue.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        issue.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });

    const openCreateModal = () => {
      setEditingIssue(null);

      setFormData({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        assignee: "Unassigned",
        dueDate: "",
        storyPoints: 1,
        project: "WEB",
      });

      setIsModalOpen(true);
    };

    const openEditModal = (issue) => {
      setEditingIssue(issue);

      setFormData({
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        assignee: issue.assignee,
        dueDate: issue.dueDate,
        storyPoints: issue.storyPoints,
        project: issue.project,
      });

      setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (editingIssue) {
        setIssues((prev) =>
          prev.map((issue) =>
            issue.id === editingIssue.id
              ? {
                  ...issue,
                  ...formData,
                }
              : issue
          )
        );
      } else {
        const newIssue = {
          id: `NEW-${Date.now()}`,
          ...formData,
        };

        setIssues((prev) => [
          newIssue,
          ...prev,
        ]);
      }

      setIsModalOpen(false);
      setEditingIssue(null);
    };

    const handleDelete = () => {
      setIssues((prev) =>
        prev.filter(
          (issue) => issue.id !== deleteIssue.id
        )
      );

      setDeleteIssue(null);
    };

    return (
      <div>
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Issues
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage work across your projects.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Issue
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <CircleDot size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Total Issues
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {issues.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock3 size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  In Progress
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {
                    issues.filter(
                      (issue) =>
                        issue.status === "In Progress"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Eye size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  In Review
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {
                    issues.filter(
                      (issue) => issue.status === "Review"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Completed
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {
                    issues.filter(
                      (issue) => issue.status === "Done"
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
              placeholder="Search by issue ID, title or assignee..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          {/* Status Pills */}
          <div className="flex overflow-x-auto rounded-lg border border-slate-200 bg-white p-1">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
                  statusFilter === status
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority === "All"
                  ? "All Priorities"
                  : priority}
              </option>
            ))}
          </select>
        </div>

        {/* Issues Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Issue
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Priority
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Assignee
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Due Date
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Points
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-indigo-600">
                          {issue.id}
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {issue.title}
                        </p>

                        <p className="mt-1 max-w-sm truncate text-xs text-slate-500">
                          {issue.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          issue.status === "Done"
                            ? "bg-green-50 text-green-700"
                            : issue.status === "In Progress"
                              ? "bg-indigo-50 text-indigo-700"
                              : issue.status === "Review"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-medium ${
                          issue.priority === "High"
                            ? "text-red-600"
                            : issue.priority === "Medium"
                              ? "text-amber-600"
                              : "text-slate-500"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                          {issue.assignee === "Unassigned"
                            ? "?"
                            : issue.assignee.charAt(0)}
                        </div>

                        <span className="text-sm text-slate-700">
                          {issue.assignee}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {issue.dueDate}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                        {issue.storyPoints}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() =>
                            openEditModal(issue)
                          }
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            setDeleteIssue(issue)
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredIssues.length === 0 && (
            <div className="px-6 py-16 text-center">
              <CircleDot
                size={40}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                No issues found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Create / Edit Issue Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingIssue
                    ? "Edit Issue"
                    : "Create Issue"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {editingIssue
                    ? "Update issue information."
                    : "Create a new issue for your project."}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Issue Title
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Design homepage"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
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
                    placeholder="Describe the issue..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </div>

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
                      <option>Todo</option>
                      <option>In Progress</option>
                      <option>Review</option>
                      <option>Done</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Priority
                    </label>

                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Assignee
                    </label>

                    <select
                      value={formData.assignee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignee: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                    >
                      <option>Unassigned</option>
                      <option>Arjun</option>
                      <option>Rahul</option>
                      <option>Vikas</option>
                      <option>Priya</option>
                    </select>
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

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Story Points
                    </label>

                    <input
                      type="number"
                      min="1"
                      max="21"
                      value={formData.storyPoints}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          storyPoints: Number(
                            e.target.value
                          ),
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

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
                    {editingIssue
                      ? "Save Changes"
                      : "Create Issue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteIssue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={20} />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Delete Issue?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700">
                  {deleteIssue.title}
                </span>
                ?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteIssue(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete Issue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Issues;