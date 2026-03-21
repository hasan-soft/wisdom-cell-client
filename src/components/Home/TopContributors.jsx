import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCrown, FaMedal } from "react-icons/fa";
import { Link } from "react-router";

const rankConfig = [
  {
    icon: FaCrown,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    label: "Top Creator",
  },
  {
    icon: FaMedal,
    color: "text-base-content/40",
    bg: "bg-base-300",
    border: "border-base-300",
    label: "2nd Place",
  },
  {
    icon: FaMedal,
    color: "text-secondary/60",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    label: "3rd Place",
  },
];

const TopContributors = () => {
  const { data: contributors = [] } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-contributors`,
      );
      return res.data;
    },
  });

  return (
    <section className="py-16 sm:py-20 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-2 mb-4">
            Top Contributors <span className="text-primary">of the Week</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Celebrating the creators who shared the most valuable lessons this
            week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT — Leaderboard */}
          <div className="space-y-4">
            {contributors.slice(0, 3).map((user, index) => {
              const rank = rankConfig[index] || rankConfig[2];
              const RankIcon = rank.icon;
              return (
                <div
                  key={user.email}
                  className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border ${rank.border} bg-base-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {/* Rank */}
                  <div
                    className={`w-10 h-10 rounded-xl ${rank.bg} flex items-center justify-center shrink-0`}
                  >
                    <RankIcon className={`text-lg ${rank.color}`} />
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-base-300"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-base-100 rounded-full flex items-center justify-center text-xs font-bold text-base-content border border-base-300">
                      {index + 1}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base-content truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>

                  {/* Lesson count */}
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-primary">
                      {user.lessonCount || 0}
                    </p>
                    <p className="text-xs text-muted">lessons</p>
                  </div>
                </div>
              );
            })}

            {/* Remaining contributors */}
            {contributors.slice(3).map((user, index) => (
              <div
                key={user.email}
                className="flex items-center gap-4 p-4 rounded-2xl border border-base-300 bg-base-200 hover:shadow-sm transition"
              >
                <span className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center text-sm font-bold text-muted shrink-0">
                  {index + 4}
                </span>
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base-content text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-primary text-sm">
                    {user.lessonCount || 0}
                  </p>
                  <p className="text-xs text-muted">lessons</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Highlight Card */}
          <div className="bg-linear-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20">
            <div className="flex flex-col items-center text-center">
              {contributors[0] && (
                <>
                  {/* Image + Crown */}
                  <div className="relative mb-5">
                    <img
                      src={contributors[0].image}
                      alt={contributors[0].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary/30"
                    />
                    <div className="absolute -top-2 -right-2 w-9 h-9 bg-warning/20 rounded-full flex items-center justify-center border-2 border-warning/40">
                      <FaCrown className="text-warning text-sm" />
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-warning bg-warning/10 px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                    Top Creator
                  </span>

                  <h3 className="text-2xl font-bold text-base-content mb-1">
                    {contributors[0].name}
                  </h3>
                  <p className="text-sm text-muted mb-5">
                    {contributors[0].email}
                  </p>

                  <div className="flex justify-center gap-8 mb-6 w-full">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {contributors[0].lessonCount || 0}
                      </p>
                      <p className="text-xs text-muted mt-1">Lessons</p>
                    </div>
                    <div className="w-px bg-base-300" />
                    <div>
                      <p className="text-3xl font-bold text-secondary">#1</p>
                      <p className="text-xs text-muted mt-1">This Week</p>
                    </div>
                  </div>

                  <Link
                    to={`/author-profile/${contributors[0].email}`}
                    className="btn btn-primary w-full"
                  >
                    View Profile
                  </Link>
                </>
              )}

              {!contributors[0] && (
                <div className="py-8">
                  <FaCrown className="text-5xl text-muted/30 mb-4" />
                  <p className="text-muted">No contributors yet this week.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
