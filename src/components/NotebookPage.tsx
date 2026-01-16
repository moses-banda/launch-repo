import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Instagram, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { XIcon } from './XIcon';
import { ScribbledButton } from './ScribbledButton';
import { animate } from 'animejs';
import logo from 'figma:asset/bb1b0d23f9aefeb9ab0d7457ceff54537cc56471.png';
import profileIcon from 'figma:asset/8e273ee48e90346d297e8cee71c2504f5f00a434.png';

interface Confession {
  text: string;
  tagline: string;
  userName: string;
}

const confessions: Confession[] = [
  {
    text: "I reached out to three recruiters. They saw my messages... But no one replied. My big interview is tomorrow and I have no one to ask for advice.",
    tagline: "Professional silence shouldn't be your dead end.",
    userName: "Simba"
  },
  {
    text: "I practiced for two solid weeks. But they asked me the one thing I wasn't ready for. I froze. I had to say 'I don't know' three times in a row.",
    tagline: "Career support should never punch out at 4 PM.",
    userName: "Mufasa"
  },
  {
    text: "My manager said I wasn't 'ready' for the promotion. But they never told me what 'ready' actually looks like. I'm working in the dark, Not knowing what to improve.",
    tagline: "Navigating your growth shouldn't be a solo journey.",
    userName: "Nala"
  },
  {
    text: "I finally got the job offer! But the salary is much lower than I expected. I'm terrified to negotiate... What if they take the offer back?",
    tagline: "Expert guidance matters when your future is on the line.",
    userName: "Rafiki"
  },
  {
    text: "Everyone here seems so confident and capable. I'm just over here pretending I know what I'm doing. Every morning I wonder: 'Is today the day they find out I don't belong?'",
    tagline: "Imposter syndrome is loudest when you're alone.",
    userName: "Timon"
  }
];

export function NotebookPage({ onNavigate }: { onNavigate: (page: 'home' | 'waitlist' | 'partners' | 'nomination') => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    let targetIndex;
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % confessions.length;
    } else {
      targetIndex = (currentIndex - 1 + confessions.length) % confessions.length;
    }

    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsTransitioning(false);
    }, 600); // 600ms transition time
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
        {/* Notebook Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-[#d4e4f7]/30"
              style={{ top: `${(i + 1) * 2.5}%` }}
            />
          ))}
        </div>
        {/* Margin Line */}
        <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-[#f4a6a6]/25" />

        {/* Ribbon Bookmark */}
        <div className="absolute top-0 right-20 md:right-32 w-8 md:w-10 h-32 md:h-40 z-20">
          <div
            className="w-full h-full bg-[#8b0000] shadow-[2px_5px_10px_rgba(0,0,0,0.3)] rounded-b-sm"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
              background: 'linear-gradient(to right, #8b0000, #b22222, #8b0000)'
            }}
          />
        </div>

        {/* Static Footer (moved here to stay permanent) */}
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

      {/* Sticky Note - Nominate Link (Top Right - Yellow Flashcard) */}
      <motion.div
        className="absolute top-28 right-4 md:top-24 md:right-12 lg:right-16 w-28 h-36 md:w-32 md:h-44 lg:w-36 lg:h-48 bg-[#ffd700] p-3 md:p-4 shadow-lg z-30 cursor-pointer flex flex-col justify-center items-center text-center transform rotate-2 pointer-events-auto"
        onClick={() => onNavigate('nomination')}
        style={{
          fontFamily: "'Caveat', cursive",
          boxShadow: '4px 4px 12px rgba(0,0,0,0.3)'
        }}
        whileHover={{ scale: 1.08, rotate: 5 }}
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Tape Effect */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 md:w-12 h-3 md:h-4 bg-white/60 rotate-1 shadow-sm" />

        <p className="text-xs md:text-sm lg:text-base leading-tight font-semibold text-[#5a4a00]">
          Nominate a Vandy Student!
        </p>
        <div className="mt-2 text-[#5a4a00] text-xs animate-pulse">
          Click ➜
        </div>
      </motion.div>




      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">

        {/* Brand (Top Left) */}
        <div className="absolute top-6 left-16 md:left-24 flex items-center gap-2 pointer-events-auto pl-4 md:pl-0">
          <motion.img
            src={logo}
            alt="Erocras Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          />
          <div className="flex flex-col">
            <p
              className="text-sm md:text-base tracking-widest"
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

        {/* Date (Top Right - visible on all screens) */}
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

        {/* Buttons (Desktop: Top Right next to date, Mobile: Below header) */}
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
              <ScribbledButton text="Join Waitlist" onClick={() => onNavigate('waitlist')} />
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

      {/* Main Content Area - Center Aligned with Margin Constraint */}
      <div className="absolute inset-0 flex flex-col justify-center py-24 md:py-32 pl-24 pr-8 md:pl-32 md:pr-16 text-center z-10 pointer-events-none">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-5xl mx-auto flex flex-col items-center pointer-events-auto"
          >
            <PageContent
              confession={confessions[currentIndex]}
              isCurrent={true}
              isAnimating={true}
            />
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Navigation Arrows - Clear and Easy to Use */}
      <div className="absolute left-20 md:left-28 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <motion.button
          onClick={() => triggerTransition('prev')}
          whileHover={{ scale: 1.2, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-[#2d2d2d]" />
        </motion.button>
      </div>

      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <motion.button
          onClick={() => triggerTransition('next')}
          whileHover={{ scale: 1.2, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Next story"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#2d2d2d]" />
        </motion.button>
      </div>

      {/* Page indicator dots */}
      <div className="absolute bottom-48 left-1/2 -translate-x-1/2 z-30 flex gap-2 pointer-events-auto">
        {confessions.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'bg-[#8b0000] w-6'
              : 'bg-[#d4e4f7] hover:bg-[#b8d4f0]'
              }`}
            aria-label={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function PageContent({
  confession,
  isCurrent,
  isAnimating
}: {
  confession: Confession,
  isCurrent: boolean,
  isAnimating: boolean
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedTagline, setDisplayedTagline] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const textEndRef = useRef<HTMLSpanElement>(null);
  const tagEndRef = useRef<HTMLSpanElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  const [quillTarget, setQuillTarget] = useState<'text' | 'tagline' | null>(null);

  useEffect(() => {
    if (!isCurrent) return;

    setDisplayedText('');
    setDisplayedTagline('');
    setShowTagline(false);
    setQuillTarget('text');

    let textIdx = 0;
    const textInterval = setInterval(() => {
      if (textIdx <= confession.text.length) {
        setDisplayedText(confession.text.slice(0, textIdx));
        textIdx++;

        // Jiggle quill while writing
        if (quillRef.current) {
          animate(quillRef.current, {
            rotate: [-35, -45, -35],
            translateY: [0, -2, 0],
            duration: 100,
            ease: 'linear'
          });
        }
      } else {
        clearInterval(textInterval);
        setTimeout(() => {
          setShowTagline(true);
          setQuillTarget('tagline');
        }, 800);
      }
    }, 40);

    return () => clearInterval(textInterval);
  }, [confession, isCurrent]);

  useEffect(() => {
    if (!showTagline || !isCurrent) return;

    let tagIdx = 0;
    const tagInterval = setInterval(() => {
      if (tagIdx <= confession.tagline.length) {
        setDisplayedTagline(confession.tagline.slice(0, tagIdx));
        tagIdx++;

        if (quillRef.current) {
          animate(quillRef.current, {
            rotate: [-35, -45, -35],
            translateY: [0, -2, 0],
            duration: 100,
            ease: 'linear'
          });
        }
      } else {
        clearInterval(tagInterval);
        setQuillTarget(null);
      }
    }, 30);

    return () => clearInterval(tagInterval);
  }, [showTagline, confession.tagline, isCurrent]);

  return (
    <div className="w-full relative">
      {/* Feather Quill / Pen */}
      <AnimatePresence>
        {quillTarget && isAnimating && (
          <motion.div
            ref={quillRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-50 pointer-events-none"
            style={{
              width: '100px',
              height: '100px',
              left: quillTarget === 'text' ? (textEndRef.current?.offsetLeft || 0) : (tagEndRef.current?.offsetLeft || 0),
              top: quillTarget === 'text' ? (textEndRef.current?.offsetTop || 0) : (tagEndRef.current?.offsetTop || 0),
              marginTop: '-50px',
              marginLeft: '-10px',
              transformOrigin: 'bottom left'
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 90 L25 75 L80 20 C82 18 85 18 87 20 L92 25 C94 27 94 30 92 32 L35 87 L10 90 Z" fill="#2c3e50" />
              <path d="M22 78 L32 68 L38 74 L28 84 L22 78 Z" fill="#34495e" />
              <path d="M10 90 L18 82 C19 81 20 81 21 82 L22 83 L10 90 Z" fill="#d4af37" />
              <path d="M10 90 L15 85" stroke="#1a1a1a" strokeWidth="0.5" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <img
            src={profileIcon}
            alt={confession.userName}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-[#d4e4f7]/40"
          />
          <p
            className="text-base md:text-lg opacity-70"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#6a6a6a',
              fontWeight: 400,
            }}
          >
            {confession.userName}
          </p>
        </motion.div>

        <div className="relative w-full text-justify max-w-2xl px-6 md:px-0 mx-auto">
          <p
            className="text-xl md:text-2xl lg:text-3xl leading-loose font-light"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#4a4a4a',
              lineHeight: '2.2',
              fontWeight: 300
            }}
          >
            {displayedText}
            <span ref={textEndRef} />
          </p>
        </div>
      </div>

      <div className="h-20 mt-12 mb-6 md:mb-8 relative flex justify-center items-center">
        {showTagline && (
          <p
            className="text-base md:text-lg leading-relaxed font-light"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#7a7a7a',
              lineHeight: '1.6',
              fontWeight: 300
            }}
          >
            {displayedTagline}
            <span ref={tagEndRef} />
          </p>
        )}
      </div>
    </div>
  );
}