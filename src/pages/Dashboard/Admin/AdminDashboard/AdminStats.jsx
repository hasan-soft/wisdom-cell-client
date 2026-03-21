import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBookOpen, FaFlag } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["adminLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data.result;
    },
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["adminReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  const publicLessons = lessons.filter((l) => l.privacy === "public");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-linear-to-br from-primary/10 to-primary/20 p-5 rounded-lg flex items-center gap-4">
        <FaUsers size={30} className="text-primary" />
        <div>
          <p className="text-sm text-muted">Total Users</p>
          <h3 className="text-xl font-bold text-base-content">
            {users.length}
          </h3>
        </div>
      </div>

      <div className="bg-linear-to-br from-success/10 to-success/20 p-5 rounded-lg flex items-center gap-4">
        <FaBookOpen size={30} className="text-success" />
        <div>
          <p className="text-sm text-muted">Public Lessons</p>
          <h3 className="text-xl font-bold text-base-content">
            {publicLessons.length}
          </h3>
        </div>
      </div>
      <div className="bg-linear-to-br from-error/10 to-error/20 p-5 rounded-lg flex items-center gap-4">
        <FaFlag size={30} className="text-error" />
        <div>
          <p className="text-sm text-muted">Reported Lessons</p>
          <h3 className="text-xl font-bold text-base-content">
            {reports.length}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
