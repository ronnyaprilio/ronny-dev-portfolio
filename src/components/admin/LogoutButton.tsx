"use client"

import { destroySession } from '@/lib/admin/login/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const LogoutButton: React.FC = () => {
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

export default LogoutButton;