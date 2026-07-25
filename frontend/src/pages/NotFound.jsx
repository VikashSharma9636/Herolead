import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-9xl font-bold text-slate-200">404</h1>
      <h2 className="text-3xl font-semibold text-secondary mt-4 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
};
