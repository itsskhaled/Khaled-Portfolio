import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import imgAbout from "../img/5764924809908259832_121.jpg";

gsap.registerPlugin(useGSAP);
function ImgAbout() {
    const imgAboutRef = useRef(null);

    useGSAP(() => {
        
        gsap.from(imgAboutRef.current, {
            y: 200,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: imgAboutRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        })


    })
    return (
        <div className="containerImge" ref={imgAboutRef}>
            <img data-lag="0.2" src={imgAbout} alt="" />
        </div>
    );
}

export default ImgAbout;