"use client";



import { useEffect, useRef, useState } from "react";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import styles from "./page.module.css";
import ScrollWave from "./ScrollWave"
import Navbar from "./NavBar";
import Image from "next/image";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-bricolage",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});
const projects = [
  {
    number: "01",
    title: "packspace",
    type: "E-commerce platform",
    year: "2025",
   description: "A modern e-commerce platform designed to make packaging products easy to discover, explore, and purchase.",
    image: "/packspace.png",
    href:"https://packspace-fin-eight.vercel.app"
  },
  {
    number: "02",
    title: "packspaceStack",
   type: "Order Processing System",
    year: "2026",
    description: "An automated system that manages incoming orders and sends them directly to the printer for seamless and efficient order fulfillment.",
    image: "/packspaceStack.png",
    href:"https://packspace-stack.vercel.app"
  },
  
];
const processSteps = [
  {
    number: "01",
    title: "Discover",
    text: "I understand the idea, goals, audience, and what the experience needs to achieve.",
  },
  {
    number: "02",
    title: "Structure",
    text: "I define the content, layout, interactions, and technical direction before writing the code.",
  },
  {
    number: "03",
    title: "Build",
    text: "I turn the structure into a fast, responsive interface using modern web technologies.",
  },
  
  {
    number: "05",
    title: "Launch",
    text: "I test, optimize, and deploy the final experience so it is ready for real users.",
  },
];
const technologyGroups = [
  {
    number: "01",
    title: "Frontend",
    tools: [
      {
        name: "Next.js",
        logo: "https://cdn.simpleicons.org/nextdotjs/171717",
      },
      {
        name: "React",
        logo: "https://cdn.simpleicons.org/react/171717",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.simpleicons.org/typescript/171717",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.simpleicons.org/tailwindcss/171717",
      },
    ],
  },
  {
    number: "02",
    title: "Backend",
    tools: [
      {
        name: "laravel",
        logo: "https://cdn.simpleicons.org/laravel/171717",
      },
      {
        name: "mongoDB",
        logo: "https://cdn.simpleicons.org/mongoDB/171717",
      },
      {
        name: "MySQL",
        logo: "https://cdn.simpleicons.org/MySQL/171717",
      }
      
    ],
  },
  {
    number: "04",
    title: "Workflow",
    tools: [
      {
        name: "Git",
        logo: "https://cdn.simpleicons.org/git/171717",
      },
      {
        name: "GitHub",
        logo: "https://cdn.simpleicons.org/github/171717",
      },
      {
        name: "postman",
        logo: "https://cdn.simpleicons.org/postman/171717",
      },
      {
        name: "Figma",
        logo: "https://cdn.simpleicons.org/figma/171717",
      },
    ],
  },
];
export default function Home() {
const aboutRef = useRef<HTMLElement>(null);
const routeRef = useRef<SVGPathElement>(null);
const ballRef = useRef<HTMLDivElement>(null);
const animationPlayed = useRef(false);
const technologiesRef = useRef<HTMLElement>(null);
const [technologiesVisible, setTechnologiesVisible] = useState(false);
const [aboutVisible, setAboutVisible] = useState(false);
const worksRef = useRef<HTMLElement>(null);
const [worksVisible, setWorksVisible] = useState(false);
const processRef = useRef<HTMLElement>(null);
const [processVisible, setProcessVisible] = useState(false);
const finalPointRef = useRef<HTMLSpanElement>(null);
useEffect(() => {
  const about = aboutRef.current;
  const route = routeRef.current;
  const ball = ballRef.current;

  if (!about || !route || !ball) return;

  const getPointOnRoute = (distance: number) => {
    const point = route.getPointAtLength(distance);
    const matrix = route.getScreenCTM();

    if (!matrix) return null;

    const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);

    return {
      left: screenPoint.x - 19,
      top: screenPoint.y - 19,
    };
  };

  const playAnimation = () => {
    if (animationPlayed.current) return;
    animationPlayed.current = true;

    const pathLength = route.getTotalLength();
    const firstPoint = getPointOnRoute(0);

    if (!firstPoint) return;

    route.style.strokeDasharray = `${pathLength}`;
    route.style.strokeDashoffset = `${pathLength}`;

    const ballPosition = ball.getBoundingClientRect();

    ball.classList.add(styles.storyBallMoving);
    ball.style.right = "auto";
    ball.style.bottom = "auto";

    /* الكورة كتخرج من الطابلة وكتوصل لبداية المسار */
    const transitionDuration = 550;
    const transitionStart = performance.now();

    const moveToRoute = (now: number) => {
      const progress = Math.min(
        (now - transitionStart) / transitionDuration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      ball.style.left = `${
        ballPosition.left + (firstPoint.left - ballPosition.left) * eased
      }px`;

      ball.style.top = `${
        ballPosition.top + (firstPoint.top - ballPosition.top) * eased
      }px`;

      ball.style.transform = `rotate(${progress * 180}deg)`;

     if (progress < 1) {
  requestAnimationFrame(moveToRoute);
} else {
  setAboutVisible(true);
  drawRoute(performance.now(), pathLength);
}
    };

    /* الكورة كتتبع المسار الحقيقي وكتخليه يترسم */
    const routeDuration = 2500;

    const drawRoute = (startTime: number, pathLength: number) => {
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / routeDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const point = getPointOnRoute(pathLength * eased);

        if (point) {
          ball.style.left = `${point.left}px`;
          ball.style.top = `${point.top}px`;
          ball.style.transform = `rotate(${progress * 1260}deg)`;
        }

        route.style.strokeDashoffset = `${pathLength * (1 - eased)}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAboutVisible(true);
        }
      };

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(moveToRoute);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) playAnimation();
    },
    { threshold: 0.3 }
  );

  observer.observe(about);

  return () => observer.disconnect();
}, []);
useEffect(() => {
  const works = worksRef.current;

  if (!works) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setWorksVisible(true);
    },
    { threshold: 0.2 }
  );

  observer.observe(works);

  return () => observer.disconnect();
}, []);
useEffect(() => {
  const process = processRef.current;

  if (!process) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setProcessVisible(true);
    },
    { threshold: 0.25 }
  );

  observer.observe(process);

  return () => observer.disconnect();
}, []);
useEffect(() => {
  const technologies = technologiesRef.current;

  if (!technologies) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setTechnologiesVisible(true);
    },
    { threshold: 0.2 }
  );

  observer.observe(technologies);

  return () => observer.disconnect();
}, []);

  return (
    <main className={` portfolio-shell ${bricolage.variable} ${dmSans.variable }`} style={{ position: "relative", overflow: "clip" }}>
    <Navbar />

     <div className="content-layer" >
     <div ref={ballRef} className={styles.storyBall} aria-hidden="true" />
      <section className={styles.hero}>
        <div className={styles.top}>
         <span></span>
       
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Digital Solutions Developer</p>

          <h1>
            REDOUANE
            <br />
            OUMHDI
          </h1>

          <div className={styles.bottom}>
           <p>
  Digital solutions developer crafting
  <br />
  simple, powerful digital solutions.
</p>


            <a href="#about" className={styles.scrollLink}>
              <span>↓</span>
              Scroll to start
            </a>
          </div>
        </div>

        <div className={styles.drawing} aria-hidden="true">
         
          <div className={styles.table} />
        </div>
      </section>

      <section
  ref={aboutRef}
  id="about"
  className={`${styles.about} ${aboutVisible ? styles.aboutVisible : ""}`}
>
  <div className={styles.aboutNumber}>01 / ABOUT</div>

  <svg
    className={styles.aboutLine}
    viewBox="0 0 1200 650"
    fill="none"
    aria-hidden="true"
  >
    <path
    ref={routeRef}
      className={styles.route}
      d="M-20 80 C180 80 130 260 330 260 S500 130 620 240 S760 450 940 420 S1010 280 1220 300"
    />
  </svg>

  
 <article className={styles.paper}>
  <span className={styles.paperPin} aria-hidden="true" />

  <p className={styles.label}>A SHORT INTRODUCTION</p>

  <h2>
    I build digital solutions
    <br />
    people enjoy using.
  </h2>

  <p className={styles.description}>
    I’m REDOUANE, an independent digital solutions developer based in Casablanca.
    I turn ideas into simple, useful and scalable digital experiences.
  </p>

  <div className={styles.info}>
    <span>Based in Morocco</span>
    <span>Available for freelance</span>
  </div>
</article>

  <p className={styles.note}>
    The ball lands here.
    <br />
    The story continues.
  </p>
</section>
<section
  ref={worksRef}
  id="work"
  className={`${styles.work} ${worksVisible ? styles.workVisible : ""}`}
>
  <div className={styles.workHeader}>
    <span>02 / SELECTED WORK</span>
    <p></p>
  </div>

  <div className={styles.projects}>
    {projects.map((project, index) => (
      <a
        href={`${project.href}`}
        target="_blanck"
        className={styles.project}
        key={project.number}
        style={{ "--index": index } as React.CSSProperties}
      >
        <div className={styles.projectVisual}>
  <Image
    src={project.image}
    alt={`${project.title} project preview`}
    fill
    sizes="(max-width: 700px) 100vw, 55vw"
    className={styles.projectImage}
  />

  <span className={styles.projectNumber}>{project.number}</span>

  <span className={styles.viewProject}>
    View case study ↗
  </span>
</div>

        <div className={styles.projectInfo}>
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>

          <div className={styles.projectMeta}>
            <span>{project.type}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </a>
    ))}
  </div>
</section>
<section
  ref={processRef}
  id="process"
  className={`${styles.process} ${
    processVisible ? styles.processVisible : ""
  }`}
>
  <div className={styles.processHeader}>
    <span>03 / MY PROCESS</span>

    
  </div>

  <div className={styles.processIntro}>
    <h2>
      From ideas
      <br />
      to interaction.
    </h2>

    <p>
      I start by understanding the idea and defining what needs to be built.
      Then I shape the structure, develop the experience, add motion and
      interactions, and refine every detail before launch.
    </p>
  </div>

  <div className={styles.processTrack} aria-hidden="true">
    <span />
  </div>

  <div className={styles.steps}>
    {processSteps.map((step, index) => (
      <article
        className={styles.step}
        key={step.number}
        style={{ animationDelay: `${0.2 + index * 0.16}s` }}
      >
        <span className={styles.stepNumber}>{step.number}</span>

        <div className={styles.stepDot} aria-hidden="true" />

        <h3>{step.title}</h3>

        <p>{step.text}</p>
      </article>
    ))}
  </div>
</section>
<section
  ref={technologiesRef}
  id="technologies"
  className={`${styles.technologies} ${
    technologiesVisible ? styles.technologiesVisible : ""
  }`}
>
  <div className={styles.technologiesHeader}>
    <span>04 / TOOLS &amp; TECHNOLOGIES</span>
    <p></p>
  </div>

  <div className={styles.technologiesIntro}>
    <h2>
      Chosen tools.
      <br />
      Clear outcomes.
    </h2>

    <p>
      I use the right tools for every stage:
      from the first concept to the final experience.
    </p>
  </div>

  <div className={styles.technologyList}>
    {technologyGroups.map((group, index) => (
      <article
        className={styles.technologyGroup}
        key={group.title}
        style={{ animationDelay: `${0.15 + index * 0.16}s` }}
      >
        <div className={styles.technologyTitle}>
          <span>{group.number}</span>
          <h3>{group.title}</h3>
        </div>

        <ul>
  {group.tools.map((tool) => (
    <li className={styles.tool} key={tool.name}>
      <span>{tool.name}</span>

      <span className={styles.toolBubble} aria-hidden="true">
        <img src={tool.logo} alt="" />
      </span>
    </li>
  ))}
</ul>
      </article>
    ))}
  </div>
</section>
<section id="contact" className={styles.contact}>
  <div className={styles.contactTop}>
    <span>04 / LET&apos;S WORK TOGETHER</span>
    <span></span>
  </div>

  <div className={styles.contactContent}>
    <div>
      <h2>
        Have an idea?
        <br />
        Let&apos;s make it clear.
      </h2>

      <p>
  Have an idea, a product, or a brand that needs
  a clear direction?
  <br />
  <span ref={finalPointRef}>Let&apos;s talk.</span>
</p>

      <a href="mailto:redouaneoumhdi@gmail.com" className={styles.email}>
        redouaneoumhdi@gmail.com <span>↗</span>
      </a>

      <div className={styles.cvActions} aria-label="Curriculum vitae">
        <a
          href="/Redouane-Oumhdi-CV.pdf"
          target="_blank"
          rel="noreferrer"
          className={styles.cvLink}
        >
          View CV <span aria-hidden="true">↗</span>
        </a>
        <a
          href="/Redouane-Oumhdi-CV.pdf"
          download="Redouane-Oumhdi-CV.pdf"
          className={`${styles.cvLink} ${styles.cvDownload}`}
        >
          Download CV <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>

   <div className={styles.envelope} aria-hidden="true">
  <svg viewBox="0 0 400 280" fill="none">
    <rect x="2" y="2" width="396" height="276" stroke="currentColor" strokeWidth="3" />

    <path
      d="M3 4 L200 158 L397 4"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M3 277 L137 142"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <path
      d="M397 277 L263 142"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>

  <span>HELLO</span>
</div>
  </div>

  <footer className={styles.footer}>
   
<span></span>
    <div>
      <a href="https://linkedin.com/in/redouaneoumhdi" target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href="https://github.com/OumhdiREDOUANE" target="_blank" rel="noreferrer">
        github
      </a>
      <a href="https://www.instagram.com/redouanemar1/" target="_blank" rel="noreferrer">
        Instagram
      </a>
    </div>
  </footer>
</section></div>
      <ScrollWave segments={7} step={720} amplitude={320} />

    </main>
  );
}
