import { getCurrentUser } from '@/lib/admin/login/getCurrentUser';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const AdminMainPage: React.FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const validSlug = process.env.ADMIN_LOGIN_SLUG;

  if (slug !== validSlug) {
    notFound();
  }
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/admin/${process.env.ADMIN_LOGIN_SLUG}/login`);
  }
  return ( <>
      <header className="bg-primary text-white p-4">
          <h1 className="text-2xl font-bold">Portfolio Admin</h1>
      </header>
      <div className="flex min-h-screen bg-secondary font-sans">
        <nav className="w-64 bg-white shadow-md">
          <ul className="p-4 space-y-2">
            <li>
              <button className="w-full text-left py-2 px-4 text-primary hover:bg-secondary rounded">
                Edit Profile
              </button>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 text-primary hover:bg-secondary rounded">
                Edit Projects
              </button>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-6">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Edit Profile
            </h2>

            <form className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    Greetings
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary">
                    About Me
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    Metadata Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    Metadata Description
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    Copyright
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    GitHub
                  </label>
                  <input
                    type="url"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Edit Projects
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="mb-4">
                <button className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                  Add New Project
                </button>
              </div>

              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-primary text-sm">
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">GitHub</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Project 1</td>
                    <td className="px-4 py-2">image1.jpg</td>
                    <td className="px-4 py-2">
                      Description of project 1
                    </td>
                    <td className="px-4 py-2">
                      https://github.com/project1
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="bg-accent text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminMainPage;