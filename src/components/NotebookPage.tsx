import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
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
    text: "I reached out to three recruiters.\nThey saw my messages...\nBut no one replied.\nMy big interview is tomorrow and I have no one to ask for advice.",
    tagline: "Professional silence shouldn't be your dead end.",
    userName: "Simba"
  },
  {
    text: "I practiced for two solid weeks.\nBut they asked me the one thing I wasn't ready for.\nI froze.\nI had to say 'I don't know' three times in a row.",
    tagline: "Career support should never punch out at 4 PM.",
    userName: "Mufasa"
  },
  {
    text: "My manager said I wasn't 'ready' for the promotion.\nBut they never told me what 'ready' actually looks like.\nI'm working in the dark,\nNot knowing what to improve.",
    tagline: "Navigating your growth shouldn't be a solo journey.",
    userName: "Nala"
  },
  {
    text: "I finally got the job offer!\nBut the salary is much lower than I expected.\nI'm terrified to negotiate...\nWhat if they take the offer back?",
    tagline: "Expert guidance matters when your future is on the line.",
    userName: "Rafiki"
  },
  {
    text: "Everyone here seems so confident and capable.\nI'm just over here pretending I know what I'm doing.\nEvery morning I wonder:\n'Is today the day they find out I don't belong?'",
    tagline: "Imposter syndrome is loudest when you're alone.",
    userName: "Timon"
  }
];

export function NotebookPage({ onNavigate }: { onNavigate: (page: 'home' | 'waitlist' | 'partners') => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);

  // Handle Swipe/Drag to Flip
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isFlipping) return;

    const threshold = 50;
    if (info.offset.x < -threshold) {
      // Swipe Left -> Next
      triggerFlip('next');
    } else if (info.offset.x > threshold) {
      // Swipe Right -> Prev
      triggerFlip('prev');
    }
  };

  const triggerFlip = (direction: 'next' | 'prev') => {
    setIsFlipping(true);

    let targetIndex;
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % confessions.length;
    } else {
      targetIndex = (currentIndex - 1 + confessions.length) % confessions.length;
    }

    setNextIndex(targetIndex);

    // Slower flip duration
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsFlipping(false);
    }, 2200);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#2a2420] overflow-hidden" style={{ perspective: '2000px' }}>
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-[#5a4334] to-transparent z-20 pointer-events-none" />

      <div className="absolute top-6 md:top-8 right-6 md:right-12 z-30 flex gap-3 md:gap-4">
        <ScribbledButton text="Join Waitlist" onClick={() => onNavigate('waitlist')} />
        <ScribbledButton text="Our Partners" onClick={() => onNavigate('partners')} />
      </div>

      {/* Main Draggable Container for Interaction */}
      <motion.div
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        style={{ transformStyle: 'preserve-3d' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {/* Bottom Page (Always visible waiting underneath) */}
        <div className="absolute inset-0">
          <PageContent
            confession={confessions[nextIndex]}
            key={`next-${nextIndex}`}
            isCurrent={false}
            isAnimating={false}
          />
        </div>

        {/* Top Flipping Page */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
          }}
          animate={isFlipping ? {
            rotateY: -180,
            scale: 0.98,
            x: '2%',
          } : {
            rotateY: 0,
            scale: 1,
            x: '0%',
          }}
          transition={{
            duration: 2.2,
            ease: [0.645, 0.045, 0.355, 1.000] // Cubic Bezier for smooth, classy flip
          }}
        >
          {/* Current Content */}
          <PageContent
            confession={confessions[currentIndex]}
            key={`current-${currentIndex}`}
            isCurrent={!isFlipping}
            isAnimating={true}
          />

          {/* Shadow Overlay during flip for depth */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
              transformOrigin: 'left center',
            }}
            animate={isFlipping ? {
              opacity: [0, 0.6, 0],
            } : {
              opacity: 0,
            }}
            transition={{
              duration: 2.2,
              ease: [0.645, 0.045, 0.355, 1.000]
            }}
          />
        </motion.div>
      </motion.div>
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
    // If not the active top page, just show full text immediately (for background)
    if (!isCurrent) {
      setDisplayedText(confession.text);
      setDisplayedTagline(confession.tagline);
      return;
    }

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
    <div
      className="w-full h-full relative shadow-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #faf8f3 0%, #f5f1e8 100%)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.03)'
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 600\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />

      {/* Notebook Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-[#d4e4f7]/30"
            style={{ top: `${(i + 1) * 2.5}%` }}
          />
        ))}
      </div>

      {/* Margin Line (Desktop: 5rem/80px/left-20, Mobile: 4rem/left-16) */}
      <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-[#f4a6a6]/25" />

      {/* Logo Header */}
      <div className="absolute top-6 md:top-8 left-20 md:left-24 right-8 flex items-center gap-2">
        <motion.img
          src={logo}
          alt="ErocraS Logo"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
        <p
          className="text-sm md:text-base tracking-widest opacity-80"
          style={{
            fontFamily: 'Georgia, serif',
            color: '#2d2d2d',
            letterSpacing: '0.2em'
          }}
        >
          ErocraS
        </p>
      </div>

      {/* Feather Quill / Pen */}
      <AnimatePresence>
        {isCurrent && quillTarget && isAnimating && (
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

      {/* Ribbon Bookmark */}
      <div className="absolute top-0 right-20 md:right-32 w-8 md:w-10 h-32 md:h-40 z-20 pointer-events-none">
        <div
          className="w-full h-full bg-[#8b0000] shadow-[2px_5px_10px_rgba(0,0,0,0.3)] rounded-b-sm"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
            background: 'linear-gradient(to right, #8b0000, #b22222, #8b0000)'
          }}
        />
      </div>

      {/* Main Content Area - Center Aligned with Margin Constraint */}
      <div className="absolute inset-0 flex flex-col justify-center py-24 md:py-32 pl-24 pr-8 md:pl-32 md:pr-16 text-center">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
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
              className="text-base md:text-lg opacity-60"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#5a5a5a',
                fontWeight: 600,
              }}
            >
              {confession.userName}
            </p>
          </motion.div>

          <div className="relative">
            <p
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed whitespace-pre-line"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#2d2d2d',
                lineHeight: '1.8'
              }}
            >
              {displayedText}
              <span ref={textEndRef} />
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 px-8 md:px-16 pl-24 md:pl-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-20 mb-6 md:mb-8 relative flex justify-center items-center">
            {showTagline && (
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#5a5a5a',
                  lineHeight: '1.6'
                }}
              >
                {displayedTagline}
                <span ref={tagEndRef} />
              </p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-[#d4e4f7]/30 pt-4 md:pt-6"
          >
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

            <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4">
              <a href="#" className="opacity-40 hover:opacity-70 transition-opacity" aria-label="Facebook">
                <Facebook className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
              </a>
              <a href="#" className="opacity-40 hover:opacity-70 transition-opacity" aria-label="Twitter">
                <Twitter className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
              </a>
              <a href="#" className="opacity-40 hover:opacity-70 transition-opacity" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
              </a>
              <a href="#" className="opacity-40 hover:opacity-70 transition-opacity" aria-label="Instagram">
                <Instagram className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
              </a>
              <a href="#" className="opacity-40 hover:opacity-70 transition-opacity" aria-label="Email">
                <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
              </a>
            </div>

            <p className="text-xs md:text-sm opacity-40 text-center" style={{ fontFamily: "'Caveat', cursive", color: '#4a4a4a' }}>
              © 2025 ErocraS
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none shadow-inner" style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.08)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
    </div>
  );
}