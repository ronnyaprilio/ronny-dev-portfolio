"use client"

import { destroySession } from '@/lib/admin/login/auth';

export default function LogoutButton() {
  const handleLogout = async () => {
    destroySession();
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