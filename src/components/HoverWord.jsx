import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";


function HoverWord({ text }) {

    const wrapperRef = useRef(null);
    const topRef = useRef(null);
    const bottomRef = useRef(null);


    useLayoutEffect(() => {
        gsap.set(bottomRef.current, { y: "100%" })
    }, [])

    const handleEnter = () => {
        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.out" } });
        tl.to(topRef.current, { y: "-100%" }, 0);
        tl.to(bottomRef.current, { y: "0%" }, 0);
    }

    const handleLeave = () => {
        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.out" } });
        tl.to(topRef.current, { y: "0%" }, 0);
        tl.to(bottomRef.current, { y: "100%" }, 0);
    }
    return (
        <div
            ref={wrapperRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
                height: "1em",
                lineHeight: "1em"
            }}>
            <span ref={topRef} style={{ display: "inline-block" }}>{text}</span>
            <span ref={bottomRef} style={{
                position: "absolute",
                left: 0,
                top: 0,
                display: "inline-block"
            }}>{text}</span>

        </div>
    );
}
export default HoverWord;