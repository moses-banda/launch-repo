import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';
import { animate } from 'animejs';

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
  const measureRef = useRef<HTMLSpanElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  const [quillPos, setQuillPos] = useState(0);

  const updateQuillPosition = (text: string) => {
    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    // Match the exact classes and styles of the input
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

    // Trigger writing animation
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
      onNavigate('home');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0f0d0c] overflow-hidden p-4 md:p-12">
      {/* Heavy Paper Container - Thick Journal Feel */}
      <div
        className="w-full h-full relative rounded-lg overflow-hidden border-l-[15px] border-[#2d1e14]"
        style={{
          background: 'linear-gradient(to right, #e8e2d4 0%, #faf8f3 5%, #faf8f3 95%, #e8e2d4 100%)',
          boxShadow: '20px 20px 60px rgba(0,0,0,0.5), inset 0 0 100px rgba(0,0,0,0.05)'
        }}
      >
        {/* Paper Grain Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />

        {/* Notebook Lines */}
        <div className="absolute inset-0 pointer-events-none py-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="h-[40px] border-b border-[#d4e4f7]/40 w-full" />
          ))}
        </div>

        <div className="absolute left-24 md:left-32 top-0 bottom-0 w-px bg-[#f4a6a6]/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 md:px-32">
          <div className="w-full max-w-2xl">
            <motion.h2
              className="text-4xl md:text-5xl mb-20 text-center"
              style={{ fontFamily: "'Caveat', cursive", color: '#2d1e14' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              Reserve your spot in history
            </motion.h2>

            <div className="relative group">
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
                    {/* Ultra-thin elegant stylus */}
                    <path d="M10 90 L12 85 L85 12 L90 17 L17 90 L10 90 Z" fill="#2c3e50" />
                    <path d="M10 90 L13 87 L11 89 L10 90 Z" fill="#d4af37" />
                    <circle cx="10" cy="90" r="1.5" fill="#2d1e14" opacity="0.6" /> {/* Tip */}
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
                  className="ml-8 p-4 bg-[#2d1e14] text-[#faf8f3] rounded-full shadow-lg"
                >
                  <ArrowRight size={32} />
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
          </div>
        </div>

        <div className="absolute bottom-12 right-12 opacity-20 text-sm tracking-widest font-serif italic text-[#2d1e14]">
          EROCRAS • VOLUME I
        </div>
      </div>
    </div>
  );
}
