import React from "react";
import Banner from "../../components/Home/Banner";
import WhyLerningFromLifeLesson from "../../components/Home/WhyLerningFromLifeLesson";
import FeaturedLessons from "../../components/Home/FeaturedLessons";
import TopContributors from "../../components/Home/TopContributors";
import MostSavedLessons from "../../components/Home/MostSavedLessons";
import HowItWorks from "../../components/Home/HowItWorks";
import FAQ from "../../components/Home/FAQ";
import ExploreWisdomCell from "../../components/Home/ExploreWisdomCell";
import PublicLessonsPreview from "../../components/Home/PublicLessonsPreview";

const Home = () => {
  return (
    <div>
      <Banner />
      <PublicLessonsPreview />
      <FeaturedLessons />
      <ExploreWisdomCell />
      <WhyLerningFromLifeLesson />
      <TopContributors />
      <div className="mb-10">
        <MostSavedLessons />
      </div>
      <HowItWorks />
      <FAQ />
    </div>
  );
};

export default Home;