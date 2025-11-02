import gsap from "gsap";
import "./ProjectStyle.css";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Projects() {

    const containerProjectsRef = useRef(null);
    const cardRef = useRef(null);

    useGSAP(() => {

        const splitTitle = SplitText.create(".titleProjects", {
            type: "chars",
            mask: "chars",
            smartWrap: true
        })

        const TimeLineProjects = gsap.timeline({
            scrollTrigger: {
                trigger: ".titleProjects",
                start: "top center",
                end: "+=500",
                pin: true,
                pinSpacing: false,
                // markers: true,
                toggleActions: "play none none reverse"
            }
        });

        TimeLineProjects.from(splitTitle.chars, {
            x: -100,
            opacity: 0,
            stagger: {
                each: 0.1
            },
        });

        const mm = gsap.matchMedia();
        mm.add({
            isDesktop: '(min-width : 701px)',
            isMobile: '(max-width : 700px)',
        }, (context) => {
            console.log(context.conditions);
            const { isDesktop, isMobile } = context.conditions;

            if (isDesktop) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerProjectsRef.current,
                        start: "top center",
                        end: "+=500",
                        toggleActions: "play none none reverse"
                    }
                })
                tl.from(cardRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    stagger: {
                        each: 0.15
                    }
                })
            } else if (isMobile) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerProjectsRef.current,
                        start: "top center",
                        end: "+=500",
                        toggleActions: "play none none reverse"
                    }
                });

                tl.from(cardRef.current, {
                    x: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    stagger: {
                        each: 0.15
                    }
                })
            }
        })
    })
    return (
        <section id="projects">
            <div className="containerProjects" ref={containerProjectsRef}>
                <h1 className="titleProjects">Projects</h1>
                <div className="contentCard">
                    {/* {maping} */}
                    <div className="card" ref={cardRef}>
                        <div className="item-card">
                            <div className="imgProject" data-lag="0.1">
                                <h1>I`m working Yet!</h1>
                            </div>
                        </div>
                        <div className="item-card">
                            <div className="imgProject" data-lag="0.5">
                                <h1>I`m working Yet!</h1>
                            </div>
                        </div>
                        <div className="item-card">
                            <div className="imgProject" data-lag="0.3">
                                <h1>I`m working Yet!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;