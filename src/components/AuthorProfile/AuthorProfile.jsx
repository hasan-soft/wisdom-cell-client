import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaBook, FaCrown, FaArrowLeft } from "react-icons/fa";
import coverImg from "../../assets/coverImage.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../Home/Lessons/LessonCard";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AuthorProfile = () => {
  const { authorEmail } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: author = {}, isLoading } = useQuery({
    queryKey: ["author", authorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/author/${authorEmail}`);
      return res.data;
    },
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["authorLessons", authorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/author/${authorEmail}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost text-base-content mb-6 gap-2"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Author Profile Card */}
      <div className="card bg-base-200 shadow-xl overflow-hidden mb-10 rounded-2xl">
        <img src={coverImg} alt="Cover" className="w-full h-48 object-cover" />

        <div className="card-body px-6 pb-8 -mt-16 text-center">
          <div className="avatar mx-auto">
            <div className="w-32 rounded-full ring ring-base-100 ring-offset-4 ring-offset-base-200 shadow-xl">
              <img
                src={author.photoURL || "https://ui-avatars.com/api/?name=User"}
                alt={author.name || "Author"}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {author.name || "Unknown Author"}
          </h1>

          <p className="text-muted mt-1">{author.email}</p>

          {author.isPremium && (
            <div className="mt-3 inline-flex items-center gap-1.5 badge badge-warning badge-outline px-4 py-3 text-sm font-medium">
              <FaCrown className="text-lg" />
              Premium Creator
            </div>
          )}

          {/* Lessons Count */}
          <div className="stats shadow mt-8 w-full max-w-xs mx-auto">
            <div className="stat place-items-center">
              <div className="stat-value text-primary">{lessons.length}</div>
              <div className="stat-desc text-muted">Public Lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <h2 className="text-2xl font-bold mb-6">
        Lessons by {author.name || "this author"}
      </h2>

      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-200 text-center py-16">
          <FaBook className="text-5xl text-muted mx-auto mb-5 opacity-70" />
          <p className="text-lg text-muted">No public lessons yet</p>
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;
