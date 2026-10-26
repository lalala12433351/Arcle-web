import { useEffect, useRef } from "react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const useScrollAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const owned: ScrollTrigger[] = [];

        const clearOwned = () => {
            owned.forEach((trigger) => trigger.kill());
            owned.length = 0;
        };

        const handleResize = () => {
            clearOwned();
            if (window.innerWidth <= 1023) return;

            const textElements = gsap.utils.toArray<HTMLElement>('.text');
            textElements.forEach(text => {
                const tween = gsap.to(text, {
                    backgroundSize: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: text,
                        start: 'center 100%',
                        end: 'center 50%',
                        scrub: true,
                    },
                });
                if (tween.scrollTrigger) owned.push(tween.scrollTrigger);
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearOwned();
        };
    }, []);

    return containerRef;
};

export default useScrollAnimation;
