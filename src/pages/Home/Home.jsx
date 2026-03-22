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
import AnimatedSection from "../../components/AnimatedSection";

const Home = () => {
  return (
    <div>
      <AnimatedSection variant="zoom">
        <Banner />
      </AnimatedSection>

      <AnimatedSection variant="fadeUp">
        <PublicLessonsPreview />
      </AnimatedSection>

      <AnimatedSection variant="fadeUp">
        <FeaturedLessons />
      </AnimatedSection>

      <AnimatedSection variant="fadeRight">
        <ExploreWisdomCell />
      </AnimatedSection>

      <AnimatedSection variant="fadeLeft">
        <WhyLerningFromLifeLesson />
      </AnimatedSection>

      <AnimatedSection variant="fadeUp">
        <TopContributors />
      </AnimatedSection>

      <AnimatedSection variant="zoom">
        <div className="mb-10">
          <MostSavedLessons />
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp">
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection variant="fadeUp">
        <FAQ />
      </AnimatedSection>
    </div>
  );
};

export default Home;
