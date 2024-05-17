import { motion } from "framer-motion";

const transition = (ogComponent) => {
  return (
    <>
      <ogComponent />
      <motion.div
        key={"slide-in"}
        className="bg-darkGreen fixed top-0 left-0 w-full h-screen origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        key={"slide-out"}
        className="bg-darkGreen fixed top-0 left-0 w-full h-screen origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transition;
