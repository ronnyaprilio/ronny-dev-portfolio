export default function LiveDemoButton({liveDemoLink }: { liveDemoLink?: string }) {
    const liveDemoSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
    );
    return ( 
        <>
            {liveDemoLink && (
                <a
                    href={liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center justify-center gap-2
                        rounded-lg border border-gray-800
                        px-4 py-2
                        text-sm font-medium text-gray-900
                        transition
                        hover:bg-gray-900 hover:text-white
                    "
                >
                    {liveDemoSvg} <span>Live Demo</span>
                </a>
            )}
            {!liveDemoLink && (
                <button
                    disabled
                    className="flex items-center gap-2 rounded-lg bg-transparent border border-gray-400 px-4 py-2 text-sm font-medium text-gray-400"
                >
                    {liveDemoSvg} <span>Live Demo</span>
                </button>
            )}
        </>
    );
}