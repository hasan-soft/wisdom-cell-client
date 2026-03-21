import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FcRating } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "./Lessons/LessonCard";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredLessons = [], isLoading } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Featured
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mt-2 mb-3">
            Featured Life Lessons
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
            Handpicked wisdom from our community
          </p>
        </div>

        {featuredLessons.length > 0 ? (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper pb-4"
            breakpoints={{
              // Mobile — 1 slide, no coverflow effect
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 0,
                  modifier: 1,
                  scale: 1,
                  slideShadows: false,
                },
              },
              // Tablet — 2 slides, light coverflow
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
                coverflowEffect: {
                  rotate: 15,
                  stretch: "10%",
                  depth: 100,
                  modifier: 1,
                  scale: 0.9,
                  slideShadows: false,
                },
              },
              // Desktop — 3 slides, full coverflow
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                coverflowEffect: {
                  rotate: 30,
                  stretch: "40%",
                  depth: 200,
                  modifier: 1,
                  scale: 0.75,
                  slideShadows: true,
                },
              },
            }}
          >
            {featuredLessons.map((lesson) => (
              <SwiperSlide key={lesson._id}>
                <LessonCard lesson={lesson} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-base-100 rounded-2xl border border-dashed border-base-300 px-4">
            <FcRating className="text-4xl sm:text-5xl mx-auto mb-4 opacity-50" />
            <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">
              No Featured Lessons Yet
            </h3>
            <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
              Admin will feature exceptional lessons here. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedLessons;
