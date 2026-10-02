import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const project = {
  id: "1",
  name: "Website Redesign",
  key: "WEB",
  description:
    "Redesign the company website with a modern, responsive interface and improved user experience.",
  status: "Active",
  members: 8,
  dueDate: "Oct 15, 2026",
  progress: 72,
  createdAt: "Sep 01, 2026",
};

const issues = [
  {
    id: "WEB-101",
    title: "Design homepage",
    status: "Done",
    priority: "High",
  },
  {
    id: "WEB-102",
    title: "Implement navigation",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "WEB-103",
    title: "Create responsive layout",
    status: "Review",
    priority: "High",
  },
  {
    id: "WEB-104",
    title: "Add contact form",
    status: "Todo",
    priority: "Low",
  },
];

function ProjectDetails() {
  const { projectId } = useParams();

  console.log("Project ID:", projectId);

  return (
    <div>
      {/* Back */}
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FolderKanban size={26} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  {project.name}
                </h1>

                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {project.key}
                </span>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  {project.status}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {project.description}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-slate-500 hover:bg-slate-50">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Project Meta */}
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Users size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Members</p>
              <p className="text-sm font-semibold text-slate-900">
                {project.members} members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Due Date</p>
              <p className="text-sm font-semibold text-slate-900">
                {project.dueDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Clock3 size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Created</p>
              <p className="text-sm font-semibold text-slate-900">
                {project.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress + Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Project Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Overall completion of this project.
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              {project.progress}%
            </span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>Started</span>
            <span>72% completed</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">
            Issue Summary
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Issues</span>
              <span className="font-semibold text-slate-900">
                24
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Completed</span>
              <span className="font-semibold text-green-600">
                12
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                In Progress
              </span>
              <span className="font-semibold text-indigo-600">
                8
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Remaining
              </span>
              <span className="font-semibold text-slate-900">
                4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Issues
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest issues in this project.
            </p>
          </div>

          <Link
            to="/issues"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <CheckCircle2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {issue.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {issue.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
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

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    issue.priority === "High"
                      ? "bg-red-50 text-red-600"
                      : issue.priority === "Medium"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {issue.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Project Team
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Members working on this project.
            </p>
          </div>

          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Manage Team
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {["V", "A", "R", "S", "K"].map((letter, index) => (
            <div
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600"
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;