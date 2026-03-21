import useRole from "../../../hooks/useRole";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router";

const LessonCard = ({ lesson }) => {
  const { userData } = useRole();
  const isLocked = lesson.accessLevel === "premium" && !userData?.isPremium;

  return (
    <div className="relative group h-full">
      <div
        className={`relative card bg-base-100 shadow-md border border-base-300 rounded-2xl overflow-hidden transition hover:shadow-lg h-full flex flex-col ${isLocked ? "group-hover:blur-[2px]" : ""}`}
      >
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-80 transition z-20 backdrop-blur-sm rounded-2xl">
            <FiLock size={28} />
            <p className="font-semibold text-center text-sm px-4">
              Premium Lesson — Upgrade to view
            </p>
          </div>
        )}

        {/* Color strip */}
        <div
          className={`h-1.5 w-full shrink-0 ${lesson.accessLevel === "premium" ? "bg-linear-to-r from-warning to-secondary" : "bg-linear-to-r from-primary to-secondary"}`}
        />

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Author + Access badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={lesson.authorPhoto}
                alt={lesson.authorName}
                className="w-10 h-10 object-cover rounded-full border-2 border-base-300 shadow-sm shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-base-content leading-tight">
                  {lesson.authorName}
                </p>
                <p className="text-xs text-muted">
                  {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <span
              className={`badge badge-sm shrink-0 ${lesson.accessLevel === "premium" ? "badge-warning" : "badge-success"}`}
            >
              {lesson.accessLevel}
            </span>
          </div>

          {/* Title + Description */}
          <div className="flex-1">
            <h2 className="font-bold text-base text-base-content mb-1 line-clamp-2 leading-snug">
              {lesson.title}
            </h2>
            <p className="text-sm text-muted line-clamp-3 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary badge-outline badge-sm">
              {lesson.category}
            </span>
            <span className="badge badge-secondary badge-outline badge-sm">
              {lesson.emotionalTone}
            </span>
          </div>

          {/* CTA — always at bottom */}
          <Link
            to={`/lesson-details/${lesson._id}`}
            className="btn btn-primary btn-sm w-full"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
