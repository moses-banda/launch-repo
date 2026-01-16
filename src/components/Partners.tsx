import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
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
      {/* Page */}
      <div
        className="w-full h-full relative shadow-2xl"
        style={{
          background: 'linear-gradient(to bottom, #faf8f3 0%, #f5f1e8 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.03)'
        }}
      >
        {/* Paper texture */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 600\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />

        {/* Notebook lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-[#d4e4f7]/30"
              style={{ top: `${(i + 1) * 2.5}%` }}
            />
          ))}
        </div>

        {/* Left margin line */}
        <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-[#f4a6a6]/25" />

        {/* Header */}
        <div className="absolute top-6 md:top-8 left-20 md:left-24 right-8">
          <p
            className="text-sm md:text-base tracking-widest opacity-40"
            style={{
              fontFamily: 'Georgia, serif',
              color: '#4a4a4a',
              letterSpacing: '0.2em'
            }}
          >
            ErocraS
          </p>
        </div>

        {/* Title */}
        <div className="absolute top-20 md:top-24 left-0 right-0 px-8 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl text-center"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#2d2d2d',
            }}
          >
            Our Partners
          </motion.h2>
        </div>

        {/* Logos with ink reveal animation */}
        <div className="absolute inset-0 px-8 md:px-16">
          {logos.map((logo, index) => (
            <InkRevealLogo key={index} logo={logo} />
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 px-8 md:px-16">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="border-t border-[#d4e4f7]/30 pt-4 md:pt-6"
            >
              <p
                className="text-sm md:text-base opacity-50 text-center mb-4 md:mb-6"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#4a4a4a',
                  lineHeight: '1.6'
                }}
              >
                You are not alone in your career journey.
              </p>

              {/* Social icons */}
              <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4">
                <a
                  href="#"
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </a>
                <a
                  href="#"
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </a>
                <a
                  href="#"
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </a>
                <a
                  href="#"
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </a>
                <a
                  href="#"
                  className="opacity-40 hover:opacity-70 transition-opacity"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4a4a4a' }} />
                </a>
              </div>

              {/* Copyright */}
              <p
                className="text-xs md:text-sm opacity-40 text-center"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#4a4a4a',
                }}
              >
                © 2025 ErocraS
              </p>
            </motion.div>
          </div>
        </div>

        {/* Page edges shadow */}
        <div className="absolute inset-0 pointer-events-none shadow-inner" style={{
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.08)'
        }} />

        {/* Right edge shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
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
