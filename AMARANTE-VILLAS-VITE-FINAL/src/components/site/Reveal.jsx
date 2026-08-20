import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 40, className = "", as }) => {
  const Comp = motion[as || "div"];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: easing, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
};

// Masked line-by-line reveal for editorial headings
export const MaskedLines = ({ lines, className = "", lineClassName = "", delay = 0 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.2, ease: easing, delay: delay + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);
