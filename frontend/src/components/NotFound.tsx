import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function NotFound(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
