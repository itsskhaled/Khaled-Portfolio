// src/components/Applayout/Applayout.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ApplayoutStyle.css";

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger);

function Applayout({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({
      isDesktop: '(min-width : 1000px)',
      isMobile: '(max-width : 700px)',
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions;
      if (isDesktop) {
        ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 2,
          effects: true,
        });
      }
    })
  });

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

export default Applayout;
