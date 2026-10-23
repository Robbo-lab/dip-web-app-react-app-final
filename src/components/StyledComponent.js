import React, { useState, useEffect } from "react";
import "../assets/styles.css";

export default function StyledComponent() {
  const [animationDuration, setAnimationDuration] = useState(1);

  function handleDurationChange() {
    setAnimationDuration(animationDuration + 1);
  }

  useEffect(() => {
    console.log("State changed");
  }, [animationDuration]);

  return (
    <>
      <section
        className="animatedSection"
        style={{
          animation: `fadeInScale ${animationDuration}s ease-in-out infinite`,
        }}
      >
        This is a styled section with animation
      </section>
      <button className="button is-primary" onClick={handleDurationChange}>
        Click
      </button>
      <p className="help is-size-7 mt-3">State-driven styles and effects.</p>
    </>
  );
}
