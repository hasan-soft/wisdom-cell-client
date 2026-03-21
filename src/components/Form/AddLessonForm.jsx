import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { imageUpload } from "../../utils";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonUploadAnimation from "../Lottie/LessonUploadAnimation";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude"];

const AddLessonForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { userData } = useRole();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data) => {
    const {
      title,
      description,
      image,
      category,
      emotionalTone,
      privacy,
      accessLevel,
    } = data;

    const imageFile = image?.[0];
    let imageURL = null;

    try {
      setLoading(true);

      if (imageFile) {
        imageURL = await imageUpload(imageFile);
      }

      const lessonData = {
        title,
        description,
        category,
        emotionalTone,
        privacy,
        accessLevel: accessLevel || "free",
        authorName: user?.displayName,
        authorEmail: user?.email,
        authorPhoto: user?.photoURL,
        likesCount: 0,
        favoritesCount: 0,
        createdAt: new Date(),
        ...(imageURL && { image: imageURL }),
      };

      const res = await axiosSecure.post("/lessons", lessonData);

      if (res.data.insertedId || res.data._id) {
        setShowSuccess(true);
        reset();
        setTimeout(() => setShowSuccess(false), 2800);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not create lesson. Please try again.",
        confirmButtonColor: "#4F46E5",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-300/50">
        <div className="card-body p-8 md:p-10">
          <h2 className="card-title text-3xl font-bold mb-2">
            Create New Life Lesson
          </h2>
          <p className="text-muted mb-8">
            Share your insight with the community
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Lesson Title</span>
              </label>
              <input
                type="text"
                placeholder="A short, powerful title..."
                {...register("title", { required: "Title is required" })}
                className="input input-bordered focus:input-primary w-full"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Your Story / Insight
                </span>
              </label>
              <textarea
                placeholder="Tell the full story, lesson, or realization..."
                {...register("description", {
                  required: "Description is required",
                })}
                className="textarea textarea-bordered focus:textarea-primary h-44 w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  defaultValue=""
                  className="select select-bordered focus:select-primary w-full"
                >
                  <option disabled value="">
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emotional Tone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Emotional Tone</span>
                </label>
                <select
                  {...register("emotionalTone", {
                    required: "Please select a tone",
                  })}
                  defaultValue=""
                  className="select select-bordered focus:select-primary w-full"
                >
                  <option disabled value="">
                    Select Emotional Tone
                  </option>
                  {emotionalTones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Cover Image (optional)
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Privacy */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Visibility</span>
                </label>
                <select
                  {...register("privacy", { required: true })}
                  className="select select-bordered focus:select-primary w-full"
                >
                  <option value="public">Public (visible to everyone)</option>
                  <option value="private">Private (only you)</option>
                </select>
              </div>

              {/* Access Level */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Access Level</span>
                </label>
                <div
                  className={`tooltip tooltip-right w-full ${!userData?.isPremium ? "tooltip-warning" : ""}`}
                  data-tip={
                    !userData?.isPremium
                      ? "Premium membership required for paid lessons"
                      : ""
                  }
                >
                  <select
                    {...register("accessLevel")}
                    disabled={!userData?.isPremium}
                    defaultValue="free"
                    className="select select-bordered focus:select-primary w-full disabled:bg-base-200 disabled:text-base-content/50"
                  >
                    <option value="free">Free for all</option>
                    <option value="premium">Premium (paid access)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2 text-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span> Posting...
                </>
              ) : (
                "Publish Lesson"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/70 backdrop-blur-sm p-4">
          <div className="card bg-base-200 shadow-2xl rounded-3xl max-w-md w-full overflow-hidden">
            <div className="p-8 pb-4">
              <LessonUploadAnimation />
            </div>
            <div className="card-body pt-0 items-center text-center">
              <h3 className="text-2xl font-bold text-success">
                Lesson Created!
              </h3>
              <p className="text-muted mt-2 mb-6">Your insight is now live.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="btn btn-primary w-full max-w-xs"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLessonForm;
