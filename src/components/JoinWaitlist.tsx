import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';
import { XIcon } from './XIcon';
import { animate } from 'animejs';
import { ScribbledButton } from './ScribbledButton';
import logo from 'figma:asset/bb1b0d23f9aefeb9ab0d7457ceff54537cc56471.png';

interface JoinWaitlistProps {
  onNavigate: (page: 'home' | 'waitlist' | 'partners') => void;
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
    if (email) {
      // In a real app, submit here
      console.log('Submitted:', email);
      onNavigate('home');
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

        <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-4 md:px-16 pl-[4.5rem] md:pl-32">
          <div className="max-w-2xl mx-auto text-center">
            <div className="border-t border-[#d4e4f7]/30 pt-4 md:pt-6">
              <p
                className="text-sm md:text-base opacity-50 mb-4 md:mb-6"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#4a4a4a',
                  lineHeight: '1.6'
                }}
              >
                You are not alone in your career journey.
              </p>

              <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 pointer-events-auto">
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
        </div>
      </div>

      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">

        <div
          className="absolute top-6 left-16 md:left-24 flex items-center gap-2 pointer-events-auto pl-4 md:pl-0 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <motion.img
            src={logo}
            alt="Erocras Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          />
          <div className="flex flex-col">
            <p
              className="text-sm md:text-base tracking-widest group-hover:text-[#b91c1c] transition-colors"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#2d2d2d',
                letterSpacing: '0.2em',
                fontWeight: 600
              }}
            >
              Erocras
            </p>
          </div>
        </div>

        <div className="absolute top-7 right-6 md:right-12 pointer-events-auto pr-4 md:pr-0">
          <motion.p
            className="text-lg md:text-xl whitespace-nowrap text-right"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#daa520', // Goldenrod
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
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Coming Soon on<br />20th August 2026
          </motion.p>
        </div>

        <div className="absolute md:top-6 md:right-48 right-0 left-0 top-20 flex md:justify-end justify-center pointer-events-auto md:pr-4">
          <div className="flex gap-2 md:gap-4 scale-90 md:scale-100">
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
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="absolute inset-0 flex flex-col justify-center py-24 md:py-32 pl-24 pr-8 md:pl-32 md:pr-16 z-10 pointer-events-none">

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-2xl mx-auto flex flex-col items-center pointer-events-auto"
        >
          <h2
            className="text-3xl md:text-5xl mb-12 md:mb-20 text-center"
            style={{ fontFamily: "'Caveat', cursive", color: '#2d2d2d' }}
          >
            Reserve your spot in history
          </h2>

          <div className="relative group w-full">
            <div className="relative flex items-center h-24">
              {/* Thin, Sleek Stylus Pen */}
              <motion.div
                ref={quillRef}
                className="absolute pointer-events-none z-50"
                style={{
                  left: `${quillPos}px`,
                  top: '-40px',
                  width: '100px',
                  height: '100px',
                  transformOrigin: 'bottom left'
                }}
                animate={{ left: quillPos - 2 }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <path d="M10 90 L12 85 L85 12 L90 17 L17 90 L10 90 Z" fill="#2c3e50" />
                  <path d="M10 90 L13 87 L11 89 L10 90 Z" fill="#d4af37" />
                  <circle cx="10" cy="90" r="1.5" fill="#2d1e14" opacity="0.6" />
                </svg>
              </motion.div>

              <div className="relative w-full">
                {/* Cinematic Re-writing layer */}
                {isAnimatingEmail && (
                  <div
                    className="absolute inset-0 z-10 text-3xl md:text-4xl pointer-events-none"
                    style={{ fontFamily: "'Caveat', cursive", color: '#2d1e14' }}
                  >
                    {animatedEmail}
                  </div>
                )}

                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  onKeyUp={() => !isAnimatingEmail && updateQuillPosition(email.substring(0, inputRef.current?.selectionStart || 0))}
                  onClick={() => !isAnimatingEmail && updateQuillPosition(email.substring(0, inputRef.current?.selectionStart || 0))}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={isAnimatingEmail ? "" : "Recipient of the future..."}
                  className={`w-full bg-transparent border-none outline-none text-3xl md:text-4xl py-2 relative ${isAnimatingEmail ? 'opacity-0' : 'z-0'}`}
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: '#2d1e14',
                    caretColor: 'transparent',
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
      </div>
    </div>
  );
}
