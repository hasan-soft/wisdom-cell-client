import { Link } from "react-router";
import {
  FaBookOpen,
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

const stats = [
  { value: "10,000+", label: "Members" },
  { value: "50,000+", label: "Lessons Shared" },
  { value: "120+", label: "Countries" },
  { value: "4.9", label: "Avg. Rating" },
];

const values = [
  {
    icon: FaBookOpen,
    title: "Knowledge Preservation",
    description:
      "Every lesson learned is worth keeping. We help you capture insights before they fade from memory.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: FaHeart,
    title: "Emotional Authenticity",
    description:
      "Real growth comes from honest reflection. We encourage vulnerability and genuine storytelling.",
    color: "text-error",
    bg: "bg-error/10",
  },
  {
    icon: FaUsers,
    title: "Community Wisdom",
    description:
      "Collective intelligence is greater than individual insight. Your lessons inspire thousands.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: FaLightbulb,
    title: "Continuous Growth",
    description:
      "Learning never stops. WisdomCell grows with you through every chapter of your life.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: FaShieldAlt,
    title: "Privacy First",
    description:
      "Your private lessons stay private. You control what you share and what stays personal.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: FaStar,
    title: "Quality Over Quantity",
    description:
      "We celebrate depth of insight over volume. One profound lesson beats a hundred shallow posts.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const team = [
  {
    name: "Aria Mondal",
    role: "Founder & CEO",
    bio: "Passionate about turning lived experience into lasting wisdom.",
    initials: "AM",
    color: "bg-primary/20 text-primary",
  },
  {
    name: "Nabil Hassan",
    role: "Head of Product",
    bio: "Designs systems that make reflection feel effortless and meaningful.",
    initials: "NH",
    color: "bg-success/20 text-success",
  },
  {
    name: "Priya Sen",
    role: "Community Lead",
    bio: "Builds the bridge between individual stories and collective growth.",
    initials: "PS",
    color: "bg-secondary/20 text-secondary",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content leading-tight mb-6">
            Where Life Lessons
            <span className="text-primary"> Become </span>
            Lasting Wisdom
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            WisdomCell was born from a simple belief — every person carries
            invaluable lessons from their experiences. We built a home where
            those lessons live forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/public-lessons" className="btn btn-primary btn-lg px-8">
              Explore Lessons
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline btn-primary btn-lg px-8"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-base-200 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="text-center p-6 bg-base-100 rounded-2xl shadow-sm"
              >
                <p className="text-3xl font-bold text-primary mb-1">{value}</p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-4 mb-6 leading-tight">
                Turning Experience Into Intelligence
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                We live in an age of information overload, yet the most valuable
                knowledge — hard-won personal lessons — often disappears with
                time. WisdomCell changes that.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                Our platform lets you document lessons by emotional tone,
                category, and access level. Whether it's a career breakthrough
                or a relationship mistake, every lesson deserves to be
                preserved.
              </p>
              <p className="text-muted leading-relaxed">
                Premium members can monetize their wisdom. Free members can
                access a wealth of community knowledge. Everyone benefits from
                the collective intelligence of lived experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-linear-to-br from-primary/10 to-primary/20 rounded-2xl p-6 col-span-2">
                <FaLightbulb className="text-3xl text-primary mb-3" />
                <h3 className="font-bold text-base-content mb-2">
                  Why WisdomCell?
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Most knowledge platforms focus on abstract information. We
                  focus on personal experience — the most powerful teacher of
                  all.
                </p>
              </div>
              <div className="bg-linear-to-br from-success/10 to-success/20 rounded-2xl p-6">
                <p className="text-2xl font-bold text-success mb-1">93%</p>
                <p className="text-sm text-muted">
                  Users report personal growth after 30 days
                </p>
              </div>
              <div className="bg-linear-to-br from-secondary/10 to-secondary/20 rounded-2xl p-6">
                <p className="text-2xl font-bold text-secondary mb-1">2.4x</p>
                <p className="text-sm text-muted">
                  Better decision-making reported by members
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-base-200 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-4">
              Our Core Values
            </h2>
            <p className="text-muted mt-3 max-w-xl mx-auto">
              Every decision we make is guided by these six principles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="bg-base-100 rounded-2xl p-6 border border-base-300 hover:shadow-md transition"
              >
                <div
                  className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`text-xl ${color}`} />
                </div>
                <h3 className="font-bold text-base-content mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
              The People Behind It
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-4">
              Meet the Team
            </h2>
            <p className="text-muted mt-3 max-w-xl mx-auto">
              We're a small team with a big belief — that personal wisdom
              deserves a permanent home.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map(({ name, role, bio, initials, color }) => (
              <div
                key={name}
                className="text-center bg-base-200 rounded-2xl p-8 border border-base-300"
              >
                <div
                  className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-lg font-bold mx-auto mb-4`}
                >
                  {initials}
                </div>
                <h3 className="font-bold text-base-content mb-1">{name}</h3>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-3">
                  {role}
                </p>
                <p className="text-sm text-muted leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-linear-to-r from-primary to-secondary rounded-3xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
            Ready to Preserve Your Wisdom?
          </h2>
          <p className="text-primary-content opacity-90 mb-8 leading-relaxed">
            Join thousands of members who are turning their life experiences
            into lasting lessons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup" className="btn btn-secondary btn-lg px-8">
              Get Started Free
            </Link>
            <Link
              to="/public-lessons"
              className="btn btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary btn-lg px-8"
            >
              Browse Lessons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
