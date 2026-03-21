import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

const swiperStyles = `
  .banner-swiper .swiper-pagination-bullet {
    background-color: var(--color-base-300);
    opacity: 1;
    width: 8px;
    height: 8px;
    transition: background-color 0.3s, width 0.3s;
  }
  .banner-swiper .swiper-pagination-bullet-active {
    background-color: var(--color-primary);
    width: 24px;
    border-radius: 4px;
  }
  .banner-swiper .swiper-pagination {
    bottom: 16px;
  }
`;

const slides = [
  {
    title: "Organize Lessons by How They Made You Feel",
    description:
      "Tag lessons as Motivational, Reflective, Sad, Gratitude, or Realization. Find exactly what you need based on emotional resonance.",
    buttonText: "Share your thoughts",
    buttonLink: "/add-lesson",
    image: banner1,
    alt: "Emotional organization illustration",
  },
  {
    title: "Capture Insights Anytime, Anywhere",
    description:
      "Mobile-optimized for those sudden moments of clarity. Add lessons from your commute, travels, or quiet moments.",
    buttonText: "Explore WisdomVault",
    buttonLink: "/",
    image: banner2,
    alt: "Mobile capture illustration",
  },
  {
    title: "Join 10,000+ Members Preserving Their Wisdom",
    description:
      "Real stories from our community. See how documenting lessons leads to personal breakthroughs.",
    buttonText: "Join Us",
    buttonLink: "/join",
    image: banner3,
    alt: "Community members illustration",
  },
];

const Banner = () => {
  return (
    <>
      <style>{swiperStyles}</style>

      <section className="bg-base-100 py-8 md:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={true}
            className="rounded-2xl shadow-xl banner-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="bg-base-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center p-6 md:p-10 lg:p-12 gap-8 lg:gap-12 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
                  {/* Text */}
                  <div className="order-2 lg:order-1 space-y-4 lg:space-y-6 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-base-content">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {slide.description}
                    </p>
                    <div className="pt-2">
                      <Link
                        to={slide.buttonLink}
                        className="btn btn-primary btn-lg px-8 sm:px-10 shadow-md hover:shadow-lg transition-shadow"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 flex justify-center items-center">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full max-w-[420px] lg:max-w-[500px] h-[220px] sm:h-[280px] lg:h-[340px] object-cover rounded-xl shadow-xl transform transition duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Banner;
