import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-brand-lavender/30 hover:border-brand-lavender shadow-lg transition-all duration-200"
            title="Về đầu trang"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}