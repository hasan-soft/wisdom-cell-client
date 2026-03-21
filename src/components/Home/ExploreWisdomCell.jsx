import { Link } from "react-router";
import {
  FiBookOpen,
  FiHeart,
  FiStar,
  FiUsers,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

const cards = [
  {
    icon: FiBookOpen,
    title: "Public Lessons",
    description:
      "Browse thousands of real life lessons shared by our community. Filter by category or emotional tone.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "hover:border-primary",
    to: "/public-lessons",
    label: "Browse Lessons",
    btnClass: "btn-primary",
  },
  {
    icon: FiHeart,
    title: "My Favorites",
    description:
      "Save lessons that resonate with you. Build your personal collection of wisdom to revisit anytime.",
    color: "text-error",
    bg: "bg-error/10",
    border: "hover:border-error",
    to: "/dashboard/my-favorites",
    label: "View Favorites",
    btnClass: "btn-outline btn-error",
  },
  {
    icon: FiStar,
    title: "Featured Lessons",
    description:
      "Hand-picked by our admin team — the most impactful and inspiring lessons on the platform.",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "hover:border-warning",
    to: "/",
    label: "See Featured",
    btnClass: "btn-outline btn-warning",
  },
  {
    icon: FiUsers,
    title: "Top Contributors",
    description:
      "Discover the most prolific wisdom-sharers. Follow authors whose lessons consistently inspire.",
    color: "text-success",
    bg: "bg-success/10",
    border: "hover:border-success",
    to: "/",
    label: "Meet Contributors",
    btnClass: "btn-outline btn-success",
  },
  {
    icon: FiTrendingUp,
    title: "Most Saved",
    description:
      "The lessons the community loves most. Sorted by how many members have saved them to their collection.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "hover:border-secondary",
    to: "/",
    label: "Explore Saved",
    btnClass: "btn-outline btn-secondary",
  },
  {
    icon: FiShield,
    title: "Premium Content",
    description:
      "Unlock exclusive lessons from top creators. Premium members get unlimited access to paid wisdom.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "hover:border-primary",
    to: "/payment",
    label: "Go Premium",
    btnClass: "btn-primary",
    badge: true,
  },
];

const ExploreWisdomCell = () => {
  return (
    <section className="py-16 sm:py-20 bg-base-100 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Explore
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-2 mb-4">
            Explore <span className="text-primary">WisdomCell</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Everything the platform has to offer — from community lessons to
            premium content and your personal favorites.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(
            ({
              icon: Icon,
              title,
              description,
              color,
              bg,
              border,
              to,
              label,
              btnClass,
              badge,
            }) => (
              <div
                key={title}
                className={`bg-base-200 rounded-2xl p-6 border border-base-300 ${border} hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-5`}
              >
                <div>
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`text-xl ${color}`} />
                    </div>
                    {badge && (
                      <span className="flex items-center gap-1 text-xs font-semibold bg-warning/10 text-warning px-2 py-1 rounded-full">
                        <FaCrown className="text-xs" /> Premium
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base-content text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {description}
                  </p>
                </div>

                <Link to={to} className={`btn ${btnClass} w-full btn-sm`}>
                  {label}
                </Link>
              </div>
            ),
          )}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-linear-to-r from-primary to-secondary rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-content mb-2">
              New to WisdomCell?
            </h3>
            <p className="text-primary-content opacity-90 text-sm max-w-md">
              Join over 10,000 members already preserving and sharing their
              wisdom. It's free to get started.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/auth/signup" className="btn btn-secondary px-8">
              Sign Up Free
            </Link>
            <Link
              to="/about"
              className="btn btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary px-8"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreWisdomCell;
