import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [cursorAnim, setCursorAnim] = useState({
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "rgba(32, 37, 37, 0.3)",
  });

  const isLockedRef = useRef(false);
  const cursorSizeRef = useRef({ width: 10, height: 10 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!isLockedRef.current) {
        const { width, height } = cursorSizeRef.current;
        mouseX.set(e.clientX - width / 2);
        mouseY.set(e.clientY - height / 2);
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);


  const handleHover = (e) => {
    isLockedRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const padding = 2;
    const newShape = {
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      borderRadius: "15px",
      backgroundColor: "rgba(32, 37, 37, 0.17)",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    };
    const targetX = rect.left - padding;
    const targetY = rect.top - padding;
    mouseX.set(targetX);
    mouseY.set(targetY);
    setCursorAnim(newShape);
    cursorSizeRef.current = newShape;
  };

  const handleLeave = () => {
    isLockedRef.current = false;
    const newShape = {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "rgba(32, 37, 37, 0.3)",
    };
    setCursorAnim(newShape);
    cursorSizeRef.current = newShape;
  };

  const handleTextEnter = () => {
    isLockedRef.current = false;
    const newShape = {
      width: 3,
      height: 18,
      borderRadius: "10px",
      backgroundColor: "rgba(32, 37, 37, 0.3)",
    };
    setCursorAnim(newShape);
    cursorSizeRef.current = newShape;
  };

  const handleTextLeave = () => {
    isLockedRef.current = false;
    const newShape = {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "rgba(32, 37, 37, 0.3)",
    };
    setCursorAnim(newShape);
    cursorSizeRef.current = newShape;
  };
  const value = { handleHover, handleLeave, handleTextEnter, handleTextLeave };
  return (
    <CursorContext.Provider value={value}>
      <motion.div
        className="cursor"
        key="global-cursor"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={cursorAnim}
        transition={springConfig}
      />
      {/* 2. نقوم برسم باقي التطبيق (الأبناء) */}
      {children}
    </CursorContext.Provider>
  );
}

export const useCustomCursor = () => {
  return useContext(CursorContext);
};
