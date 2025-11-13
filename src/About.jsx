import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import MyImg from "../img/myimg.JPG";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const About = () => {
  const profileRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const socialRef = useRef([]);

  socialRef.current = [];

  const addToSocialRefs = (el) => {
    if (el && !socialRef.current.includes(el)) {
      socialRef.current.push(el);
    }
  };

  useEffect(() => {
    // 1. **Set Initial States (Crucial for refresh fix)**
    // Instantly set the elements to their start positions/opacity before the animation runs
    gsap.set(profileRef.current, { x: -200, opacity: 0 });
    gsap.set(imgRef.current, { scale: 0, opacity: 0 });
    gsap.set(textRef.current, { x: 200, opacity: 0 });
    gsap.set(socialRef.current, { y: 20, opacity: 0 });
    // Assuming the buttons start at y: 10, opacity: 0
    if (buttonContainerRef.current) {
        gsap.set(buttonContainerRef.current.children, { y: 10, opacity: 0 });
    }


    // 2. **Run the Timeline Animation**
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(profileRef.current, { x: 0, opacity: 1, duration: 1 }) // Animate to final state
      .to(
        imgRef.current,
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .to(textRef.current, { x: 0, opacity: 1, duration: 1 }, "-=0.7")
      .to(
        buttonContainerRef.current.children,
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        socialRef.current,
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      );
    
    // NOTE: I changed .from() to .to() because we are now setting the start state 
    // explicitly with gsap.set(). Using .to() with the final state (x: 0, opacity: 1)
    // is often cleaner when initial states are pre-set.

  }, []);

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="bg-[#e6dace] sm:w-[45%] w-[100%] sm:h-[800px] mt-2 relative">
          <div className="sm:w-[120%] h-[600px] sm:absolute right-[-510px] top-[100px] sm:flex pt-[90px]">
            {/* Profile Card */}
            <div
              ref={profileRef}
              className="sm:w-[45%] sm:h-[100%] pt-[20px] sm:pt-[0px]"
            >
              <div className="h-[90%] mx-[30px] sm:mx-[0px] pt-[10px] bg-[#f4ece6] flex flex-col items-center justify-between shadow-[-4px_0_10px_rgba(0,0,0,0.3)]">
                <div>
                  <img ref={imgRef} src={MyImg} className="myimg" alt="Profile" />
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="fw-bold text-center">
                    Prins <br /> Usadadiaya
                  </h2>
                </div>
                <div>
                  <p className="text-[20px]">MERN Stack Developer</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="h-[10%] mx-[30px] sm:mx-[0px] bg-white flex justify-center mt-3">
                <div className="flex items-center justify-between w-[60%]">
                  <a
                    href="#"
                    ref={addToSocialRefs}
                    className="cursor-pointer text-[black] hover:text-[#0000ffcf] transition-transform duration-300 hover:scale-125"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a
                    href="https://github.com/prinsusadadiya15"
                    ref={addToSocialRefs}
                    className="cursor-pointer text-[black] transition-transform duration-300 hover:scale-125"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prins-usadadiya-056553351"
                    ref={addToSocialRefs}
                    className="cursor-pointer text-[black] hover:text-[#0000ffcf] transition-transform duration-300 hover:scale-125"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a
                    href="https://www.instagram.com/_.prins.__1506/"
                    ref={addToSocialRefs}
                    className="cursor-pointer text-[black] hover:text-[#E1306C] transition-transform duration-300 hover:scale-125"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div
              ref={textRef}
              className="sm:w-[55%] w-[100%] sm:h-[100%] bg-[#e6dace] sm:bg-[white] px-[30px] pb-[50px] sm:pb-[0px] mt-5 font-bold text-[black]"
            >
              <h1 className="text-[80px]">Hello</h1>
              <p className="text-[25px] pt-3">Here's Who I am & what I do</p>
              {/* Button Container with new ref */}
              <div className="text-[15px] mt-8" ref={buttonContainerRef}> 
                <Link to={"/resume"}>
                  <button className="mt-3 px-4 py-2 btn1">RESUME</button>
                </Link>
                <Link to={"/project"}>
                  <button className="px-4 py-2 ms-3 btn2">PROJECT</button>
                </Link>
              </div>
              <div>
                <p className="text-[15px] pt-12 font-light">
                  I am Information and technology student. I consider myself a
                  responsible and orderly person. I am looking forward to my
                  first work experience.
                </p>
              </div>
              <div>
                <p className="text-[15px] font-light">
                  To be a professional and to utilize my skills and knowledge to
                  fulfill the requirements of the organization in customer
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:pt-[0px] pt-[530px]">
        <Footer />
      </div>
    </>
  );
};

export default About;