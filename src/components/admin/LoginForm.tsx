'use client';

import { login } from '@/lib/admin/login/action';
import React from 'react';
import { useActionState } from 'react';

const LoginForm: React.FC = () => {
  const [state, action] = useActionState(login, null);

  return (
    <form action={action} className="space-y-5">
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="w-full bg-transparent border-2 border-gray-300 py-2 pl-4 rounded-2xl text-primary placeholder-gray-400 focus:outline-none focus:border-accent"/>

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full bg-transparent border-2 border-gray-300 py-2 pl-4 rounded-2xl text-primary placeholder-gray-400 focus:outline-none focus:border-accent"/>

      {state?.error && (
        <p className="text-sm text-red-500 text-center">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        className="mt-4 bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mx-auto block"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;