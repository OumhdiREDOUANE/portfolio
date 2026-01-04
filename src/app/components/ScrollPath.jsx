"use client";

import { useEffect, useRef } from "react";

export default function ScrollPath() {
  const pathRef = useRef();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();

    // إعداد المسار
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.transition = "stroke-dashoffset 0.1s linear";

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // progress من 0 إلى 1
      let scrollProgress = scrollTop / docHeight;
      scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

      const drawLength = pathLength * scrollProgress;
      path.style.strokeDashoffset = pathLength - drawLength;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[300vh]">
      <svg
        viewBox="0 0 699 823"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
      >
        <g transform="translate(-50, 100) scale(0.8)">
          <path
            ref={pathRef}
            d="M0.112427 0.487183C96.3695 22.8596 237.915 33.3818 319.821 94.4872C398.062 152.859 
              540.116 400.259 661.373 298.487C686.95 277.021 705.963 213.479 693.145 180.487C673.084 128.85 
              592.412 115.552 544.213 122.487C470.965 133.026 362.41 168.496 319.821
              234.487C264.589 320.068 372.314 377.878 345.636 458.487C331.677 
              500.664 268.742 512.613 242.376 542.487C192.261 599.27 231.969 
              675.788 184.789 734.487C178.283 742.581 169.813 749.308 164.931 
              758.487C156.173 774.952 148.383 793.82 133.159 804.487C125.008 
              810.198 117.272 816.487 109.329 822.487"
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
