import React from "react";
import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100">
      <div className="bg-base-200 p-10 rounded-lg shadow-lg text-center max-w-md">
        <FaTimesCircle className="w-16 h-16 text-error mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-base-content mb-2">
          Payment Cancelled
        </h1>
        <p className="text-muted mb-6">
          Your payment was not completed. No charges have been made to your
          account.
        </p>

        <div className="space-y-3">
          <Link to="/payment" className="btn btn-primary w-full">
            Try Payment Again
          </Link>
          <Link to="/public-lessons" className="btn btn-secondary w-full">
            Browse Free Lessons
          </Link>
          <Link to="/" className="btn btn-outline w-full">
            Return to Home
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-base-300">
          <p className="text-sm text-muted">
            Need help?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
