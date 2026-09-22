import { useEffect, useRef, useState } from "react";

type ScrollWaveProps = {
  segments?: number;
  step?: number;
  amplitude?: number;
  showBall?: boolean;
  className?: string;
};

const WIDTH = 1000;

function buildWavePath(
  segments: number,
  step: number,
  amplitude: number
) {
  const cx = WIDTH / 2;
  let d = "M -80 80";

  for (let i = 0; i < segments; i++) {
    const y0 = 80 + i * step;
    const y1 = y0 + step;
    const direction = i % 2 === 0 ? 1 : -1;

    d += `
      C ${cx - amplitude * direction * 2} ${y0 + step * 0.15},
        ${cx + amplitude * direction * 2} ${y1 - step * 0.15},
        ${cx} ${y1}
    `;
  }

  return d;
}

export default function ScrollWave({
  segments = 7,
  step = 720,
  amplitude = 320,
  showBall = true,
  className,
}: ScrollWaveProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const height = 80 + segments * step;
  const path = buildWavePath(
    segments,
    step,
    amplitude
  );

  // Get REAL path length
  useEffect(() => {
    const path = pathRef.current;

    if (!path) return;

    setPathLength(path.getTotalLength());
  }, [path]);

  // Scroll
  useEffect(() => {
    let raf = 0;

    const handleScroll = () => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const value =
          maxScroll > 0
            ? window.scrollY / maxScroll
            : 0;

        setProgress(
          Math.max(0, Math.min(value, 1))
        );

        raf = 0;
      });
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      cancelAnimationFrame(raf);
    };
  }, []);

  /*
   * Position of the ball.
   *
   * This is the SAME progress used by the line.
   */
  const ballDistance =
    pathLength * progress;

  let ballX = 0;
  let ballY = 0;

  if (pathRef.current && pathLength > 0) {
    const point =
      pathRef.current.getPointAtLength(
        ballDistance
      );

    ballX = point.x;
    ballY = point.y;
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "5rem",
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 3,
        pointerEvents: "none",
        mixBlendMode: "difference",
        overflow: "visible",
      }}
    >
      {/* Background / remaining path */}
      <path
        d={path}
        fill="none"
        stroke="#fff"
        strokeWidth={1}
        opacity={0.2}
      />

      {/* Reference path */}
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="none"
      />

      {/* =========================
          ANIMATED BLACK TRAIL
         ========================= */}
      <path
        d={path}
        fill="none"
        stroke="#fff"
        strokeWidth={1.8}
        strokeLinecap="round"
        pathLength={1000}
        strokeDasharray={`${progress * 1000} 1000`}
        strokeDashoffset={0}
      />

      {/* =========================
          BALL
         ========================= */}
      {showBall && pathLength > 0 && (
        <circle
          cx={ballX}
          cy={ballY}
          r={6}
          fill="#fff"
          stroke="#fff"
          strokeWidth={1.8}
        />
      )}
    </svg>
  );
}