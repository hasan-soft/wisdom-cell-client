import React from "react";
import { FaEye, FaEyeSlash, FaFlag } from "react-icons/fa";

const ManageStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div className="stat bg-linear-to-br from-success/10 to-success/20 shadow rounded-lg p-4">
        <div className="stat-title text-sm font-bold">
          <FaEye size={30} className="text-success" />
          Public Lessons
        </div>
        <div className="stat-value text-2xl text-success">
          {stats?.public || 0}
        </div>
      </div>

      <div className="stat bg-linear-to-br from-primary/10 to-primary/20 shadow rounded-lg p-4">
        <div className="stat-title text-sm font-bold">
          <FaEyeSlash size={30} className="text-primary" />
          Private Lessons
        </div>
        <div className="stat-value text-2xl text-primary">
          {stats?.private || 0}
        </div>
      </div>

      <div className="stat bg-linear-to-br from-error/10 to-error/20 shadow rounded-lg p-4">
        <div className="stat-title text-sm font-bold">
          <FaFlag size={30} className="text-error" />
          Reported Lessons
        </div>
        <div className="stat-value text-2xl text-error">
          {stats?.reported || 0}
        </div>
      </div>
    </div>
  );
};

export default ManageStats;
