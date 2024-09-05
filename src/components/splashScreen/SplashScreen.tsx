"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 9999,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="70" height="70">
              <g>
                <g>
                  <circle fill="#a1d3ff" r="4" cy="50" cx="60">
                    <animate begin="-0.67s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
                    <animate begin="-0.67s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
                  </circle>
                  <circle fill="#a1d3ff" r="4" cy="50" cx="60">
                    <animate begin="-0.33s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
                    <animate begin="-0.33s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
                  </circle>
                  <circle fill="#a1d3ff" r="4" cy="50" cx="60">
                    <animate begin="0s" keyTimes="0;1" values="95;35" dur="1s" repeatCount="indefinite" attributeName="cx"></animate>
                    <animate begin="0s" keyTimes="0;0.2;1" values="0;1;1" dur="1s" repeatCount="indefinite" attributeName="fill-opacity"></animate>
                  </circle>
                </g>
                <g transform="translate(-15 0)">
                  <path transform="rotate(90 50 50)" fill="#0099e5" d="M50 50L20 50A30 30 0 0 0 80 50Z"></path>
                  <path fill="#0099e5" d="M50 50L20 50A30 30 0 0 0 80 50Z">
                    <animateTransform
                      keyTimes="0;0.5;1"
                      values="0 50 50;45 50 50;0 50 50"
                      dur="1s"
                      repeatCount="indefinite"
                      type="rotate"
                      attributeName="transform"
                    ></animateTransform>
                  </path>
                  <path fill="#0099e5" d="M50 50L20 50A30 30 0 0 1 80 50Z">
                    <animateTransform
                      keyTimes="0;0.5;1"
                      values="0 50 50;-45 50 50;0 50 50"
                      dur="1s"
                      repeatCount="indefinite"
                      type="rotate"
                      attributeName="transform"
                    ></animateTransform>
                  </path>
                </g>
                <g></g>
              </g>
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
