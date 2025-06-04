import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    toggleActions: 'play none none reverse',
                }
            });

            titleAnimation.to('.animated-word', {
                opacity: 1,
                transform: 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)',
                ease: 'power2.inOut',
                stagger: 0.02,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`animated-title ${containerClass || ''}`}>
            {title.split('<b>').map((line, index) => (
                <div className='max-w-full flex-center'>
                <div key={index} className='flex-center w-1/2 flex-wrap gap-2 px-10 md:gap-3'>
                    {line.split(' ').map((word, i) => (
                        <span
                            key={i}
                            className='animated-word'
                            // style={{ opacity: 0, display: 'inline-block', transition: 'opacity 0.3s' }}
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;