import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';

const Footer = () => {
    const footerRef = useRef(null);
    const iconsRef = useRef([]);

    useEffect(() => {
        // Create a GSAP context for React
        let ctx = gsap.context(() => {
            // Animate the whole footer
            gsap.from(footerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out"
            });

            // Animate each text block
            gsap.from(".text-block", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });

            // Animate icons with bounce + stagger
            gsap.from(iconsRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.2
            });
        }, footerRef);

        return () => ctx.revert(); // cleanup on unmount
    }, []);

    return (
        <div ref={footerRef} className='container-fluid'>
            <div className="container flex sm:flex-row flex-col-reverse justify-between items-center pt-7">
                <div>
                    <p className='text-center'>© 2025 by Prins Usadadiya <br />
                        Powered and secured by..</p>
                </div>
                <div className="sm:w-[44%] flex sm:flex-row flex-col items-center sm:justify-between">
                    <div className='text-center text-block'>
                        <p className='text-[20px] font-bold'>Write</p>
                        <p className='text-[14px]'>prinsusadadiya210@gmail.com</p>
                    </div>
                    <div className='text-center text-block'>
                        <p className='text-[20px] font-bold'>Call</p>
                        <p className='text-[14px]'>+91 9510162453</p>
                    </div>
                    <div className='text-center text-block'>
                        <p className='text-[20px] font-bold'>Follow</p>
                        <div className='flex gap-3 justify-center'>
                            <a href='https://www.facebook.com/'>
                                <FontAwesomeIcon 
                                    icon={faFacebook} 
                                    className='icons cursor-pointer text-[black] hover:text-[#0000ffcf]' 
                                    ref={el => iconsRef.current[0] = el}
                                />
                            </a>
                            <a href='https://github.com/'>
                                <FontAwesomeIcon 
                                    icon={faGithub} 
                                    className='icons cursor-pointer text-[black]' 
                                    ref={el => iconsRef.current[1] = el}
                                />
                            </a>
                            <a href="">
                                <FontAwesomeIcon 
                                    icon={faLinkedin} 
                                    className='icons cursor-pointer text-[black] hover:text-[#0000ffcf]' 
                                    ref={el => iconsRef.current[2] = el}
                                />
                            </a>
                            <a href="https://www.instagram.com/_.prins.__1506/?igsh=aGhzNWt5YzRsM2gy#">
                                <FontAwesomeIcon 
                                    icon={faInstagram} 
                                    className='icons cursor-pointer text-[black] hover:text-[#E1306C]' 
                                    ref={el => iconsRef.current[3] = el}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
