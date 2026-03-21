import React from "react";
import {
  FaCrown,
  FaCheck,
  FaTimes,
  FaBook,
  FaAd,
  FaRocket,
  FaLock,
  FaUsers,
  FaChartLine,
  FaInfinity,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const features = [
    {
      feature: "Create Lessons",
      free: "Up to 10 lessons",
      premium: "Unlimited lessons",
      freeIcon: <FaBook className="text-success" />,
      premiumIcon: <FaInfinity className="text-primary" />,
    },
    {
      feature: "Premium Lesson Creation",
      free: <FaTimes className="text-error" />,
      premium: <FaCheck className="text-success" />,
      freeIcon: <FaLock className="text-error" />,
      premiumIcon: <FaCrown className="text-primary" />,
    },
    {
      feature: "Access Premium Content",
      free: <FaTimes className="text-error" />,
      premium: <FaCheck className="text-success" />,
      freeIcon: <FaLock className="text-error" />,
      premiumIcon: <FaCrown className="text-primary" />,
    },
    {
      feature: "Ad-Free Experience",
      free: <FaTimes className="text-error" />,
      premium: <FaCheck className="text-success" />,
      freeIcon: <FaAd className="text-error" />,
      premiumIcon: <FaCheck className="text-success" />,
    },
    {
      feature: "Priority Listing",
      free: <FaTimes className="text-error" />,
      premium: <FaCheck className="text-success" />,
      freeIcon: <FaChartLine className="text-muted" />,
      premiumIcon: <FaRocket className="text-primary" />,
    },
    {
      feature: "Advanced Analytics",
      free: "Basic stats",
      premium: "Detailed insights",
      freeIcon: <FaChartLine className="text-muted" />,
      premiumIcon: <FaChartLine className="text-success" />,
    },
    {
      feature: "Community Access",
      free: "Read-only",
      premium: "Full participation",
      freeIcon: <FaUsers className="text-muted" />,
      premiumIcon: <FaUsers className="text-primary" />,
    },
    {
      feature: "Support",
      free: "Community help",
      premium: "Priority 24/7 support",
      freeIcon: <FaUsers className="text-muted" />,
      premiumIcon: <FaCheck className="text-success" />,
    },
  ];

  const handleUpgrade = async () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to upgrade to premium",
      });
      navigate("/login");
      return;
    }
    try {
      const paymentInfo = {
        price: 12.3,
        userName: user?.displayName,
        userEmail: user?.email,
        userImage: user?.photoURL,
      };
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      if (res.data.url) window.location.href = res.data.url;
    } catch (error) {
      console.error("Upgrade error:", error);
      Swal.fire({
        icon: "error",
        title: "Upgrade Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Upgrade to <span className="text-primary">Premium</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Unlock exclusive features and take your wisdom journey to the next
            level
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-base-200 rounded-2xl shadow-lg p-8 border-2 border-base-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-base-content mb-2">
                Free Plan
              </h3>
              <div className="text-4xl font-bold text-base-content mb-2">
                ৳0
              </div>
              <p className="text-muted">Forever free</p>
            </div>
            <ul className="space-y-4 mb-8">
              {features.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {item.freeIcon}
                  <span className="flex-1 text-base-content">
                    {item.feature}
                  </span>
                  <span className="text-muted font-medium">{item.free}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-linear-to-br from-primary/10 to-primary/30 rounded-2xl shadow-xl p-8 border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-content px-4 py-1 rounded-bl-lg font-semibold">
              Most Popular
            </div>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaCrown className="text-primary text-2xl" />
                <h3 className="text-2xl font-bold text-base-content">
                  Premium Plan
                </h3>
              </div>
              <div className="text-4xl font-bold text-base-content mb-2">
                ৳1500
              </div>
              <p className="text-muted">One-time payment • Lifetime access</p>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {item.premiumIcon}
                  <span className="flex-1 text-base-content font-medium">
                    {item.feature}
                  </span>
                  <span className="text-muted">{item.premium}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpgrade}
              className="btn btn-primary w-full text-lg font-semibold"
            >
              <FaCrown className="mr-2" />
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-linear-to-r from-primary to-secondary text-primary-content text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to unlock premium wisdom?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Join thousands of members who have transformed their learning
            experience with premium access.
          </p>
          <button
            onClick={handleUpgrade}
            className="btn btn-secondary text-lg font-semibold px-8"
          >
            <FaCrown className="mr-2" />
            Upgrade Now - ৳1500
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
