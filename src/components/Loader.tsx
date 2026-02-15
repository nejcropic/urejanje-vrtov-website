import { motion, AnimatePresence } from "motion/react";
import styles from "./Loader.module.css";
import logo from "../assets/logo.svg";
import { useEffect } from "react";

type Props = {
  loading: boolean;
};

export default function Loader({ loading }: Props) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className={styles.inner}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
          >
            <img src={logo} alt="Logo" className={styles.logo} />

            <motion.div
              className={styles.line}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
