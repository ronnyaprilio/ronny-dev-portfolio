import { Inter } from 'next/font/google';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminNavigation from '@/components/admin/AdminNavigation';
import { requireAdminAuth } from '@/lib/admin/login/auth';

const inter = Inter({ subsets: ['latin'] });

export default async function AdminLayout({children, params,}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const authentication = await requireAdminAuth(slug);

  return (
    <>
      <AdminHeader username={authentication.user.id} />
      <div className="flex min-h-screen bg-secondary font-sans">
        <AdminNavigation slug={slug} />
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </>
  );
}