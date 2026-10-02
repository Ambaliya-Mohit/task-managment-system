import {
  User,
  Palette,
  Bell,
  Building2,
  Shield,
  Save,
  RotateCcw,
  Mail,
  Lock,
} from "lucide-react";
import { useState } from "react";


const defaultSettings = {
  name: "User",
  email: "user@example.com",
  role: "Administrator",
  workspace: "ProjectHub",
  theme: "Light",
  emailNotifications: true,
  browserNotifications: false,
};

function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaved(false);
  };

  return (
    <div className="max-w-5xl">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account, workspace and application preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <User size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Profile</h3>
              <p className="text-sm text-slate-500">
                Manage your personal account information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateSetting("name", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting("email", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Role
              </label>

              <input
                type="text"
                value={settings.role}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"
              />
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Building2 size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Workspace</h3>
              <p className="text-sm text-slate-500">
                Configure your project workspace.
              </p>
            </div>
          </div>

          <div className="p-5">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Workspace Name
            </label>

            <input
              type="text"
              value={settings.workspace}
              onChange={(e) =>
                updateSetting("workspace", e.target.value)
              }
              className="w-full max-w-xl rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </section>

        {/* Appearance */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Palette size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Appearance</h3>
              <p className="text-sm text-slate-500">
                Customize how ProjectHub looks.
              </p>
            </div>
          </div>

          <div className="p-5">
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Theme
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Light", "Dark", "System"].map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => updateSetting("theme", theme)}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                    settings.theme === theme
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Bell size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Notifications
              </h3>
              <p className="text-sm text-slate-500">
                Choose how you want to receive notifications.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Email Notifications
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Receive updates about projects and assigned issues.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  updateSetting(
                    "emailNotifications",
                    !settings.emailNotifications
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  settings.emailNotifications
                    ? "bg-indigo-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    settings.emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Browser Notifications */}
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Browser Notifications
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Show notifications directly in your browser.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  updateSetting(
                    "browserNotifications",
                    !settings.browserNotifications
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  settings.browserNotifications
                    ? "bg-indigo-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    settings.browserNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Shield size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Security</h3>
              <p className="text-sm text-slate-500">
                Manage your account security.
              </p>
            </div>
          </div>

          <div className="p-5">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Lock size={17} />
              Change Password
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          {saved && (
            <p className="text-sm font-medium text-green-600">
              Settings saved successfully.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;