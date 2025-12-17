'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <p className="text-xl mb-6">Oops! Something went wrong. {error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-accent text-white rounded hover:bg-accent/80 transition"
      >
        Try Again
      </button>
    </div>
  );
}
