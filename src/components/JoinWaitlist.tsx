import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';
import { XIcon } from './XIcon';
import { animate } from 'animejs';
import { ScribbledButton } from './ScribbledButton';
import { Fireworks } from './Fireworks';
import logo from '@/assets/bb1b0d23f9aefeb9ab0d7457ceff54537cc56471.png';

interface JoinWaitlistProps {
  onNavigate: (page: 'home' | 'waitlist' | 'partners' | 'nomination') => void;
}

const emailSuggestions: Record<string, string> = {
  'g': 'gmail.com',
  'y': 'yahoo.com',
  'v': 'vanderbilt.edu',
  'h': 'harvard.edu',
  's': 'stanford.edu',
  'c': 'columbia.edu',
  'm': 'mit.edu',
  'p': 'princeton.edu',
  'd': 'duke.edu',
  'n': 'northwestern.edu',
  'u': 'umich.edu',
  'b': 'berkeley.edu',
  't': 'tufts.edu',
  'r': 'rice.edu',
  'e': 'emory.edu',
  'a': 'arizona.edu',
  'w': 'washington.edu',
  'i': 'illinois.edu',
  'o': 'osu.edu',
  'f': 'fsu.edu',
  'k': 'ku.edu',
  'l': 'lsu.edu',
  'j': 'jhu.edu',

};

export function JoinWaitlist({ onNavigate }: JoinWaitlistProps) {
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isAnimatingEmail, setIsAnimatingEmail] = useState(false);
  const [animatedEmail, setAnimatedEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  const [quillPos, setQuillPos] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [showPen, setShowPen] = useState(false);
  const messageEndRef = useRef<HTMLSpanElement>(null);

  // Detect mobile keyboard visibility
  useEffect(() => {
    const handleResize = () => {
      // Check if visualViewport exists (modern browsers)
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        // If viewport is significantly smaller than window, keyboard is likely visible
        setIsKeyboardVisible(windowHeight - viewportHeight > 150);
      }
    };

    // Listen to visualViewport resize events
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    }

    // Also listen to focus events on the input
    const handleFocus = () => {
      // Small delay to let the keyboard animation start
      setTimeout(() => handleResize(), 300);
    };

    const handleBlur = () => {
      setIsKeyboardVisible(false);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  // Auto-redirect to home after 9.7 seconds on success
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onNavigate('home');
      }, 9700); // 9.7 seconds

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onNavigate]);

  // Typewriter effect for congratulatory message
  useEffect(() => {
    if (isSubmitted) {
      const message = "We've added your name in the stars.";
      setDisplayedMessage('');
      setShowPen(true);

      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= message.length) {
          setDisplayedMessage(message.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setShowPen(false), 500); // Hide pen after typing
        }
      }, 80); // Typing speed

      return () => clearInterval(typeInterval);
    }
  }, [isSubmitted]);

  const updateQuillPosition = (text: string) => {
    const tempSpan = document.createElement('span');
    tempSpan.className = "absolute opacity-0 pointer-events-none whitespace-pre text-3xl md:text-4xl";
    tempSpan.style.fontFamily = "'Caveat', cursive";
    tempSpan.innerText = text || ' ';
    document.body.appendChild(tempSpan);
    const width = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    setQuillPos(width);
  };

  useEffect(() => {
    const atIndex = email.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === email.length - 2) {
      const char = email[email.length - 1].toLowerCase();
      if (emailSuggestions[char]) {
        setSuggestion(`@${emailSuggestions[char]}`);
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }

    if (!isAnimatingEmail) {
      const caretPos = inputRef.current?.selectionStart || email.length;
      updateQuillPosition(email.substring(0, caretPos));
    }

    if (quillRef.current && email.length > 0) {
      animate(quillRef.current, {
        rotate: [-15, -20, -15],
        translateY: [0, -1, 0],
        duration: 80,
        ease: 'linear'
      });
    }
  }, [email, isAnimatingEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const startCinematicWrite = (fullEmail: string) => {
    setIsAnimatingEmail(true);
    setAnimatedEmail('');
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullEmail.length) {
        const currentText = fullEmail.slice(0, i);
        setAnimatedEmail(currentText);
        updateQuillPosition(currentText);

        if (quillRef.current) {
          animate(quillRef.current, {
            rotate: [-15, -25, -15],
            duration: 80
          });
        }
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsAnimatingEmail(false), 500);
      }
    }, 60);
  };

  const handleSuggestionClick = () => {
    if (suggestion) {
      const atIndex = email.lastIndexOf('@');
      const fullEmail = email.substring(0, atIndex) + suggestion;
      setEmail(fullEmail);
      setSuggestion('');
      startCinematicWrite(fullEmail);
    }
  };

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      // In a real app, submit to backend here
      console.log('Submitted:', email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#2a2420] overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-[#5a4334] to-transparent z-20 pointer-events-none" />

      {/* Static Background Frame */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #faf8f3 0%, #f5f1e8 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.03)'
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 600\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-[#d4e4f7]/30"
              style={{ top: `${(i + 1) * 2.5}%` }}
            />
          ))}
        </div>
        <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-[#f4a6a6]/25" />

        <div className="absolute top-0 right-20 md:right-32 w-8 md:w-10 h-32 md:h-40 z-20">
          <div
            className="w-full h-full bg-[#8b0000] shadow-[2px_5px_10px_rgba(0,0,0,0.3)] rounded-b-sm"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
              background: 'linear-gradient(to right, #8b0000, #b22222, #8b0000)'
            }}
          />
        </div>


      </div>

      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 z-50" style={{ pointerEvents: 'auto' }}>

        <a
          href="#"
          className="absolute top-6 left-6 md:left-12 pointer-events-auto no-underline group"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 bg-[#d8d4cf] border border-[#c5c0b8] px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <motion.img
              src={logo}
              alt="Erocras Logo"
              className="w-8 h-8 rounded-full object-cover"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
            />
            <div className="flex flex-col">
              <h1
                className="text-lg tracking-normal text-[#4a3b32] font-semibold"
                style={{
                  fontFamily: 'serif',
                }}
              >
                Erocras
              </h1>
            </div>
          </motion.div>
        </a>

        <div className="absolute top-7 right-6 md:right-12 pointer-events-auto pr-4 md:pr-0">
          <motion.p
            className="text-lg md:text-xl whitespace-nowrap text-right"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#5e460aff', // Goldenrod
              fontWeight: 700,
              transform: 'rotate(-2deg)'
            }}
            animate={{
              textShadow: [
                "0 0 4px #ffd700",
                "0 0 12px #ffeda0",
                "0 0 4px #ffd700"
              ],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Coming Soon on<br />12 August, 2026
          </motion.p>
        </div>

        <div
          className="absolute md:top-6 md:right-48 right-0 left-0 top-20 flex md:justify-end justify-center md:pr-4 z-[60]"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex gap-2 md:gap-4 scale-90 md:scale-100">
            <a
              href="#"
              style={{ pointerEvents: 'auto' }}
              className="cursor-pointer no-underline"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <ScribbledButton text="Return Home" onClick={() => onNavigate('home')} />
              </motion.div>
            </a>
            <a
              href="#"
              style={{ pointerEvents: 'auto' }}
              className="cursor-pointer no-underline"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('partners');
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, -3, 3, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <ScribbledButton text="Our Partners" onClick={() => onNavigate('partners')} />
              </motion.div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center z-10 pointer-events-none"
        style={{ paddingLeft: '16%', paddingRight: '16%', paddingTop: '6rem', paddingBottom: '6rem' }}
      >

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full flex flex-col items-center pointer-events-auto"
            >
              <h1
                className="mb-8 md:mb-16 text-center w-full"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#2d2d2d',
                  fontSize: 'clamp(1.3rem, 3.6vw, 2.7rem)'
                }}
              >
                Enter school or personal email to join the waitlist
              </h1>

              <div
                className={`relative group w-full transition-transform duration-300 ease-out ${isKeyboardVisible ? '-translate-y-32 md:-translate-y-0' : ''}`}
                style={{ pointerEvents: 'auto' }}
              >
                <div className="relative flex items-center h-24" style={{ pointerEvents: 'auto' }}>

                  <div className="relative w-full" style={{ pointerEvents: 'auto' }}>
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="erocras@abc.edu"
                      className="w-full bg-transparent border-none outline-none py-2 relative pointer-events-auto z-10"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        color: '#2d1e14',
                        caretColor: '#2d1e14',
                        fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)',
                      }}
                      autoFocus
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2d1e14]/10" />
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="ml-4 md:ml-8 p-3 md:p-4 bg-[#2d1e14] text-[#faf8f3] rounded-full shadow-lg shrink-0"
                  >
                    <ArrowRight size={24} className="md:w-8 md:h-8" />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {suggestion && !isAnimatingEmail && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={handleSuggestionClick}
                      className="mt-6 text-xl md:text-2xl opacity-40 hover:opacity-100 transition-all font-cursive italic"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      Tap to auto-scribe {suggestion}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center justify-center text-center pointer-events-auto"
            >
              <div className="relative mb-8 md:mb-12">
                <h2
                  className="relative"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: '#2d2d2d',
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    textShadow: '0 0 20px rgba(255,215,0,0.3)'
                  }}
                >
                  {displayedMessage}
                  <span ref={messageEndRef} />
                </h2>

                {/* 3D Pencil Animation */}
                <AnimatePresence>
                  {false && showPen && (
                    <motion.div
                      initial={{ opacity: 0, rotateY: -45, rotateX: 20 }}
                      animate={{
                        opacity: 1,
                        rotateY: 0,
                        rotateX: 0,
                        rotateZ: [0, -2, 2, 0]
                      }}
                      exit={{ opacity: 0, rotateY: 45 }}
                      transition={{
                        rotateZ: {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }}
                      className="absolute pointer-events-none"
                      style={{
                        width: '150px',
                        height: '150px',
                        left: messageEndRef.current?.offsetLeft || 0,
                        top: messageEndRef.current?.offsetTop || 0,
                        marginTop: '-170px',
                        marginLeft: '-50px',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                        zIndex: 100
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          transformStyle: 'preserve-3d',
                          transform: 'rotateX(30deg) rotateY(-25deg) rotateZ(45deg)',
                        }}
                      >
                        {/* Hexagonal Pencil Body - 6 sides for realistic 3D */}
                        <div style={{
                          position: 'absolute',
                          width: '12px',
                          height: '120px',
                          transformStyle: 'preserve-3d',
                          left: '50%',
                          top: '15%',
                          transformOrigin: 'center center'
                        }}>
                          {/* Create 6 faces of hexagonal pencil */}
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: i % 2 === 0
                                  ? 'linear-gradient(to bottom, #1a1a1a 0%, #2a2a2a 30%, #3a3a3a 50%, #2a2a2a 70%, #1a1a1a 100%)'
                                  : 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 30%, #2a2a2a 50%, #1a1a1a 70%, #0a0a0a 100%)',
                                transform: `rotateY(${i * 60}deg) translateZ(6px)`,
                                borderLeft: '0.5px solid rgba(0,0,0,0.3)',
                                borderRight: '0.5px solid rgba(255,255,255,0.1)',
                                boxShadow: 'inset 0 0 2px rgba(255,255,255,0.1)'
                              }}
                            />
                          ))}

                          {/* Top hexagonal cap */}
                          <div style={{
                            position: 'absolute',
                            width: '12px',
                            height: '12px',
                            background: 'radial-gradient(circle, #3a3a3a 0%, #1a1a1a 100%)',
                            top: '-6px',
                            left: '-50%',
                            transform: 'rotateX(90deg)',
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                          }} />
                        </div>

                        {/* Wooden Sharpened Tip - Cone Shape */}
                        <div style={{
                          position: 'absolute',
                          width: '0',
                          height: '0',
                          left: '50%',
                          top: 'calc(15% + 120px)',
                          transformStyle: 'preserve-3d',
                          zIndex: 5
                        }}>
                          {/* Create 6 triangular wooden faces for cone */}
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={`cone-${i}`}
                              style={{
                                position: 'absolute',
                                width: '0',
                                height: '0',
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: i % 2 === 0
                                  ? '35px solid #d2a679'  // Lighter wood
                                  : '35px solid #c49a6c', // Darker wood
                                transformOrigin: 'top center',
                                transform: `rotateY(${i * 60}deg) rotateX(-90deg) translateZ(6px) translateY(-35px)`,
                                filter: i === 0 || i === 1
                                  ? 'brightness(1.1)'
                                  : i === 3 || i === 4
                                    ? 'brightness(0.7)'
                                    : 'brightness(0.9)',
                                boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.2)'
                              }}
                            />
                          ))}

                          {/* Wood grain detail lines on cone */}
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={`grain-${i}`}
                              style={{
                                position: 'absolute',
                                width: '1px',
                                height: `${25 - i * 5}px`,
                                background: 'rgba(139, 90, 43, 0.3)',
                                left: `${-4 + i * 3}px`,
                                top: `${8 + i * 4}px`,
                                transform: 'rotateZ(-2deg)',
                                opacity: 0.4
                              }}
                            />
                          ))}
                        </div>

                        {/* Exposed Graphite Lead - The actual writing tip */}
                        <div style={{
                          position: 'absolute',
                          width: '4px',
                          height: '22px',
                          left: 'calc(50% - 2px)',
                          top: 'calc(15% + 133px)',
                          background: 'linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 30%, #1a1a1a 60%, #000 100%)',
                          clipPath: 'polygon(50% 100%, 100% 0%, 0% 0%)',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                          zIndex: 10,
                          transformStyle: 'preserve-3d'
                        }}>
                          {/* Graphite shine/highlight */}
                          <div style={{
                            position: 'absolute',
                            width: '1px',
                            height: '50%',
                            left: '30%',
                            top: '10%',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                            filter: 'blur(0.3px)'
                          }} />

                          {/* Ultra-sharp writing point */}
                          <div style={{
                            position: 'absolute',
                            width: '1.5px',
                            height: '1.5px',
                            background: '#000',
                            borderRadius: '50%',
                            bottom: '-0.5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.9)'
                          }} />
                        </div>

                        {/* Transition ring between body and sharpened area */}
                        <div style={{
                          position: 'absolute',
                          width: '13px',
                          height: '3px',
                          left: 'calc(50% - 6.5px)',
                          top: 'calc(15% + 119px)',
                          background: 'linear-gradient(to right, #1a1a1a, #2a2a2a, #1a1a1a)',
                          borderRadius: '50%',
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.1)',
                          zIndex: 4
                        }} />

                        {/* Eraser (optional) */}
                        <div style={{
                          position: 'absolute',
                          width: '14px',
                          height: '18px',
                          left: 'calc(50% - 7px)',
                          top: 'calc(15% - 18px)',
                          background: 'linear-gradient(135deg, #d4a5a5 0%, #ffb6c1 50%, #d4a5a5 100%)',
                          borderRadius: '3px 3px 0 0',
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                          {/* Metal ferrule */}
                          <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '5px',
                            bottom: '-5px',
                            background: 'linear-gradient(to right, #a8a8a8, #e8e8e8, #a8a8a8)',
                            borderRadius: '2px',
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.4)'
                          }} />
                        </div>

                        {/* Ground shadow */}
                        <div style={{
                          position: 'absolute',
                          width: '80px',
                          height: '25px',
                          left: 'calc(50% - 40px)',
                          top: 'calc(15% + 165px)',
                          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)',
                          borderRadius: '50%',
                          transform: 'rotateX(90deg) translateZ(-10px)',
                          filter: 'blur(4px)'
                        }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={() => onNavigate('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 px-8 md:px-12 py-3 md:py-4 rounded-full shadow-lg transition-all duration-300 text-base md:text-xl tracking-widest border border-[#b8962e] cursor-pointer"
                style={{
                  fontFamily: 'Georgia, serif',
                  backgroundColor: '#d4af37',
                  color: '#2d1e14',
                  fontWeight: 'bold'
                }}
              >
                MORE STORIES
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[5] pointer-events-auto"
          >
            <Fireworks />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (Moved out for z-index accessibility) */}
      <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-4 md:px-16 pl-[4.5rem] md:pl-32 z-30 pointer-events-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4">
            <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Facebook">
              <Facebook className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
            </motion.a>
            <motion.a href="https://x.com/elonmusk" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="X (formerly Twitter)">
              <XIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
            </motion.a>
            <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
            </motion.a>
            <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Instagram">
              <Instagram className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
            </motion.a>
            <motion.a href="mailto:contact@erocras.com" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Email">
              <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
            </motion.a>
          </div>
          <p className="text-xs md:text-sm opacity-40 text-center" style={{ fontFamily: "'Caveat', cursive", color: '#4a4a4a' }}>
            © 2025 Erocras
          </p>
        </div>
      </div>
    </div >
  );
}
