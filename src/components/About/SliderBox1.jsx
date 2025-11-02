import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
function SliderBox1() {

    const titleRef = useRef(null);
    const title2Ref = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const splitTitleBox1 = SplitText.create(textRef.current, {
            type: "words",
            mask: "words",
            smartWrap: true
        })

        const tlBox1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".box1",
                start: "top center",
                end: "+=500",
                toggleActions: "play none none reverse",
            }
        })

        tlBox1.from(titleRef.current, {
            x: -100,
            duration: 0.5,
            opacity: 0
        })
        tlBox1.from(title2Ref.current, {
            rotateX: 180,
            duration: 2,
            opacity: 0,
            ease:"elastic"
        })

        tlBox1.from(splitTitleBox1.words, {
            y: 100,
            duration: 0.5,
            opacity: 0,
            stagger: {
                each: 0.09
            }
        } , "<")

        return () => {
            tlBox1.kill();
        }
    })
    return (
        <div className="slide box1">
            <div className="textAnimate">
                <h1 ref={titleRef}>Animate Experiences</h1>
                <h1 ref={title2Ref}>Craft Interfaces That Feel Alive</h1>
            </div>
            <h2 ref={textRef}>Whether it’s clean UI, smooth interactions,
                or immersive motion — I build digital products
                that are fast, modern, and enjoyable to use.</h2>
        </div>
    );
}

export default SliderBox1;