"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroSection() {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const targetRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Scroll effect for content
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200;
      const progress = Math.min(scrollY / maxScroll, 1);

      setOpacity(1 - progress);
      setTranslateY(progress * 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure target position relative to content
  useEffect(() => {
    if (!targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const parentRect = targetRef.current.parentElement.getBoundingClientRect();

    setPosition({
      top: rect.top - parentRect.top + rect.height / 2,
      left: rect.left - parentRect.left + rect.width / 2,
    });
  }, []);

  return (
    <section className="section0 min-h-screen grid grid-cols-12 gap-8 px-16">
      {/* ===== Content ===== */}
      <div
        className="content col-span-5 flex flex-col justify-center transition-none relative"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`
        }}
      >
        {/* Micro label */}
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
          Portfolio — 2026
        </p>

        {/* Heading */}
        <h1 className="text-6xl font-bold leading-tight text-black mb-8">
          I build <br />
          interfaces <br />
          that move
        </h1>

        {/* Ball */}
        <div ref={targetRef} className="w-3 h-3 rounded-full bg-black mb-6" />

        {/* Red overlay ball */}
        <div
          className="absolute w-3 h-3 bg-red-500 rounded-full pointer-events-none"
          style={{
            top: position.top,
            left: position.left,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Subheading */}
        <p className="text-sm text-neutral-500 max-w-sm">
          Full-Stack Developer • Motion-Driven UX
        </p>

        {/* Scroll hint */}
        <div className="mt-20 text-xs text-neutral-400 tracking-wide">
          ↓ scroll
        </div>
      </div>

      {/* ===== Visual (فارغة الآن) ===== */}
      <div className="visual col-span-7 relative">
      </div>
    </section>
  );
}
