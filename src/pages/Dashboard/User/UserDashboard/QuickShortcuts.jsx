import { Link } from "react-router";
import {
  FaPlus,
  FaBookOpen,
  FaGlobe,
  FaHeart,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";

const QuickShortcuts = () => {
  const shortcuts = [
    {
      to: "/dashboard/add-lesson",
      label: "Add New Lesson",
      icon: <FaPlus className="text-primary" />,
    },
    {
      to: "/dashboard/my-lessons",
      label: "My Lessons",
      icon: <FaBookOpen className="text-secondary" />,
    },
    {
      to: "/public-lessons",
      label: "Public Lessons",
      icon: <FaGlobe className="text-success" />,
    },
    {
      to: "/dashboard/my-favorites",
      label: "My Favorites",
      icon: <FaHeart className="text-error" />,
    },
    {
      to: "/payment",
      label: "Upgrade to Premium",
      icon: <FaCrown className="text-warning" />,
    },
  ];

  return (
    <div className="bg-base-200 rounded-2xl shadow-lg p-6 lg:col-span-1 border border-base-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-base-content mb-2">
          Quick Actions
        </h3>
        <p className="text-muted text-sm">
          Navigate quickly to different sections
        </p>
      </div>

      <div className="space-y-4">
        {shortcuts.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group flex items-center justify-between p-4 rounded-xl border border-base-300 hover:border-primary hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-linear-to-r from-base-200 to-base-100 hover:from-primary/5 hover:to-base-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <div className="text-2xl">{link.icon}</div>
              </div>

              <div>
                <span className="font-semibold text-base-content group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <p className="text-xs text-muted mt-1">Click to navigate</p>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FaArrowRight className="text-primary text-sm" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 p-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
        <p className="text-sm text-primary flex items-center gap-2">
          <span className="font-medium">💡 Quick Tip:</span>
          Use these shortcuts for faster navigation to frequently used pages
        </p>
      </div>
    </div>
  );
};

export default QuickShortcuts;
