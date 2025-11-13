import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Animate navbar on mount
  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  // Animate mobile menu safely
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  return (
    <div ref={navbarRef} className="w-full fixed top-0 left-0 bg-white z-30 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <li className="list-[square] list-inside text-[blue] text-[35px]">
          <Link to="/">
            <button className="text-2xl md:text-4xl font-bold no-underline text-black">
              Prins Usadadiya
            </button>
          </Link>
        </li>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-[40%] justify-between">
          <Link
            to="/"
            className={` line ${isActive('/') ? 'text-blue-600' : 'text-black'} hover:text-blue-600`}
          >
            ABOUT ME
          </Link>
          <Link
            to="/resume"
            className={` line ${isActive('/resume') ? 'text-blue-600' : 'text-black'} hover:text-blue-600`}
          >
            RESUME
          </Link>
          <Link
            to="/project"
            className={`line ${isActive('/project') ? 'text-blue-600' : 'text-black'} hover:text-blue-600`}
          >
            PROJECTS
          </Link>
          <Link
            to="/contact"
            className={`line ${isActive('/contact') ? 'text-blue-600' : 'text-black '} hover:text-blue-600`}
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl text-black focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="6" y1="7" x2="14" y2="7" strokeLinecap="round" />
              <line x1="10" y1="12" x2="18" y2="12" strokeLinecap="round" />
              <line x1="6" y1="17" x2="14" y2="17" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
   {isOpen && (
  <div
    ref={mobileMenuRef}
    className="fixed top-0 left-0 w-screen h-screen bg-[#f4ece6] z-[999] flex flex-col justify-center items-center space-y-8 transition-all duration-300"
  >
    {/* 🔙 Big Close Button */}
    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-6 right-8 text-[80px] leading-none font-bold text-gray-800 hover:text-black transition-transform duration-300 hover:scale-110"
    >
     <b className='text-[40px]'>×</b> 
    </button>

    {/* Menu Links */}
    <Link onClick={() => setIsOpen(false)} to="/" className='line text-2xl font-semibold'>
      ABOUT ME
    </Link>
    <Link onClick={() => setIsOpen(false)} to="/resume" className='line text-2xl font-semibold'>
      RESUME
    </Link>
    <Link onClick={() => setIsOpen(false)} to="/project" className='line text-2xl font-semibold'>
      PROJECTS
    </Link>
    <Link onClick={() => setIsOpen(false)} to="/contact" className='line text-2xl font-semibold'>
      CONTACT
    </Link>
  </div>
)}

    </div>
  );
};

export default Navbar;
