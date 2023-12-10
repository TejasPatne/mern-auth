import React from 'react';

export const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! Page not found.</p>
        <img
          src="https://source.unsplash.com/300x300/?cartoon" // Image from Unsplash
          alt="404 Illustration"
          className="mx-auto max-w-10 mb-4 rounded-full"
        />
        <p className="text-lg text-gray-700 mb-4">
          It seems like you got lost in cyberspace.
        </p>
        <p>
          <a
            href="/"
            className="text-blue-500 hover:underline transition duration-300"
          >
            Go back to the home page
          </a>
        </p>
      </div>
    </div>
  );
};
