import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo.png";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, signIn } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      const result = await createUser(email, password);
      await saveOrUpdateUser({ name, email, image: imageURL });
      await updateUserProfile(name, imageURL);
      console.log(result);
      navigate(from, { replace: true });
      toast.success("Signup Successful");
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
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
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
    <div className="flex justify-center items-center min-h-screen bg-base-100 py-8">
      <div className="flex flex-col max-w-md w-full p-6 rounded-2xl sm:p-10 bg-base-200 text-base-content shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-4">
          <img src={logo} alt="WisdomCell" className="h-16 w-auto" />
        </Link>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-base-content">Sign Up</h1>
          <p className="text-sm text-muted mt-1">Welcome to WisdomCell</p>
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
          <p className="text-xs text-muted">or create a new account</p>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name Here"
              className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-secondary bg-base-100 text-base-content"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name must be within 20 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-base-content"
            >
              Profile Image
            </label>
            <input
              {...register("image")}
              type="file"
              id="image"
              accept="image/*"
              className="block w-full text-sm text-muted
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary/10 file:text-primary
                hover:file:bg-primary/20
                bg-base-100 border border-dashed border-secondary rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-secondary
                py-2"
            />
            <p className="mt-1 text-xs text-muted">
              PNG, JPG or JPEG (max 2MB)
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-secondary bg-base-100 text-base-content"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm mb-2 block font-medium"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              type="password"
              autoComplete="new-password"
              id="password"
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-secondary bg-base-100 text-base-content"
            />
            {errors.password?.type === "required" && (
              <p className="text-error text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-error text-sm mt-1">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-error text-sm mt-1">
                Must have uppercase, lowercase, number and special character
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-secondary w-full">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-base-300"></div>
          <p className="text-xs text-muted">or</p>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Google */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3 border border-base-300 p-2.5 rounded-xl cursor-pointer hover:bg-base-300 transition"
        >
          <FcGoogle size={24} />
          <p className="text-sm font-medium">Continue with Google</p>
        </div>

        {/* Login Link */}
        <p className="text-sm text-center text-muted mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline text-secondary font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
