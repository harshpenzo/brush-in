
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      setTimeout(() => {
        setTransitionStage("fadeIn");
        setDisplayLocation(location);
      }, 300);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
