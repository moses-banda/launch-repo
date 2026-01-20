import { motion } from 'motion/react';

interface ScribbledButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
}

export function ScribbledButton({ text, onClick, href }: ScribbledButtonProps) {
  const Component = href ? motion.a : motion.button;
  const commonProps = {
    className: "relative z-10 group cursor-pointer block no-underline pointer-events-auto",
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    onClick: (e: any) => {
      if (href && href.startsWith('#')) {
        e.preventDefault();
      }
      onClick?.();
    },
    ...(href ? { href } : {})
  };

  return (
    <Component {...commonProps as any}>
      {/* Pulsing circular scribbles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main circular scribble */}
        <motion.ellipse
          cx="60"
          cy="20"
          rx="50"
          ry="16"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
          style={{
            filter: 'url(#chalk-texture)',
          }}
          whileHover={{ stroke: '#d4af37' }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            strokeWidth: [2, 3, 2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Second overlapping scribble for hand-drawn effect */}
        <motion.ellipse
          cx="60"
          cy="20"
          rx="48"
          ry="15"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        {/* Third scribble for depth */}
        <motion.ellipse
          cx="61"
          cy="21"
          rx="51"
          ry="17"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }}
        />
        <defs>
          <filter id="chalk-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>

      {/* Button text */}
      <span
        className="relative z-10 px-4 py-2 block text-sm md:text-base group-hover:opacity-80 transition-opacity text-center"
        style={{
          fontFamily: "'Caveat', cursive",
          color: '#2d2d2d',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          fontWeight: 600,
        }}
      >
        {text}
      </span>
    </Component>
  );
}