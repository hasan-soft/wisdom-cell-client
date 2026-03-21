const LessonMetadata = ({ lesson }) => (
  <div className="p-5 bg-base-200 rounded-lg shadow-sm text-sm text-muted">
    <p>
      <strong className="text-base-content">Created:</strong>{" "}
      {lesson.createdAt
        ? new Date(lesson.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "N/A"}
    </p>
    <p>
      <strong className="text-base-content">Last Updated:</strong>{" "}
      {lesson.last_update_at
        ? new Date(lesson.last_update_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Not updated yet"}
    </p>
    <p>
      <strong className="text-base-content">Visibility:</strong>{" "}
      <span
        className={`font-medium ${lesson.privacy === "public" ? "text-success" : "text-warning"}`}
      >
        {lesson.privacy}
      </span>
    </p>
  </div>
);

export default LessonMetadata;
