import PageHeader from "@/components/PageHeader";

export default function NotFound() {
 return ( 
    <>
        <PageHeader/>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 text-center -mt-12">
            <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-500 mb-8">Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.</p>
            <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Go Home</a>
        </div>
    </>
  );
};