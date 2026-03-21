import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <div className="bg-base-200 p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-success mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-base-content mb-2">
          Payment Successful!
        </h1>
        <p className="text-muted mb-6">
          You are now upgraded to a premium user. Check out all the lessons.
        </p>
        <Link to="/public-lessons" className="btn btn-secondary">
          Go to Public Lesson
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
