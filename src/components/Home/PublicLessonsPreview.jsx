import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LessonCard from "./Lessons/LessonCard";
import { Link } from "react-router";

const PublicLessonsPreview = () => {
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["publicLessonsPreview"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons`, {
        params: { limit: 6, skip: 0, privacy: "public" },
      });
      return res.data.result || [];
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-2 mb-4">
            Latest Public <span className="text-primary">Lessons</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Real stories and insights shared by our community members.
          </p>
        </div>

        {/* 6 Cards — 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/public-lessons" className="btn btn-primary btn-lg px-10">
            View All Lessons
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PublicLessonsPreview;
