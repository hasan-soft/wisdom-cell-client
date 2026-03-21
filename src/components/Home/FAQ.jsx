import { useState } from "react";
import { Link } from "react-router";
import { FaChevronDown } from "react-icons/fa";

const faqCategories = [
  {
    category: "General",
    faqs: [
      {
        q: "What is WisdomCell?",
        a: "WisdomCell is a platform where people document, organize, and share life lessons. Whether it's a career breakthrough, relationship insight, or personal mistake — every lesson has a home here.",
      },
      {
        q: "Is WisdomCell free to use?",
        a: "Yes! WisdomCell has a generous free plan that lets you create up to 10 lessons, save favorites, and access public content. Premium membership unlocks unlimited lessons and exclusive features.",
      },
      {
        q: "Who can use WisdomCell?",
        a: "Anyone aged 13 and above can join. Whether you're a student, professional, or retiree — if you have life experience to share, WisdomCell is for you.",
      },
    ],
  },
  {
    category: "Account",
    faqs: [
      {
        q: "How do I create an account?",
        a: 'Click "Sign Up" from the navbar. You can register with your email and password or sign in instantly with your Google account.',
      },
      {
        q: "Can I delete my account?",
        a: 'Yes. Go to your Dashboard settings and select "Delete Account". This will permanently remove your account and all associated data within 30 days.',
      },
      {
        q: "How do I update my profile?",
        a: "Navigate to Dashboard → Profile → Update Profile. You can change your display name and profile photo at any time.",
      },
    ],
  },
  {
    category: "Lessons",
    faqs: [
      {
        q: "How do I create a lesson?",
        a: 'Go to Dashboard → Add Lesson. Fill in the title, description, category, emotional tone, and visibility. Hit "Publish Lesson" and your wisdom is live.',
      },
      {
        q: "Can I keep my lessons private?",
        a: 'Absolutely. When creating or editing a lesson, set visibility to "Private". Private lessons are only visible to you and will never appear in public feeds.',
      },
      {
        q: "What are emotional tones?",
        a: "Emotional tones help categorize lessons by how they feel — Motivational, Reflective, Sad, or Gratitude. This helps readers find content that matches their emotional needs.",
      },
      {
        q: "Can I edit or delete a lesson?",
        a: "Yes. Go to Dashboard → My Lessons to update or delete any lesson you've created. Changes take effect immediately.",
      },
    ],
  },
  {
    category: "Premium",
    faqs: [
      {
        q: "What does Premium include?",
        a: "Premium gives you unlimited lesson creation, the ability to create and access paid lessons, priority listing, advanced analytics, ad-free experience, and priority support.",
      },
      {
        q: "Is Premium a subscription?",
        a: "No! WisdomCell Premium is a one-time payment of ৳1500 for lifetime access. No monthly fees, no hidden charges.",
      },
      {
        q: "How do I upgrade to Premium?",
        a: 'Click "Upgrade to Premium" in the navbar or go to the Payment page. Complete the secure Stripe checkout and your account upgrades instantly.',
      },
      {
        q: "Can I get a refund?",
        a: "Refunds are available within 7 days of purchase if you have not accessed any premium content. Contact our support team to request a refund.",
      },
    ],
  },
];

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div className="border border-base-300 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-semibold text-base-content hover:text-primary transition gap-3"
    >
      <span className="text-sm sm:text-base">{q}</span>
      <FaChevronDown
        className={`shrink-0 text-sm text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
    >
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-base-300">
        <p className="text-sm text-muted leading-relaxed pt-4">{a}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openItem, setOpenItem] = useState({ cat: 0, faq: 0 });
  const [activeCategory, setActiveCategory] = useState(0);

  const handleToggle = (catIdx, faqIdx) => {
    if (openItem?.cat === catIdx && openItem?.faq === faqIdx) {
      setOpenItem(null);
    } else {
      setOpenItem({ cat: catIdx, faq: faqIdx });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-base-200 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mt-2 mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Everything you need to know about WisdomCell. Can't find your
            answer?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {faqCategories.map(({ category }, idx) => (
            <button
              key={category}
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === idx
                  ? "bg-primary text-primary-content"
                  : "bg-base-100 text-muted border border-base-300 hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqCategories[activeCategory].faqs.map(({ q, a }, faqIdx) => (
            <FAQItem
              key={faqIdx}
              q={q}
              a={a}
              isOpen={
                openItem?.cat === activeCategory && openItem?.faq === faqIdx
              }
              onClick={() => handleToggle(activeCategory, faqIdx)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 bg-linear-to-r from-primary to-secondary rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-primary-content mb-2">
            Still have questions?
          </h3>
          <p className="text-primary-content opacity-90 text-sm mb-6">
            Our support team is happy to help you with anything.
          </p>
          <Link to="/contact" className="btn btn-secondary px-8">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
