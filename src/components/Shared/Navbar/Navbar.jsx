import Container from "../Container";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/avater.png";
import logo from "../../../assets/logo.png";
import useRole from "../../../hooks/useRole";
import {
  FiMenu,
  FiX,
  FiUser,
  FiGrid,
  FiLogOut,
  FiPlusCircle,
  FiBookOpen,
  FiStar,
  FiHome,
  FiPhone,
  FiInfo,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const navLinkClass = ({ isActive }) =>
  `relative text-sm font-semibold transition-colors duration-200 ${
    isActive
      ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
      : "text-base-content/70 hover:text-primary"
  }`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { userData } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  //  Dark mode state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  //  Apply theme on change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const desktopNavLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/public-lessons" className={navLinkClass}>
        Public Lessons
      </NavLink>
      <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
        Add Lesson
      </NavLink>
      <NavLink to="/dashboard/my-lessons" className={navLinkClass}>
        My Lessons
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>
      {!userData?.isPremium && (
        <NavLink
          to="/payment"
          className={({ isActive }) =>
            `text-sm font-semibold px-3 py-1.5 rounded-full transition-all ${
              isActive
                ? "bg-warning text-warning-content"
                : "bg-warning/10 text-warning hover:bg-warning/20"
            }`
          }
        >
          ⭐ Go Premium
        </NavLink>
      )}
    </>
  );

  return (
    <div className="bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-40">
      <Container>
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
          {/* Left — Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 justify-self-start"
          >
            <img src={logo} alt="logo" className="h-14 md:h-20 w-auto" />
          </Link>

          {/* Center — Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-6">
            {desktopNavLinks}
          </nav>
          <div className="lg:hidden" />

          {/* Right — Auth + Theme + Mobile Toggle */}
          <div className="flex items-center gap-2 justify-self-end">
            {/*  Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle"
              title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            >
              {theme === "light" ? (
                <FiMoon className="text-lg text-base-content/70" />
              ) : (
                <FiSun className="text-lg text-warning" />
              )}
            </button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-base-300 hover:border-primary hover:shadow-md transition-all bg-base-200"
                >
                  <img
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-base-content leading-tight max-w-20 truncate">
                      {user?.displayName?.split(" ")[0] || "User"}
                    </p>
                    {userData?.isPremium && (
                      <p className="text-xs text-warning font-medium leading-tight">
                        Premium
                      </p>
                    )}
                  </div>
                  <FiMenu
                    className={`text-sm text-muted transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-base-200 shadow-2xl border border-base-300 overflow-hidden z-50">
                    <div className="px-4 py-4 bg-linear-to-r from-primary/10 to-secondary/10 border-b border-base-300">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.photoURL || avatarImg}
                          alt="profile"
                          className="h-11 w-11 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-base-content text-sm truncate">
                            {user?.displayName || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted truncate">
                            {user?.email}
                          </p>
                          {userData?.isPremium && (
                            <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full font-medium mt-0.5 inline-block">
                              ⭐ Premium
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-base-content hover:bg-base-300 transition font-medium"
                      >
                        <FiUser className="text-primary shrink-0" /> Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-base-content hover:bg-base-300 transition font-medium"
                      >
                        <FiGrid className="text-primary shrink-0" /> Dashboard
                      </Link>
                      <Link
                        to="/dashboard/add-lesson"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-base-content hover:bg-base-300 transition font-medium"
                      >
                        <FiPlusCircle className="text-success shrink-0" /> Add
                        Lesson
                      </Link>
                      <Link
                        to="/dashboard/my-lessons"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-base-content hover:bg-base-300 transition font-medium"
                      >
                        <FiBookOpen className="text-secondary shrink-0" /> My
                        Lessons
                      </Link>
                      {!userData?.isPremium && (
                        <Link
                          to="/payment"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-warning hover:bg-warning/10 transition font-medium border-t border-base-300"
                        >
                          <FiStar className="shrink-0" /> Upgrade to Premium
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/10 transition font-medium border-t border-base-300"
                      >
                        <FiLogOut className="shrink-0" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm font-semibold text-base-content"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-base-300 bg-base-100 py-3 px-2">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`
                }
              >
                <FiHome className="shrink-0" /> Home
              </NavLink>
              <NavLink
                to="/public-lessons"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`
                }
              >
                <FiBookOpen className="shrink-0" /> Public Lessons
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/dashboard/add-lesson"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`
                    }
                  >
                    <FiPlusCircle className="shrink-0" /> Add Lesson
                  </NavLink>
                  <NavLink
                    to="/dashboard/my-lessons"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`
                    }
                  >
                    <FiBookOpen className="shrink-0" /> My Lessons
                  </NavLink>
                </>
              )}
              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`
                }
              >
                <FiInfo className="shrink-0" /> About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`
                }
              >
                <FiPhone className="shrink-0" /> Contact
              </NavLink>
              {!userData?.isPremium && (
                <NavLink
                  to="/payment"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-warning hover:bg-warning/10 transition"
                >
                  <FiStar className="shrink-0" /> Go Premium
                </NavLink>
              )}

              {/*  Theme toggle in mobile menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200 transition"
              >
                {theme === "light" ? (
                  <>
                    <FiMoon className="shrink-0" /> Dark Mode
                  </>
                ) : (
                  <>
                    <FiSun className="shrink-0 text-warning" /> Light Mode
                  </>
                )}
              </button>

              {!user && (
                <div className="flex gap-2 px-4 pt-3 border-t border-base-300 mt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-outline btn-primary btn-sm flex-1"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
