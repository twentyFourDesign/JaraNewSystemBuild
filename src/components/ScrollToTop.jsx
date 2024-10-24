import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 200, // Scroll to 100 pixels from the top
      behavior: "smooth",
    });
  }, [pathname]);

  return children;
};

export default ScrollToTop;
