import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaStar,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ManageStats from "./ManageStats";
import ManageFilter from "./ManageFilter";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPrivacy, setFilterPrivacy] = useState("all");
  const [showReportedOnly, setShowReportedOnly] = useState(false);

  const {
    data: lessonsData,
    refetch: refetchLessons,
    isLoading,
  } = useQuery({
    queryKey: ["adminLessons", filterCategory],
    queryFn: async () => {
      const result = await axiosSecure.get("/lessons", {
        params: {
          category: filterCategory !== "all" ? filterCategory : "",
          admin: "true",
          reportedOnly: showReportedOnly ? "true" : "false",
        },
      });
      return result.data;
    },
  });

  const lessons = lessonsData?.result || [];
  const stats = lessonsData?.stats || {};

  const { data: reports = [], refetch: refetchReports } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  const filteredLessons = lessons.filter((lesson) => {
    if (filterPrivacy !== "all" && lesson.privacy !== filterPrivacy)
      return false;
    if (showReportedOnly) {
      const found = reports.find((r) => r.lessonId === lesson._id);
      if (!found) return false;
    }
    return true;
  });

  const handleDeleteLesson = (lessonId, lessonTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${lessonTitle}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/my-lesson/${lessonId}`);
          refetchLessons();
          refetchReports();
          Swal.fire("Deleted!", "Lesson has been removed.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete lesson", "error");
        }
      }
    });
  };

  const handleToggleFeatured = async (lessonId, currentStatus) => {
    try {
      await axiosSecure.patch(`/lesson/${lessonId}/feature`, {
        isFeatured: !currentStatus,
      });
      refetchLessons();
      Swal.fire({
        icon: "success",
        title: currentStatus ? "Unfeatured!" : "Featured!",
        text: currentStatus
          ? "Lesson removed from featured section"
          : "Lesson added to featured section",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to update featured status", "error");
    }
  };

  const handleMarkReviewed = async (lessonId) => {
    try {
      await axiosSecure.patch(`/lesson/${lessonId}/reviewed`);
      refetchLessons();
      Swal.fire("Reviewed!", "Lesson marked as reviewed", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to mark as reviewed", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">
          Manage Lessons
        </h1>
        <p className="text-muted">
          Review, feature, or remove lessons created by users
        </p>
      </div>

      <ManageStats stats={stats} />
      <ManageFilter
        setShowReportedOnly={setShowReportedOnly}
        setFilterPrivacy={setFilterPrivacy}
        setFilterCategory={setFilterCategory}
        showReportedOnly={showReportedOnly}
        filterPrivacy={filterPrivacy}
        filterCategory={filterCategory}
      />

      <div className="bg-base-200 shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Privacy</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.length > 0 ? (
                filteredLessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-base-300">
                    <td>
                      <div className="font-medium max-w-xs truncate">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-muted">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full">
                            <img
                              src={lesson.authorPhoto}
                              alt={lesson.authorName}
                            />
                          </div>
                        </div>
                        <span className="text-sm">{lesson.authorName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge">{lesson.category}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${lesson.privacy === "public" ? "badge-success" : "badge-info"}`}
                      >
                        {lesson.privacy === "public" ? (
                          <FaEye className="mr-1" />
                        ) : (
                          <FaEyeSlash className="mr-1" />
                        )}
                        {lesson.privacy}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${lesson.isFeatured ? "badge-warning" : "badge-outline"}`}
                      >
                        {lesson.isFeatured ? "Featured" : "Regular"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleToggleFeatured(lesson._id, lesson.isFeatured)
                          }
                          className={`btn btn-xs ${lesson.isFeatured ? "btn-warning" : "btn-outline"}`}
                          title={
                            lesson.isFeatured
                              ? "Remove from featured"
                              : "Feature this lesson"
                          }
                        >
                          <FaStar
                            className={lesson.isFeatured ? "fill-white" : ""}
                          />
                        </button>

                        <button
                          onClick={() => handleMarkReviewed(lesson._id)}
                          className={`btn btn-xs ${lesson.isReviewed ? "bg-base-300 text-muted" : "btn-success"}`}
                          title={
                            lesson.isReviewed
                              ? "Already reviewed"
                              : "Mark as reviewed"
                          }
                          disabled={lesson.isReviewed}
                        >
                          <FaCheckCircle
                            className={lesson.isReviewed ? "text-muted" : ""}
                          />
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteLesson(lesson._id, lesson.title)
                          }
                          className="btn btn-xs btn-error"
                          title="Delete lesson"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-muted">
                    No lessons found{" "}
                    {lessons.length === 0
                      ? "in the system"
                      : "with current filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLessons;
