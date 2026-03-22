
import { motion } from "framer-motion";

const AnimatedSection = ({ children, variant = "fadeUp" }) => {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      show: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -80 },
      show: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 80 },
      show: { opacity: 1, x: 0 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.9 },
      show: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
