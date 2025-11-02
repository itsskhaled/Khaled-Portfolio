import gsap from "gsap";
import "./FooterStyle.css";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import HoverWord from "../HoverWord";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
function Footer() {

    const footerTitleRef = useRef(null);
    const btnFooterRef = useRef(null);

    useGSAP(() => {

        const splitFooter = SplitText.create(footerTitleRef.current, {
            type: "words",
            mask: "words"
        })

        const TimeLineFooter = gsap.timeline({
            scrollTrigger: {
                trigger: "#footer",
                start: "top center",
                end: "+=500",
                toggleActions: "restart none none none"
            }
        });
        TimeLineFooter.from(btnFooterRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
        });
        TimeLineFooter.from(splitFooter.words, {
            x: -100,
            opacity: 0,
            duration: 2,
            ease: "power3.out",
            stagger: {
                each: 0.1,
                from: "center"
            }
        }, "<");
    })
    return (
        <section id="footer">
            <div className="content-footer">
                <button className="btn-footer" ref={btnFooterRef}><a href="https://www.instagram.com/programmer.khaled/"><HoverWord text="Let`s Work Together🔥!" /></a></button>
                <h1 ref={footerTitleRef}>Programmer KHALED</h1>
            </div>
        </section>
    );
}

export default Footer;