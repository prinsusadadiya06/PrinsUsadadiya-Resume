import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { pr1 } from './Projectdata';


gsap.registerPlugin(ScrollTrigger);

const Project = () => {
    
    const mainTitleRef = useRef(null); 
    const projectContainersRef = useRef([]);

   
    projectContainersRef.current = [];

    
    const addToProjectRefs = (el) => {
        if (el) {
            projectContainersRef.current.push(el);
        }
    };
    
useLayoutEffect(() => {
    const ctx = gsap.context(() => {

        gsap.set([mainTitleRef.current, ".project-info-text"], { 
            opacity: 0, 
            y: 30 
        });

        gsap.to([mainTitleRef.current, ".project-info-text"], {
            y: 0,
            opacity: 1,
            duration: 0.8, 
            ease: "power3.out",
            stagger: 0.1,
        });

        
        projectContainersRef.current.forEach((container) => {

            gsap.set(container, {
                opacity: 0,
                rotationX: 90,
                transformPerspective: 1000,
                z: -150,   
                y: 40,
            });

            gsap.to(container, {
                opacity: 1,
                rotationX: 0,
                z: 0,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%",  
                    toggleActions: "play none none none",
                }
            });
        });

    });

    return () => ctx.revert();
}, []);

    return (
        <>
            <Navbar />

           <div className='bg-[#e6dace] overflow-x-hidden sm:pt-[170px] pt-[40px] sm:pb-[80px]'>
                <div className=' text-[30px] font-bold text-center mt-[90px] '>
                    <li ref={mainTitleRef} className='list-[square] list-inside text-[blue] text-[35px]'>
                        <span className='text-black '>Projects</span>
                    </li>
                </div>

                <p className='text-center px-[20px] pt-[50px] sm:pb-[50px] pb-[20px] project-info-text'>
                    Crafting dynamic, responsive, and scalable website using the MERN stack. <br /> 
                    I focus on building seamless user experiences backed by efficient, secure, and modern backend systems.
                </p>

                {/* Project boxes container */}
                {pr1.map((v, i) => {
                    return (
                    
                        <div key={i} ref={addToProjectRefs} className="flex justify-center sm:pt-[65px] sm:mb-[0px] mb-[60px]">
                           <div className='w-full max-w-[750px] sm:h-[400px] sm:flex'>
                                
                                {/* Info Box */}
                                <div className='bg-white sm:w-[60%] sm:h-[100%] pb-[30px] shadow-lg shadow-black '>
                                    <div className='sm:pt-[0px] pt-[20px]'>
                                        <div className='bg-blue-600 h-[50px] w-[10px] sm:mt-[50px] '></div>
                                        <div className="flex">
                                            <p className='text-[20px] text-[blue] font-bold ps-8 title '>{v.title}</p>
                                        </div>
                                    </div>
                                    <p className='font-bold text-[13px] ps-[33px] title-1'>{v.role}</p>

                                    <p className='ps-4 w-[90%] pt-2.5'>{v.detail}</p>

                                    <a href={v.path} target="_blank" rel="noopener noreferrer">
                                        <button className='btn1'>{v.btn}</button>
                                    </a>
                                </div>
                                
                                {/* Image Box */}
                                <div className='bg-gray-300 sm:w-[40%] h-[300px] sm:h-[100%] overflow-y-scroll overflow-x-hidden' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    <img src={v.url} alt={`Screenshot of ${v.title}`} className='w-[100%]' />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </>
    );
}

export default Project;