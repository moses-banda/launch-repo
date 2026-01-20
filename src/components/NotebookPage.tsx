import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Instagram, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { XIcon } from './XIcon';
import { ScribbledButton } from './ScribbledButton';
import '../sticky-note.css';
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
    text: "My coffee chat just got canceled. It’s late and my interview is tomorrow morning. I don’t know what I’m supposed to do now.",
    tagline: "Career emergencies don’t wait for reschedules.",
    userName: "Aaliyah"
  },
  {
    text: "Everyone said to ask older club members. The people who knew already graduated. I feel like I missed something important.",
    tagline: "Knowledge shouldn’t graduate.",
    userName: "Roy"
  },
  {
    text: "The recruiter finally replied today. The deadline was yesterday. Cool.",
    tagline: "Timing decides outcomes.",
    userName: "Eva"
  },
  {
    text: "I didn’t ask my question because it felt too basic. Now I’m scared it’ll come up tomorrow. I keep replaying it in my head.",
    tagline: "Ask anything. No judgment.",
    userName: "Oluwafe"
  },
  {
    text: "They told me to read the guide again. I’ve read it three times already. No one has actually heard my answers.",
    tagline: "PDFs don’t ask follow-ups.",
    userName: "Lin"
  },
  {
    text: "I sent another LinkedIn message today. It says seen. That’s probably it.",
    tagline: "Careers shouldn’t depend on replies.",
    userName: "Yi"
  },
  {
    text: "My friend said I’ll be fine. They already have an offer. I don’t think they get it.",
    tagline: "Reassurance isn’t preparation.",
    userName: "Maria"
  },
  {
    text: "I needed help tonight. I didn’t know who to ask. So I asked no one.",
    tagline: "Silence isn’t a plan.",
    userName: "Nguyen"
  },
  {
    text: "It’s 2am and I’m back on the career center site. Everything says they support students. There’s literally no one to talk to.",
    tagline: "Career emergencies happen after office hours.",
    userName: "Fernando"
  },
  {
    text: "I practiced cases alone in my room. I kept stopping mid sentence. I don’t know if I sound confident or dumb.",
    tagline: "Interviews are spoken.",
    userName: "Xiaodi"
  },
  {
    text: "We were supposed to do a mock tonight. He said he’s already out downtown. My interview is still in the morning.",
    tagline: "Help shouldn’t depend on people showing up.",
    userName: "Thomas"
  },
  {
    text: "I’ve been googling interview prep since midnight. There are too many tabs open. None of this is helping.",
    tagline: "Urgency needs answers, not links.",
    userName: "Abia"
  },
  {
    text: "People keep saying I should already know this. I don’t know when I was supposed to learn it. I feel behind for no reason.",
    tagline: "Access shouldn’t be assumed.",
    userName: "Kunal"
  },
  {
    text: "Apparently the answer was in a DM thread. I wasn’t in it. No one told me.",
    tagline: "Support shouldn’t live in inboxes.",
    userName: "Serpah"
  },
  {
    text: "I didn’t really know what to do. So I guessed and hoped it sounded right. I keep wondering if they noticed.",
    tagline: "Guessing isn’t preparation.",
    userName: "Tajun"
  },
  {
    text: "The group chat has like 300 messages. My question is still unanswered. I’m not asking again.",
    tagline: "Broadcasting isn’t support.",
    userName: "Manish"
  },
  {
    text: "My school sends emails every day. I stopped opening them. I probably missed something important.",
    tagline: "Support shouldn’t live in spam.",
    userName: "Nora"
  },
  {
    text: "I wasn’t lazy. I actually cared a lot. I just needed help at the wrong time.",
    tagline: "Some moments matter more than schedules.",
    userName: "Mia"
  },
  {
    text: "Students keep asking the same things in different places. No one ever connects it. It feels like wasted effort.",
    tagline: "Patterns matter.",
    userName: "Benny"
  },
  {
    text: "Clubs try to reach students. Messages get lost. Important things fade.",
    tagline: "If it matters, it shouldn’t be missed.",
    userName: "Sam"
  }
];

export function NotebookPage({ onNavigate }: { onNavigate: (page: 'home' | 'waitlist' | 'partners' | 'nomination') => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

      </div>

      {/* Footer (Moved out for z-index accessibility) */}
      <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-4 md:px-16 pl-[4.5rem] md:pl-32 z-20 pointer-events-auto">
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
      </div>

      {/* Sticky Note - Draggable Nominate Link */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
        className="sticky-note-container absolute bottom-20 right-6 md:bottom-24 md:right-20 lg:right-32 z-30 pointer-events-auto touch-none cursor-grab"
        style={{
          boxShadow: '8px 12px 25px rgba(0,0,0,0.35), 4px 6px 10px rgba(0,0,0,0.2)'
        }}
      >
        <div
          className="sticky-note pointer-events-auto"
          onClick={() => {
            if (!isDragging) {
              onNavigate('nomination');
            }
          }}
        >
          <div className="note-text">
            Nominate a Vanderbilt Student<br />to be the voice of your experience.
          </div>
          <div className="arrow-icon">
            &rarr;
          </div>
          <div
            className="draggable-label"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '0.75rem',
              opacity: 0.5,
              marginTop: '0.25rem',
              textAlign: 'center'
            }}
          >
            (draggable)
          </div>
        </div>
      </motion.div>




      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 z-50" style={{ pointerEvents: 'auto' }}>

        {/* Brand (Top Left) - Click to refresh */}
        <a
          href="#"
          className="absolute top-6 left-16 md:left-24 flex items-center gap-2 pointer-events-auto pl-4 md:pl-0 cursor-pointer group no-underline"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
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
              <a href="src\components\NotebookPage.tsx">Erocras</a>
            </p>
          </div>
        </a>

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
            Coming Soon on<br />12 August 2026
          </motion.p>
        </div>

        {/* Buttons (Desktop: Top Right next to date, Mobile: Below header) */}
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
                onNavigate('waitlist');
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
                <ScribbledButton text="Join Waitlist" onClick={() => onNavigate('waitlist')} />
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
      <div className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-auto" style={{ left: '13%' }}>
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

      <div className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-auto" style={{ right: '13%' }}>
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
    </div >
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

        <div className="relative w-full text-justify max-w-5xl mx-auto mt-12 md:mt-16" style={{ paddingLeft: '22%', paddingRight: '22%' }}>
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