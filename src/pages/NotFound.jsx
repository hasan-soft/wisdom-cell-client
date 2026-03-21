import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
            <div className="bg-base-200 shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-base-content mb-4">
                    Lesson Not Found
                </h1>
                <p className="text-muted mb-6">
                    Sorry, we couldn't find the lesson you're looking for.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="btn btn-primary w-full"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/public-lessons"
                        className="btn btn-outline btn-primary w-full"
                    >
                        View Public Lessons
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;