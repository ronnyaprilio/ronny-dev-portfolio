import LogoutButton from "./LogoutButton";

export default function AdminHeader({username} : { username: string }) {
    return (
        <header className="bg-primary text-white p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Portfolio Admin</h1>
            <div className="flex items-center gap-4">
                <span>Welcome, {username??"Admin"}</span>
                <LogoutButton />
            </div>
        </header>
    );
};