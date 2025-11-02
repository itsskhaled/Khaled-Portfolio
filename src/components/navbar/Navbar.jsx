import './NavStyle.css';
import gsap, { selector } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import HoverWord from '../HoverWord';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(useGSAP, ScrollToPlugin);

function Navbar() {

    const curtainRef = useRef(null);
    const btnRef = useRef(null);
    const navRef = useRef(null);
    const closeRef = useRef(null);
    const tlMenuRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add({
            isDesktop: '(min-width : 701px)',
            isMobile: '(max-width : 700px)'
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions;
            if (isDesktop) {
                gsap.from("a", {
                    y: -100,
                    opacity: 0,
                    duration: 2,
                    stagger: {
                        each: 0.1,
                        from: "random"
                    }
                })
                // === Menu ===
            } else if (isMobile) {
                gsap.set(btnRef.current, {
                    position: "fixed",
                    top: 30,
                    left: "50%",
                    xPercent: -50,
                    padding: "10px 22px",
                    background: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 600,
                    cursor: "pointer",
                    zIndex: 1000,
                    boxShadow: "0 10px 30px rgba(0,0,0,.15)",
                });

                gsap.set(curtainRef.current, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 18,
                    zIndex: 999,
                    yPercent: -100,
                });

                const links = navRef.current.querySelectorAll("a");
                gsap.set(links, {
                    display: "block",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#000",
                    textDecoration: "none",
                });

                gsap.set(closeRef.current, {
                    marginTop: "auto",
                    marginBottom: 26,
                    padding: "10px 22px",
                    background: "#fff",
                    color: "#000",
                    border: "none",
                    borderRadius: 999,
                    fontWeight: 600,
                    cursor: "pointer",
                });

                tlMenuRef.current = gsap
                    .timeline({ paused: true })
                    .to(curtainRef.current, {
                        yPercent: 0,
                        duration: 0.55,
                        ease: "power3.out",
                    })
                    .from(links, {
                        opacity: 0,
                        y: 25,
                        duration: 0.35,
                        stagger: 0.08,
                        ease: "power2.out",
                    },
                        "-=0.25"
                    )
                    .from(closeRef.current, {
                        opacity: 0,
                        y: 20,
                        duration: 0.25,
                    }, "-=0.2");
            }
        })
    })
    const openMenu = () => {
        tlMenuRef.current?.play();
        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        tlMenuRef.current?.reverse();
        document.body.style.overflow = "";
    };

    const handleScrollTo = (selector) => (e) => {
        e.preventDefault();

        const target = document.querySelector(selector);
        if (!target) return;

        if (tlMenuRef.current && tlMenuRef.current.progress() > 0) {
            tlMenuRef.current.reverse();
            document.body.style.overflow = "";

        }
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 80,
            },
            ease: "power3.out",
        });
    }
    return (
        <>
            <button ref={btnRef} onClick={openMenu}><HoverWord text="Menu" /></button>
            <div ref={curtainRef}>
                <nav ref={navRef}>
                    <a href="#hero" onClick={handleScrollTo("#hero")} ><HoverWord text="Home" /></a>
                    <a href="#about" onClick={handleScrollTo("#about")}><HoverWord text="About" /></a>
                    <a href="#projects" onClick={handleScrollTo("#projects")}><HoverWord text="Projects" /></a>
                    <a href="#footer" onClick={handleScrollTo("#footer")}><HoverWord text="Contact" /></a>
                </nav>
                <button ref={closeRef} onClick={closeMenu}>✕</button>
            </div>
        </>

    );
}

export default Navbar;