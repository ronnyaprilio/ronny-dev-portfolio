const EditProfile: React.FC<AdminPageProps> = () => {
    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">
                Edit Profile
            </h2>

            <form className="bg-white p-6 rounded-xl shadow-md text-primary">
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
    );
};

export default EditProfile;