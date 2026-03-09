import { useMemo } from "react";
import { motion } from "framer-motion";
import "./CherryBlossam.css";

const CherryBlossam = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 8,
      size: 6 + Math.random() * 12,
      opacity: 0.4 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <div className="cherryblossom-container">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.x}%`,
            top: -20,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(petal.id) * 50, Math.cos(petal.id) * 30, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: petal.opacity }}
          >
            <ellipse
              cx="12"
              cy="12"
              rx="8"
              ry="12"
              fill="#f6bac4"
              transform="rotate(45 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="6"
              ry="10"
              fill="rgba(255,192,203,0.4)"
              transform="rotate(45 12 12)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default CherryBlossam;
