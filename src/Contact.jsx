import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import "./Contact.css";


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {

    const titleRef = useRef(null);
    const formContainerRef = useRef(null);
    const formFieldsRef = useRef([]); 
    const sendButtonRef = useRef(null);

    let [formdata, setFormdata] = useState({
        name: "",
        lname: "",
        email: "",
        sub: "",
        message: ""
    });

    let changeInput = (event) => {
        setFormdata(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    let send = (event) => {
        event.preventDefault();
        
        const { name, lname, email, sub, message } = formdata;

        if (name === '' || lname === '' || email === '' || sub === '' || message === '')
        {
            alert("Some Data is not Found. Please fill all required fields.");
        } else
        {
            console.log("Form submitted:", formdata);
            alert("Form submitted successfully! (Note: Actual submission is disabled in this demo)"); 
            
            setFormdata({
                name: "",
                lname: "",
                email: "",
                sub: "",
                message: ""
            });
        }
    };

    const addToFieldsRef = (el) => {
        if (el) {
            formFieldsRef.current.push(el);
        }
    };


    // --- GSAP ANIMATION LOGIC ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            gsap.from(titleRef.current.parentElement, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3,
            });

            gsap.set(formContainerRef.current, { 
                opacity: 0, 
                scale: 0.8,
                rotationX: 15, 
                transformPerspective: 1000,
            });

            const mainFormTL = gsap.timeline({
                scrollTrigger: {
                    trigger: formContainerRef.current,
                    start: "top 90%", 
                    toggleActions: "play none none none",
                }
            });

            mainFormTL.to(formContainerRef.current, {
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                ease: "power3.out",
            });

            gsap.set(formFieldsRef.current, { 
                opacity: 0, 
                scale: 0.5,
                transformOrigin: "center center", 
            });

            mainFormTL.to(formFieldsRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.1, 
                ease: "back.out(1.2)", 
            }, "-=0.5");

            gsap.from(sendButtonRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power2.out",
                delay: 2, 
                scrollTrigger: {
                    trigger: formContainerRef.current,
                    start: "top 70%", 
                    toggleActions: "play none none none",
                }
            });

        });

        return () => ctx.revert(); 
    }, []);


    return (
        <>
            <Navbar />
            <div className="container-fluid bg-[#E6DACE] pb-[100px]">
                <div className='flex justify-center items-center py-[70px]'>
                    <li className='list-[square] text-[blue] text-[54px] pt-[100px]' ref={titleRef}></li>
                    <span className='text-[38px] text-black font-bold pt-[100px]'>Let's talk</span>
                </div>
                
                {/* Form Container */}
                <div ref={formContainerRef} className="container-small py-[70px] px-[40px] bg-white">
                    <form onSubmit={send} className='font-bold text-[14px]'> 
                        
                        {/* Frist row */}
                        <div ref={addToFieldsRef} className="flex flex-col sm:flex-row justify-between">
                            <div className='sm:w-[45%] sm:ps-[20px]'>
                                <label htmlFor="name">Frist Name*</label>
                                <br /><br />
                                <input 
                                    type="text" 
                                    className='input1 w-[100%]' 
                                    name='name' 
                                    value={formdata.name} 
                                    onChange={changeInput} 
                                />
                            </div>
                            <div className='sm:w-[45%] pt-[20px] sm:pe-[20px] sm:py-[0px]'>
                                <label htmlFor="lname">Last Name*</label>
                                <br /><br />
                                <input 
                                    type="text" 
                                    className='input1 w-[100%]' 
                                    name="lname" 
                                    value={formdata.lname} 
                                    onChange={changeInput} 
                                />
                            </div>
                        </div>
                        <br />
                        
                        {/* Email Row */}
                        <div ref={addToFieldsRef} className='sm:px-[20px]'>
                            <label htmlFor="email">Email*</label>
                            <br /><br />
                            <input 
                                type="Email" 
                                className='input1 w-[100%]' 
                                name="email" 
                                value={formdata.email} 
                                onChange={changeInput} 
                            />
                        </div>
                        <br />
                        
                        {/* Subject Row */}
                        <div ref={addToFieldsRef} className='sm:px-[20px]'>
                            <label htmlFor="sub">Subject*</label>
                            <br /><br />
                            <input 
                                type="text" 
                                className='input1 w-[100%]' 
                                name="sub" 
                                value={formdata.sub} 
                                onChange={changeInput} 
                            />
                        </div>
                        <br />
                        
                        {/* Message Row */}
                        <div ref={addToFieldsRef} className='sm:px-[20px]'>
                            <label htmlFor="message">Message*</label>
                            <br /><br />
                            <textarea 
                                className='input1 w-[100%]' 
                                name="message" 
                                value={formdata.message} 
                                onChange={changeInput}>
                            </textarea>
                        </div>
                        <br />
                        
                        {/* Send Button */}
                        <button className='btn1' ref={sendButtonRef} type="submit">Send</button> 
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact;