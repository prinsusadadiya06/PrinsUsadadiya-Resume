import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';

const Footer = () => {
    const footerRef = useRef(null);
    const iconsRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {

            gsap.from(footerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out"
            });

            gsap.from(".text-block", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });

            gsap.from(iconsRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.2
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={footerRef} className='container-fluid px-3 sm:px-0'>
            <div className="container flex flex-col-reverse sm:flex-row justify-between items-center gap-6 sm:gap-0 pt-7">

                {/* LEFT */}
                <div>
                    <p className='text-center text-[13px] sm:text-[14px] leading-relaxed'>
                        © 2025 by Prins Usadadiya <br />
                        Powered and secured by..
                    </p>
                </div>

                {/* RIGHT */}
                <div className="w-full sm:w-[44%] flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">

                    <div className='text-center text-block'>
                        <p className='text-[18px] sm:text-[20px] font-bold'>Write</p>
                        <p className='text-[13px] sm:text-[14px] break-all'>
                            prinsusadadiya210@gmail.com
                        </p>
                    </div>

                    <div className='text-center text-block'>
                        <p className='text-[18px] sm:text-[20px] font-bold'>Call</p>
                        <p className='text-[13px] sm:text-[14px]'>
                            +91 9510162453
                        </p>
                    </div>

                    <div className='text-center text-block'>
                        <p className='text-[18px] sm:text-[20px] font-bold'>Follow</p>

                        <div className='flex gap-4 justify-center mt-2 flex-wrap'>
                            <a href='https://www.facebook.com/'>
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className='icons cursor-pointer text-[18px] sm:text-[20px] text-black hover:text-[#0000ffcf]'
                                    ref={el => iconsRef.current[0] = el}
                                />
                            </a>

                            <a href='https://github.com/'>
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    className='icons cursor-pointer text-[18px] sm:text-[20px] text-black'
                                    ref={el => iconsRef.current[1] = el}
                                />
                            </a>

                            <a href="">
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className='icons cursor-pointer text-[18px] sm:text-[20px] text-black hover:text-[#0000ffcf]'
                                    ref={el => iconsRef.current[2] = el}
                                />
                            </a>

                            <a href="https://www.instagram.com/_.prins.__1506/?igsh=aGhzNWt5YzRsM2gy#">
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className='icons cursor-pointer text-[18px] sm:text-[20px] text-black hover:text-[#E1306C]'
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