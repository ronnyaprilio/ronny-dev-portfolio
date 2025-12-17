import Link from 'next/link';

export default async function AdminDashboard({ params } : { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return ( <>
      <main className="flex-1 p-6 text-primary">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">
            Edit Profile
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Update personal information, bio, and metadata.
          </p>

          <Link
            href={`/admin/${slug}/edit-profile`}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Go to Edit Profile →
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">
            Manage Projects
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add, edit, or remove portfolio projects.
          </p>

          <a
            href={`/admin/${slug}/edit-projects`}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Go to Projects →
          </a>
        </div>
      </div>
    </main>
    </>
  );
};