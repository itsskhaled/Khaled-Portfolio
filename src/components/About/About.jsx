import gsap from "gsap";
import "./AboutStyle.css";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import _ScrollTrigger from "gsap/ScrollTrigger";
import SliderBox1 from "./SliderBox1";
import { useRef } from "react";
import ImgAbout from "./ImgAbout";

gsap.registerPlugin(useGSAP, _ScrollTrigger, SplitText);

function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // ======  Animation title about ======
    const splitAbout = SplitText.create(".titleAbout", {
      type: "words",
      wordsClass: "word++",
      mask: "words",
      smartWrap: true,
    });

    const splitInfoAbout = SplitText.create(".infoAbout", {
      type: "lines chars",
      charsClass: "char++",
      linesClass: "line++",
      mask: "lines",
      smartWrap: true,
    });

    const tlcontentAbout = gsap.timeline({
      scrollTrigger: {
        trigger: ".contentAbout",
        start: "top center",
        end: "+=500",
        toggleActions: "restart none reverse none",
      },
    });

    tlcontentAbout
      .from(splitAbout.words, {
        y: 100,
        duration: 0.5,
        opacity: 0,
        ease: "power3.out",
        stagger: { each: 0.12 },
        onComplete: () => {
          tlcontentAbout.to(['.char26', '.char27', '.char28', '.char29', '.char30', '.char31', '.char32', '.char33', '.char34', '.char35', '.char36', '.char37', '.char38', '.char39'], {
            rotateX: 360,
            duration: 1,
            stagger: { each: 0.12 }
          });
          tlcontentAbout.to(['.char45', '.char46', '.char47', '.char48', '.char49', '.char50', '.char51', '.char52', '.char53', '.char54', '.char55', '.char56', '.char57', '.char58', '.char59', '.char60', '.char61', '.char62', '.char63', '.char64'], {
            rotateX: 360,
            duration: 1,
            stagger: { each: 0.12 }
          })

        }
      })

      .from(
        splitInfoAbout.lines,
        {
          y: 100,
          duration: 1,
          opacity: 0,
          stagger: { each: 0.1 },
        },
        "<"
      );

    // ====== matchMedia ======
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 701px)",
        isMobile: "(max-width: 700px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          const slides = gsap.utils.toArray(".slide");
          const horizontal = gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              scrub: 2,
              pin: true,
            },
          });

          const splitHorizontal = SplitText.create(".horizontalText", {
            type: "lines words",
            wordsClass: "wordHorizonral++",
            smartWrap: true,
          });
          
          const tlHorizontal = gsap.timeline({
            scrollTrigger: {
              trigger: ".box2",
              start: "left center",
              end: "+=400",
              scrub: 1,
              containerAnimation: horizontal,
              toggleActions: "play none reverse none",
            },
          });

          tlHorizontal.from(splitHorizontal.words, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: {
              each: 0.12
            }
          });
          tlHorizontal.from('.wordHorizonral1' , {
            scale:3,
            ease:"power3.out",
          }, "<")
          tlHorizontal.from('.wordHorizonral3' , {
            y:100,
            ease:"power3.out",
          }, "<")
          tlHorizontal.from('.wordHorizonral18' , {
            x:100,
            ease:"power3.out"
          })

          return () => {
            tlHorizontal.kill();
            horizontal.kill();
            splitHorizontal.revert();
          };
        }

        if (isMobile) {
          const splitHorizontal = SplitText.create(".horizontalText", {
            type: "lines",
            smartWrap: true,
            mask: "lines"
          });
          gsap.from(splitHorizontal.lines, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: {
              each: 0.12
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".box2",
              start: "top center",
              toggleActions: "play none reverse none",
            }
          });
        }
      }
    );
    return () => {
      tlcontentAbout.kill();
      mm.revert();
    };
  });

  return (
    <section id="about">
      <div className="content">
        <div className="contentAbout">
          <h1 className="titleAbout" data-lag="0.2">About Me</h1>
          <h1 className="infoAbout" data-lag="0.1">
            I Build Dynamic And Immersive Web Experiences Where Clean Code Meets
            Smooth, Purposeful Animation — Turning Interfaces Into Something
            Users Actually Feel.
          </h1>
          <ImgAbout />
        </div>

        <div className="container" ref={containerRef}>
          <SliderBox1 />
          <div className="slide box2">
            <h1 className="horizontalText">
              Smooth & Smart Interactions Bring Every Interface To Life With
              Precise<br />Modern Motion — Clean Code, Fluid Transitions<br />And A
              Seamless User Experience That Feels Great.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
