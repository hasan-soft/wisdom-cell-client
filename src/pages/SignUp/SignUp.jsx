import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-base-200 text-base-content">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-muted">Welcome to WisdomCell</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          action=""
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
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
                    message: "Name must be within 20 character",
                  },
                })}
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name.message}</p>
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
                  focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary
                  py-2"
              />
              <p className="mt-1 text-xs text-muted">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
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
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm mb-2 block">
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
                <p className="text-error">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-error">Password is 6 character or longer</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-error">
                  Password must have one uppercase, one lowercase, one number
                  and a special character!
                </p>
              )}
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-secondary w-full">
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-base-300"></div>
          <p className="px-3 text-sm text-muted">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-base-300"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-base-300 rounded cursor-pointer hover:bg-base-300 transition"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-secondary text-lg text-secondary"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
