import LessonContent from "../../components/Home/Details/LessonContent";
import LessonMetadata from "../../components/Home/Details/LessonMetadata";
import LessonAuthorCard from "../../components/Home/Details/LessonAuthorCard";
import LessonInteractions from "../../components/Home/Details/LessonInteractions";
import CommentsSection from "../../components/Home/Details/CommentsSection";
import SimilarLessonsSection from "../../components/Home/Details/SimilarLessonsSection";
import useRole from "../../hooks/useRole";
import { useNavigate, useParams } from "react-router";
import LessonStats from "../../components/Home/Details/LessonStats";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import NotFound from "../NotFound";

const LessonDetails = () => {
  const { userData } = useRole();
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: lesson = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/lesson-details/${id}`,
      );
      return result.data;
    },
  });

  if (!lesson) return <NotFound />;
  if (isLoading) return <LoadingSpinner />;

  const isLocked = lesson.accessLevel === "premium" && !userData?.isPremium;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Premium Check */}
      {isLocked && (
        <div className="bg-warning text-warning-content text-center p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">🔒 Premium Lesson</p>
          <p className="mb-2">Upgrade to unlock full lesson details.</p>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate("/pricing")}
          >
            Upgrade Now
          </button>
        </div>
      )}

      <LessonContent lesson={lesson} isLocked={isLocked} />
      {!isLocked && <LessonMetadata lesson={lesson} />}
      {!isLocked && <LessonAuthorCard lesson={lesson} />}
      {!isLocked && <LessonStats lesson={lesson} />}
      {!isLocked && <LessonInteractions lesson={lesson} refetch={refetch} />}
      {!isLocked && <CommentsSection lessonId={lesson._id} />}
      <SimilarLessonsSection lesson={lesson} />
    </div>
  );
};

export default LessonDetails;
