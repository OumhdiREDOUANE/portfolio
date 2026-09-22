export const trackConfig = {
  // بدّل غير هاد d ملي بغيتي مسار جديد
  path: `M0.112427 0.487183C96.3695 22.8596 237.915 33.3818 319.821 94.4872C398.062 152.859 540.116 400.259 661.373 298.487C686.95 277.021 705.963 213.479 693.145 180.487C673.084 128.85 592.412 115.552 544.213 122.487C470.965 133.026 362.41 168.496 319.821 234.487C264.589 320.068 372.314 377.878 345.636 458.487C331.677 500.664 268.742 512.613 242.376 542.487C192.261 599.27 231.969 675.788 184.789 734.487C178.283 742.581 169.813 749.308 164.931 758.487C156.173 774.952 148.383 793.82 133.159 804.487C125.008 810.198 117.272 816.487 109.329 822.487`,
ball: {
  radius: 12,
  color: "#000000",
  markerColor: "#ffffff",
  markerRadius: 2,
  markerY: -9,
},

  track: {
    color: "#777777",
    strokeWidth: 8,
  },

  animation: {
    dropHeight: -300,
    scrollHeight: "h-[450vh]",
    smoothness: 0.6,
  },

  // بدّل هاد classes باش تغيّر position ديال SVG فالصفحة
  layout: {
    sectionClass: "relative bg-white",
    stickyClass: "sticky top-0 flex min-h-screen items-center p-8",
    svgClass: "h-auto w-full overflow-visible rounded-xl bg-zinc-100",
  },
};