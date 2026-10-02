import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  CalendarDays,
  CircleDot,
  AlertCircle,
  Users,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    label: "Total Projects",
    value: "5",
    change: "+2 this month",
    icon: FolderKanban,
  },
  {
    label: "Total Issues",
    value: "32",
    change: "+8 this week",
    icon: ListTodo,
  },
  {
    label: "Completed",
    value: "18",
    change: "56% completion",
    icon: CheckCircle2,
  },
  {
    label: "In Progress",
    value: "9",
    change: "28% of issues",
    icon: Clock3,
  },
];

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    key: "WEB",
    progress: 68,
    issues: 24,
    completed: 16,
  },
  {
    id: "2",
    name: "Mobile App",
    key: "APP",
    progress: 42,
    issues: 18,
    completed: 8,
  },
  {
    id: "3",
    name: "Internal Tools",
    key: "TOOLS",
    progress: 25,
    issues: 12,
    completed: 3,
  },
];

const recentIssues = [
  {
    id: "WEB-124",
    title: "Update landing page hero section",
    status: "In Progress",
    priority: "High",
    project: "WEB",
  },
  {
    id: "APP-87",
    title: "Fix login validation",
    status: "Review",
    priority: "Medium",
    project: "APP",
  },
  {
    id: "WEB-119",
    title: "Improve mobile navigation",
    status: "Todo",
    priority: "Low",
    project: "WEB",
  },
  {
    id: "TOOLS-31",
    title: "Add export functionality",
    status: "Done",
    priority: "Medium",
    project: "TOOLS",
  },
];

const upcomingTasks = [
  {
    title: "Complete authentication flow",
    project: "APP",
    date: "Oct 02, 2026",
  },
  {
    title: "Review website redesign",
    project: "WEB",
    date: "Oct 05, 2026",
  },
  {
    title: "Dashboard implementation",
    project: "TOOLS",
    date: "Oct 08, 2026",
  },
];

const activities = [
  {
    text: "Alex moved WEB-124 to In Progress",
    time: "12 minutes ago",
  },
  {
    text: "Sarah completed APP-81",
    time: "1 hour ago",
  },
  {
    text: "New project Mobile App was created",
    time: "3 hours ago",
  },
  {
    text: "John updated the Website Redesign project",
    time: "Yesterday",
  },
];

function getStatusClasses(status) {
  const styles = {
    "In Progress": "bg-blue-50 text-blue-700",
    Review: "bg-purple-50 text-purple-700",
    Todo: "bg-slate-100 text-slate-600",
    Done: "bg-green-50 text-green-700",
  };

  return styles[status] || "bg-slate-100 text-slate-600";
}

function getPriorityClasses(priority) {
  const styles = {
    High: "text-red-600",
    Medium: "text-amber-600",
    Low: "text-slate-500",
  };

  return styles[priority] || "text-slate-500";
}

function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening across your projects.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          <CalendarDays size={17} />
          This Month
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Icon size={20} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-300"
                />
              </div>

              <p className="mt-4 text-sm text-slate-500">
                {stat.label}
              </p>

              <div className="mt-1 flex items-end gap-3">
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <span className="mb-1 text-xs font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Projects */}
        <section className="rounded-xl border border-slate-200 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h3 className="font-semibold text-slate-900">
                Project Progress
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Overview of your active projects
              </p>
            </div>

            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-5 transition hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                      {project.key.slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-slate-900">
                        {project.name}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        {project.completed} of {project.issues} issues
                        completed
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-sm font-semibold text-slate-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Status */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Issue Overview
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current issue distribution
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-[18px] border-indigo-100">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">
                    32
                  </p>
                  <p className="text-xs text-slate-500">
                    Total Issues
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span className="text-sm text-slate-600">
                    Completed
                  </span>
                </div>

                <span className="text-sm font-semibold text-slate-900">
                  18
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="text-sm text-slate-600">
                    In Progress
                  </span>
                </div>

                <span className="text-sm font-semibold text-slate-900">
                  9
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="text-sm text-slate-600">
                    Todo
                  </span>
                </div>

                <span className="text-sm font-semibold text-slate-900">
                  5
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Issues */}
        <section className="rounded-xl border border-slate-200 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h3 className="font-semibold text-slate-900">
                Recent Issues
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Latest activity across your projects
              </p>
            </div>

            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Issue
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Project
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Priority
                  </th>

                  <th className="px-5 py-3" />
                </tr>
              </thead>

              <tbody>
                {recentIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-medium text-indigo-600">
                          {issue.id}
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {issue.title}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {issue.project}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          issue.status
                        )}`}
                      >
                        {issue.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-medium ${getPriorityClasses(
                          issue.priority
                        )}`}
                      >
                        {issue.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upcoming */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Upcoming
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Important upcoming deadlines
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingTasks.map((task) => (
              <div key={task.title} className="p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-amber-500">
                    <CalendarDays size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {task.project} · {task.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Activity */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest changes made by your team
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                {index === 0 && <CircleDot size={17} />}
                {index === 1 && <CheckCircle2 size={17} />}
                {index === 2 && <FolderKanban size={17} />}
                {index === 3 && <Users size={17} />}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-700">
                  {activity.text}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Small warning/info */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertCircle
          size={18}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <div>
          <p className="text-sm font-medium text-amber-900">
            Dashboard data is currently using sample data.
          </p>

          <p className="mt-1 text-xs text-amber-700">
            Once we connect the backend, these statistics and
            activities will come from your actual project data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;