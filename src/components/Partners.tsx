import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import { XIcon } from './XIcon';
import { ScribbledButton } from './ScribbledButton';
import logo from 'figma:asset/bb1b0d23f9aefeb9ab0d7457ceff54537cc56471.png';
import logo1 from 'figma:asset/2493ae3a55ffa1f09c7665f0ff991fca2604c429.png';
import logo2 from 'figma:asset/e46e10ea9945c66f04431ea64f2e2a74ec8d7e68.png';
import logo3 from 'figma:asset/7b08baeb7d25f8a1bb32bb2f5e0e45b2fbd3fb62.png';

interface PartnersProps {
  onNavigate: (page: 'home' | 'waitlist' | 'partners') => void;
}

interface Logo {
  src: string;
  alt: string;
  delay: number;
}

const logos = [
  {
    src: logo1,
    alt: 'Partner 1',
    delay: 0.2,
  },
  {
    src: logo2,
    alt: 'Partner 2',
    delay: 0.5,
  },
  {
    src: logo3,
    alt: 'Partner 3',
    delay: 0.8,
  },
];

export function Partners({ onNavigate }: PartnersProps) {
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


      {/* SVG Filters */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="wiggle">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>

      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 z-50">

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
            Coming Soon on<br />12 August 2026
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
              <ScribbledButton text="Join Waitlist" onClick={() => onNavigate('waitlist')} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center py-24 md:py-32 pl-24 pr-8 md:pl-32 md:pr-16 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full relative pointer-events-auto"
        >
          {/* Title */}
          <div className="absolute top-0 left-0 right-0 px-8 text-center z-20">
            <h2
              className="text-3xl md:text-4xl text-center"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#2d2d2d',
              }}
            >
              Our Partners
            </h2>
          </div>

          {/* Logos with sketchy reveal animation */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-16 md:gap-32 pointer-events-none">
            {logos.map((logo, index) => (
              <SketchyRevealLogo key={index} logo={logo} />
            ))}
          </div>
        </motion.div>
      </div>

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
    </div>
  );
}

function SketchyRevealLogo({ logo }: { logo: Logo }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, logo.delay * 1000);
    return () => clearTimeout(timer);
  }, [logo.delay]);

  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center pointer-events-auto">
      {/* Hand-drawn box animation */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
        <motion.path
          d="M 5,5 L 95,5 L 95,95 L 5,95 Z"
          fill="transparent"
          stroke="#4a4a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isPlaying ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            filter: 'url(#wiggle)',
          }}
        />
        {/* Second pass for sketchy look */}
        <motion.path
          d="M 6,4 L 96,6 L 94,94 L 4,96 Z"
          fill="transparent"
          stroke="#4a4a4a"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isPlaying ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Logo Stamp Animation */}
      <motion.div
        className="relative z-10 w-24 h-24 md:w-36 md:h-36 p-4"
        initial={{ opacity: 0, scale: 1.5, rotate: 0 }}
        animate={isPlaying ? {
          opacity: 1,
          scale: 1,
          rotate: [0, -5, 0]
        } : { opacity: 0, scale: 1.5 }}
        transition={{
          duration: 0.4,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 12
        }}
      >
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-full h-full object-contain filter sepia-[0.3] contrast-[1.1]"
        />
      </motion.div>
    </div>
  );
}

