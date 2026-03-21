import React from "react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../../utils";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, updateUserProfile, loading } = useAuth();

  const onSubmit = async (data) => {
    const { name, image } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      await updateUserProfile(name, imageURL);
      await saveOrUpdateUser({ name, image: imageURL, email: user?.email });
      toast.success("Profile updated successfully!!");
      navigate("/dashboard/profile");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center text-primary">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
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
              <button type="submit" className="btn btn-secondary mt-4 w-full">
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Update"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
