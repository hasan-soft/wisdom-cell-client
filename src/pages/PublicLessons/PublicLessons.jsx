import Lessons from "../../components/Home/Lessons/Lessons";
import Container from "../../components/Shared/Container";

const PublicLessons = () => {
  return (
    <Container>
      <h2 className="text-center text-3xl font-bold text-base-content">
        Public Lessons
      </h2>
      <div className="py-10">
        <Lessons />
      </div>
    </Container>
  );
};

export default PublicLessons;
