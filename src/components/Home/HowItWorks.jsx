import { FiEdit3, FiTag, FiEye, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router";

const steps = [
  {
    step: "01",
    icon: FiEdit3,
    title: "Write Your Lesson",
    description:
      "Reflect on a meaningful experience — a mistake, a breakthrough, a realization. Write it down in your own words.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "02",
    icon: FiTag,
    title: "Tag the Emotion",
    description:
      "Label your lesson as Motivational, Reflective, Sad, or Gratitude. Emotional tagging helps others find what they need.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
  {
    step: "03",
    icon: FiEye,
    title: "Publish or Keep Private",
    description:
      "Share your wisdom with the community or keep it as a private journal. You are always in full control.",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  {
    step: "04",
    icon: FiTrendingUp,
    title: "Grow Together",
    description:
      "Discover lessons from thousands of members. Like, save, and comment on stories that resonate with your journey.",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 bg-base-100 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-2 mb-4">
            From Experience to Wisdom
            <span className="text-primary"> in 4 Steps</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            WisdomCell makes it effortless to capture, organize, and share the
            lessons that shape your life.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-primary/20 via-secondary/20 to-warning/20 z-0" />

          {steps.map(
            ({ step, icon: Icon, title, description, color, bg, border }) => (
              <div
                key={step}
                className={`relative bg-base-200 rounded-2xl p-6 border ${border} hover:shadow-md transition-all duration-300 hover:-translate-y-1 z-10`}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`text-xl ${color}`} />
                  </div>
                  <span className={`text-3xl font-bold ${color} opacity-20`}>
                    {step}
                  </span>
                </div>

                <h3 className="font-bold text-base-content mb-2 text-base">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
