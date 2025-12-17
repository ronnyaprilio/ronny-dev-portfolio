import Link from "next/link";

const AdminNavigation: React.FC<{slug: string}> = ({slug}) => {
    return (
        <nav className="w-64 bg-white shadow-md">
          <ul className="p-4 space-y-2">
            <li>
              <Link href={`/admin/${slug}/edit-profile`} className="block w-full text-left py-2 px-4 text-primary hover:bg-secondary rounded">
                Edit Profile
              </Link>
            </li>
            <li>
              <Link href={`/admin/${slug}/edit-projects`} className="block w-full text-left py-2 px-4 text-primary hover:bg-secondary rounded">
                Edit Projects
              </Link>
            </li>
          </ul>
        </nav>
    );
};

export default AdminNavigation;