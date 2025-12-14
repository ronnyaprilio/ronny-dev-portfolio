import React from 'react';
import { notFound } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';

const AdminLoginPage: React.FC<AdminPageProps> = async ({ params }) => {
  const { slug } = await params;
  const validSlug = process.env.ADMIN_LOGIN_SLUG;

  if (slug !== validSlug) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary font-sans">
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-2xl rotate-3 translate-x-3 translate-y-3" />
        <div className="relative bg-white rounded-2xl shadow-xl w-72 p-6">
          <h1 className="text-xl font-semibold text-primary text-center mb-6">
            Login
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;