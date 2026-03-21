import { FaBook, FaHeart } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const DashboardStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user.email}`);
      return res.data;
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-linear-to-br from-primary/10 to-primary/20 shadow rounded-xl p-6 flex items-center gap-4">
        <FaBook className="text-3xl text-primary" />
        <div>
          <p className="text-sm text-muted">Total Lessons Created</p>
          <p className="text-2xl font-bold text-base-content">
            {lessons?.length}
          </p>
        </div>
      </div>
      <div className="bg-linear-to-br from-error/10 to-error/20 shadow rounded-xl p-6 flex items-center gap-4">
        <FaHeart className="text-3xl text-error" />
        <div>
          <p className="text-sm text-muted">Saved Lessons</p>
          <p className="text-2xl font-bold text-base-content">
            {favorites?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
