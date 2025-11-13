import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { educationdetail, resumedetail } from './Resumedata';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
    // Refs for the main sections to animate
    const experienceRef = useRef(null);
    const educationRef = useRef(null);
    const skillsRef = useRef(null);
    const resumeBoxesRef = useRef([]);
    const educationBoxesRef = useRef([]);

    // Clear refs before each render phase (important for arrays in map)
    resumeBoxesRef.current = [];
    educationBoxesRef.current = [];

    // Helper functions to add ref to the arrays
    const addToResumeRefs = (el) => {
        if (el) {
            resumeBoxesRef.current.push(el);
        }
    };

    const addToEducationRefs = (el) => {
        if (el) {
            educationBoxesRef.current.push(el);
        }
    };
    
    // useLayoutEffect for GSAP animations to run before browser paint
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // --- Main Heading Animation (Runs once on load) ---
            gsap.from(".resume-title-item", {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3, 
            });

            // 1. Experience Section Title
            if (experienceRef.current) {
                gsap.from(experienceRef.current.children, { 
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: experienceRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });
            }

            // 2. Animate individual resume boxes (Alternating Slide-In - Kept clean)
            resumeBoxesRef.current.forEach((box, i) => {
                const isEven = i % 2 === 0;
                
                gsap.set(box, { opacity: 0, x: isEven ? -200 : 200 });
                
                gsap.to(box, {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                });
            });


            // 3. Education Section Title
            if (educationRef.current) {
                gsap.from(educationRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: educationRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });
            }

            // 4. Animate individual education boxes (Alternating Slide-In - Kept clean)
            educationBoxesRef.current.forEach((box, i) => {
                const isEven = i % 2 === 0;
                
                gsap.set(box, { opacity: 0, x: isEven ? -200 : 200 });
                
                gsap.to(box, {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                });
            });


            // 5. Advanced Skills Section Animation (Staggered Scale-In)
            if (skillsRef.current) {
                // Animate the whole skills box container (fade up slightly)
                gsap.from(skillsRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    }
                });
                
                // Animate all the list items inside the skills box
                // We target all <li> elements within the skillsRef container
                gsap.from(skillsRef.current.querySelectorAll('li'), {
                    scaleX: 0, // Start scaled horizontally to 0 (hidden)
                    opacity: 0,
                    transformOrigin: "left center", // Ensure scaling starts from the left edge
                    duration: 0.8,
                    stagger: 0.08, // Small delay between each skill item
                    ease: "back.out(1.7)", // Fun, springy effect
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 60%", // Start the skill animation once the skills box is fully visible
                        toggleActions: "play none none none",
                    }
                });
            }
        });

        // Cleanup function for GSAP context
        return () => ctx.revert(); 
    }, []);

    
    return (
        <>
            <Navbar />

            <div className='bg-[#e6dace] pt-[270px] pb-[90px]'>
                <div className=' text-[30px] font-bold text-center '>
                    <li className='list-[square] list-inside text-[blue] text-[35px] resume-title-item'>
                        <span className='text-black'>Resume</span>
                    </li>
                </div>

                <div className="container-small pt-[90px]">
                    
                    {/* --- Experience Section --- */}
                    <div ref={experienceRef} className='flex items-center justify-between'>
                        <p className='text-[30px] font-bold'>Experience</p>
                        <a href="Prins_Usadadiya Resume.pdf"
                            download className='mt-3 px-4 py-2 btn1'>DOWNLOAD CV</a>
                    </div>

                    {/* Experience boxes (Alternating slide-in from left/right) */}
                    {
                        resumedetail.map((v, i) => {
                            return (
                                <div key={`exp-${i}`} ref={addToResumeRefs} className="box1 bg-white sm:h-[350px] sm:w-[670px] mt-15 shadow-lg shadow-black">
                                    <div className="sm:flex py-[20px] sm:py-[0px]">
                                        <div>
                                            <p className='text-[25px] font-bold text-[blue] px-[20px] sm:ps-5 sm:pt-[80px]'>{v.title}</p>
                                            <p className='px-[20px] sm:ps-5 text-[15px]'><b>{v.position}</b></p>
                                            <p className='px-[20px] sm:ps-5 text-[15px]'>{v.cname}</p>
                                            <p className='text-[10px] px-[20px] sm:ps-5'>{v.duration}</p>
                                        </div>
                                        <div className="sm:ps-5 px-[20px] sm:pt-[130px] sm:w-[65%] sm:pe-[30px]">
                                            <p>{v.resumeinfo}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* --- Education Section --- */}
                    <div ref={educationRef} className='text-[30px] font-bold container-small pt-[90px]'>Education</div>

                    {/* Education boxes (Alternating slide-in from left/right) */}
                    {
                        educationdetail.map((v, i) => {
                            return (
                                <div key={`edu-${i}`} ref={addToEducationRefs} className="box1 bg-white sm:h-[350px] sm:w-[670px] mt-15 shadow-lg shadow-black">
                                    <div className="sm:flex py-[20px] sm:py-[0px]">
                                        <div>
                                            <p className='text-[25px] font-bold text-[blue] ps-[20px] sm:ps-5 sm:pt-[80px]'>{v.clgtitle}</p>
                                            <p className='ps-[20px] sm:ps-5 text-[15px]'>{v.universatyname}</p>
                                            <p className='text-[10px] ps-[20px] sm:ps-5'>{v.degree}</p>
                                            <p className='text-[10px] ps-[20px] sm:ps-5'>{v.universatylocation}</p>
                                        </div>
                                        <div className="px-[20px] sm:ps-2 sm:pt-[130px] sm:w-[45%] sm:ms-[50px]">
                                            <p>{v.uniinfo}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                    {/* --- Skills Section --- */}
                    {/* The list items within this box will have the new animation */}
                    <div ref={skillsRef} className="box1 bg-white sm:h-[500px] sm:w-[670px] mt-15 shadow-lg shadow-black pb-[30px]">
                        <p className='text-[25px] font-bold ps-5 pt-[40px] '>
                            Skills</p>

                        <div className="flex sm:w-[70%] flex-wrap">
                            <div>
                                {/* Targeting these <li> elements for staggered scaleX animation */}
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5'><span className='text-black text-[13px]'>Html</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>CSS</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>Javascript</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>Bootstrap</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>TailwindCSS</span></li>
                            </div>

                            <div>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 '><span className='text-black text-[13px]'>React.JS</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>Express.JS</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>Node.JS</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[5px]'><span className='text-black text-[13px]'>MongoDb</span></li>
                            </div>
                        </div>


                        <br />
                        <p className='text-[25px] font-bold ps-5'>
                            Soft Skill</p>

                        <div className="flex w-[70%] flex-wrap">
                            <div>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5'><span className='text-black text-[13px]'>Communication Skills</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[10px]'><span className='text-black text-[13px]'>Teamwork</span></li>
                            </div>

                            <div>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5'><span className='text-black text-[13px]'>Quick Learning</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5 pt-[10px]'><span className='text-black text-[13px]'>Time Management</span></li>
                            </div>
                        </div>

                        <p className='text-[25px] font-bold ps-5 pt-[20px]'>
                            Languages</p>
                        <div>
                            <div className='flex flex-wrap'>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5'><span className='text-black text-[13px]'>Gujrati (native)</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5'><span className='text-black text-[13px]'>Hindi</span></li>
                                <li className='list-[square] list-inside text-[blue] text-[15px] ps-5'><span className='text-black text-[13px]'>English</span></li>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            <Footer />
        </>
    )
}

export default Resume;