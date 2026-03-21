import { useState } from "react";
import { Link } from "react-router";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";

const contactInfo = [
  {
    icon: FaEnvelope,
    title: "Email Us",
    detail: "support@wisdomcell.com",
    sub: "We reply within 24 hours",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Our Location",
    detail: "Dhaka, Bangladesh",
    sub: "Open to remote collaboration",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: FaClock,
    title: "Working Hours",
    detail: "Sat – Thu, 9am – 6pm",
    sub: "Bangladesh Standard Time",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];


const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you within 24 hours.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content leading-tight mb-5">
            We'd Love to <span className="text-primary">Hear From You</span>
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Have a question, feedback, or just want to say hello? Our team is
            always happy to help.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-12 sm:py-16 px-4 bg-base-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {contactInfo.map(
              ({ icon: Icon, title, detail, sub, color, bg }) => (
                <div
                  key={title}
                  className="bg-base-100 rounded-2xl p-5 sm:p-6 border border-base-300 text-center hover:shadow-md transition"
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className={`text-lg sm:text-xl ${color}`} />
                  </div>
                  <h3 className="font-bold text-base-content mb-1 text-sm sm:text-base">
                    {title}
                  </h3>
                  <p className="text-sm font-medium text-base-content mb-1">
                    {detail}
                  </p>
                  <p className="text-xs text-muted">{sub}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-14 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">
              Send Us a Message
            </h2>
            <p className="text-muted mb-7 sm:mb-8">
              Fill out the form and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    required
                    className="input input-bordered focus:input-primary w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    required
                    className="input input-bordered focus:input-primary w-full"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="input input-bordered focus:input-primary w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows={6}
                  className="textarea textarea-bordered focus:textarea-primary w-full"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
