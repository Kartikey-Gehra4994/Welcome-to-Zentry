import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus', 'About', 'Contact', 'Vault', 'Prologue']

const Navbar = () => {

    const [isAudioPlaying, setisAudioPlaying] = useState(false)
    const [isIndicatorActive, setisIndicatorActive] = useState(false)
    const [lastscrollY, setlastscrollY] = useState(0);
    const [isNavVisible, setisNavVisible] = useState(true);

    const navcontainerRef = useRef(null);

    const audioElementRef = useRef(null);

    const { y: currentScrolly } = useWindowScroll();

    useEffect(() => {
        if (currentScrolly === 0) {
            setisNavVisible(true);
            navcontainerRef.current.classList.remove('floating-nav');
        } else if (currentScrolly > lastscrollY) {
            setisNavVisible(false);
            navcontainerRef.current.classList.add('floating-nav');
        } else if (currentScrolly < lastscrollY) {
            setisNavVisible(true);
            navcontainerRef.current.classList.add('floating-nav');
        }

        setlastscrollY(currentScrolly);
    }, [currentScrolly,lastscrollY]);

    useEffect(() => {
        gsap.to(navcontainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavVisible])

    const toggleAudioIndicator = () => {
        setisAudioPlaying((prev) => !prev);

        setisIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying])

    return (
        <div ref={navcontainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        <img src="/img/logo.png" alt="logo" className='w-10' />
                        <Button
                            id='product-button'
                            title='Products'
                            rightIcon={<TiLocationArrow />}
                            containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
                        />
                    </div>
                    <div className='flex h-full items-center'>
                        <div className='hidden md:block'>
                            {navItems.map((item, index) => (
                                <a href={`#${item.toLowerCase()}`} key={index} className='nav-hover-btn'>{item}</a>
                            ))}
                        </div>

                        <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                            <audio
                                ref={audioElementRef}
                                className='hidden'
                                src="/audio/loop.mp3"
                                loop />
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{ animationDelay: `${i * 0.1}s` }} />

                            ))}
                        </button>

                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar