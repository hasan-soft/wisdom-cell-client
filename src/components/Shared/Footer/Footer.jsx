import { Link } from "react-router";
import logo from "../../../assets/logo.png";
import { FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-base-300">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="WisdomCell"
                className="h-16 md:h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-xs">
              Capture life's most valuable lessons. Organize, reflect, and share
              wisdom that shapes who you become.
            </p>
            <div className="flex gap-2">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-base-300 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-base-300 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-base-300 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
              Explore
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/public-lessons"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Public Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Most Saved
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Top Contributors
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
              Account
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/signup"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/payment"
                  className="text-sm text-muted hover:text-primary transition flex items-center gap-2"
                >
                  Upgrade
                  <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded font-medium">
                    Premium
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted hover:text-primary transition"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6">
          <p className="text-sm text-muted text-center sm:text-left">
            © 2026 WisdomCell. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
            <p className="text-sm text-muted">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
