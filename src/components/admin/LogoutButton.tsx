"use client";

import { logout } from "@/lib/admin/login/logoutAction";

export default function LogoutButton() {
  const handleLogout = async () => {
    logout();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Logout
    </button>
  );
};