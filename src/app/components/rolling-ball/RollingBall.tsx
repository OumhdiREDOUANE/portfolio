"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackConfig } from "./track.config";

gsap.registerPlugin(ScrollTrigger);

export default function RollingBall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const ball = ballRef.current;

    if (!section || !svg || !path || !ball) return;

    const { ball: ballConfig, track, animation } = trackConfig;

    const pathLength = path.getTotalLength();
    const gap = ballConfig.radius + track.strokeWidth / 2;

    // SVG كيتضبط بوحدو مع أي مسار جديد
    const box = path.getBBox();
    const padding = gap + 20;
    const dropSpace = Math.abs(animation.dropHeight) + 20;

    svg.setAttribute(
      "viewBox",
      `${box.x - padding} ${box.y - padding - dropSpace} ${
        box.width + padding * 2
      } ${box.height + padding * 2 + dropSpace}`
    );

    // كنثبتو نفس جهة المسار، حتى فالدوّرات
    const sampleCount = 1500;
    const normals: { x: number; y: number }[] = [];
    let previousNormal: { x: number; y: number } | null = null;

    for (let index = 0; index <= sampleCount; index++) {
      const distance = (index / sampleCount) * pathLength;

      const before = path.getPointAtLength(Math.max(0, distance - 1));
      const after = path.getPointAtLength(
        Math.min(pathLength, distance + 1)
      );

      const dx = after.x - before.x;
      const dy = after.y - before.y;
      const length = Math.hypot(dx, dy);

      let normalX = -dy / length;
      let normalY = dx / length;

      if (!previousNormal && normalY > 0) {
        normalX *= -1;
        normalY *= -1;
      }

      if (
        previousNormal &&
        normalX * previousNormal.x + normalY * previousNormal.y < 0
      ) {
        normalX *= -1;
        normalY *= -1;
      }

      previousNormal = { x: normalX, y: normalY };
      normals.push(previousNormal);
    }

    const state = {
      progress: 0,
      dropY: animation.dropHeight,
    };

    const renderBall = () => {
      const distance = state.progress * pathLength;
      const current = path.getPointAtLength(distance);

      const index = Math.min(
        sampleCount,
        Math.round(state.progress * sampleCount)
      );

      const normal = normals[index];

      const x = current.x + normal.x * gap;
      const y = current.y + normal.y * gap + state.dropY;

      const rotation =
        -(distance / ballConfig.radius) * (180 / Math.PI);

      ball.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${rotation})`
      );
    };

    renderBall();
    svg.style.visibility = "visible";

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: animation.smoothness,
        anticipatePin: 1,
      },
    });

    timeline.to(state, {
      dropY: 0,
      duration: 1.8,
      ease: "bounce.out",
      onUpdate: renderBall,
    });

    timeline.to({}, { duration: 0.35 });

    timeline.to(state, {
      progress: 1,
      duration: 7,
      ease: "none",
      onUpdate: renderBall,
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  const { ball, track, animation, layout } = trackConfig;

  return (
    <section
      ref={sectionRef}
      className={`${layout.sectionClass} ${animation.scrollHeight}`}
    >
      <div className={layout.stickyClass}>
        <svg
          ref={svgRef}
          style={{ visibility: "hidden" }}
          className={layout.svgClass}
        >
          <path
            ref={pathRef}
            d={trackConfig.path}
            fill="none"
            stroke={track.color}
            strokeWidth={track.strokeWidth}
            strokeLinecap="round"
          />

          <g ref={ballRef}>
            <circle r={ball.radius} fill={ball.color} />
            <circle
              cx="0"
              cy={ball.markerY}
              r={ball.markerRadius}
              fill={ball.markerColor}
            />
          </g>
        </svg>
      </div>
    </section>
  );
}