import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
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
  position: { top: string; left: string };
  size: string;
  delay: number;
}

const logos: Logo[] = [
  {
    src: logo1,
    alt: 'Partner 1',
    position: { top: '20%', left: '15%' },
    size: '120px',
    delay: 0.3,
  },
  {
    src: logo2,
    alt: 'Partner 2',
    position: { top: '45%', left: '65%' },
    size: '140px',
    delay: 0.7,
  },
  {
    src: logo3,
    alt: 'Partner 3',
    position: { top: '65%', left: '25%' },
    size: '130px',
    delay: 1.1,
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
                <motion.a href="#" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Facebook">
                  <Facebook className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </motion.a>
                <motion.a href="#" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Twitter">
                  <Twitter className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </motion.a>
                <motion.a href="#" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </motion.a>
                <motion.a href="#" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Instagram">
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </motion.a>
                <motion.a href="#" whileHover={{ rotate: [0, 10, -10, 0] }} className="opacity-40 hover:opacity-100 transition-opacity" aria-label="Email">
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
              className="text-sm md:text-base tracking-widest opacity-90"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#2d2d2d',
                letterSpacing: '0.2em'
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

          {/* Logos with ink reveal animation */}
          <div className="absolute inset-0">
            {logos.map((logo, index) => (
              <InkRevealLogo key={index} logo={logo} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InkRevealLogo({ logo }: { logo: Logo }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, logo.delay * 1000);

    return () => clearTimeout(timer);
  }, [logo.delay]);

  return (
    <div
      className="absolute"
      style={{
        top: logo.position.top,
        left: logo.position.left,
        width: logo.size,
        height: logo.size,
      }}
    >
      {/* Ink spot overlay that reveals the logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: revealed ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {/* Dull ink spot */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, #a8a8a8 0%, #d0d0d0 50%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          initial={{ opacity: 1, scale: 1.2 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Logo image - fades in as ink disappears */}
        <motion.img
          src={logo.src}
          alt={logo.alt}
          className="relative z-10 w-full h-full object-contain"
          initial={{ opacity: 0, filter: 'grayscale(100%)' }}
          animate={{
            opacity: 1,
            filter: 'grayscale(0%)',
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: 'easeOut'
          }}
        />

        {/* Ink texture effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 60%)',
            mixBlendMode: 'multiply',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
