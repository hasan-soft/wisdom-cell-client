import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../utils";
import logo from "../../assets/logo.png";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signIn(email, password);
      await saveOrUpdateUser({
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      await saveOrUpdateUser({
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await signIn("demo@wisdomcell.com", "Demo@12345");
      navigate(from, { replace: true });
      toast.success("Demo Login Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex flex-col max-w-md w-full p-6 rounded-2xl sm:p-10 bg-base-200 text-base-content shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-4">
          <img src={logo} alt="WisdomCell" className="h-16 w-auto" />
        </Link>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-base-content">Log In</h1>
          <p className="text-sm text-muted mt-1">
            Sign in to access your account
          </p>
        </div>

        {/* Demo Login */}
        <button
          onClick={handleDemoLogin}
          className="btn btn-success w-full mb-6 gap-2 text-white"
        >
          Demo Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-base-300"></div>
          <p className="text-xs text-muted">or login with credentials</p>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter Your Email Here"
              className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-secondary bg-base-100 text-base-content"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm mb-2 block font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              id="password"
              required
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-secondary bg-base-100 text-base-content"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-xs hover:underline text-muted cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-base-300"></div>
          <p className="text-xs text-muted">or</p>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3 border border-base-300 p-2.5 rounded-xl cursor-pointer hover:bg-base-300 transition"
        >
          <FcGoogle size={24} />
          <p className="text-sm font-medium">Continue with Google</p>
        </div>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline text-secondary font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
