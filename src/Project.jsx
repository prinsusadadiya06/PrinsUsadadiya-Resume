import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { pr1 } from './Projectdata';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Project = () => {
    
    // Ref for the main heading
    const mainTitleRef = useRef(null); 
    // Array to store refs for all project box containers
    const projectContainersRef = useRef([]);

    // Clear ref array before rendering
    projectContainersRef.current = [];

    // Helper function to add ref to the array during map
    const addToProjectRefs = (el) => {
        if (el) {
            projectContainersRef.current.push(el);
        }
    };
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // --- Global Styles: Prevent content jump by hiding animated items initially ---
            // Hide the main heading and the info paragraph
            gsap.set([mainTitleRef.current, ".project-info-text"], { opacity: 0, y: 30 });

            // --- Main Heading Animation (Runs once on load) ---
            gsap.to([mainTitleRef.current, ".project-info-text"], {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1,
                delay: 0.3,
            });

            // --- Individual Project Box Animations (3D Tilt and Lift) ---
            projectContainersRef.current.forEach((container) => {

                // Set initial state: transparent, tilted back (rotationX), lifted back (z), and slightly low (y)
                gsap.set(container, {
                    opacity: 0,
                    rotationX: 90, // Tilted 90 degrees backward (hidden)
                    transformPerspective: 1000, // Necessary for 3D effects
                    z: -200, // Pushed 200px back in the z-axis
                    y: 50, // Starts 50px below final position
                });

                // Animate to final state: flat, no z-depth, full opacity, and final position
                gsap.to(container, {
                    opacity: 1,
                    rotationX: 0, // Rotates to flat position
                    z: 0, // Brings it forward to the plane
                    y: 0, // Lifts it to the final vertical position
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 90%", // Start animation slightly earlier
                        toggleActions: "play none none none",
                    }
                });
            });
        });

        // Cleanup function for GSAP context
        return () => ctx.revert(); 
    }, []);

    return (
        <>
            <Navbar />

            <div className='bg-[#e6dace] sm:pt-[170px] pt-[40px] sm:pb-[80px]'>
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
                        // Assign ref to the parent container div
                        <div key={i} ref={addToProjectRefs} className="flex justify-center sm:pt-[65px] sm:mb-[0px] mb-[60px]">
                            <div className='sm:w-[750px] sm:h-[400px] sm:flex'>
                                
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
                                <div className='bg-gray-300 sm:w-[40%] h-[300px] sm:h-[100%] overflow-y-scroll' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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