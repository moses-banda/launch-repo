import { motion } from 'motion/react';

interface BookCoverProps {
  isFlipping: boolean;
}

export function BookCover({ isFlipping }: BookCoverProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0908] perspective-[2000px] overflow-hidden">
      {/* The Book Container - Absolute Center */}
      <motion.div
        className="relative w-[380px] h-[550px] md:w-[500px] md:h-[700px] lg:w-[600px] lg:h-[840px]"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          boxShadow: '0 50px 100px rgba(0,0,0,0.9)'
        }}
        animate={isFlipping ? {
          rotateY: -150,
          x: '-25%',
          scale: 1.05,
          opacity: 0,
        } : {
          rotateY: -12, // Natural angle
          rotateX: 2,
          scale: 1,
        }}
        transition={{
          duration: 2.2,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {/* PHYSICAL THICKNESS - RIGHT (Page stack) */}
        <div
          className="absolute -right-[32px] top-[4px] bottom-[4px] w-[32px] bg-[#e0dac8]"
          style={{
            transform: 'rotateY(90deg)',
            transformOrigin: 'left center',
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px)',
            boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.2)'
          }}
        />

        {/* PHYSICAL THICKNESS - BOTTOM (Page stack) */}
        <div
          className="absolute left-[4px] -bottom-[32px] right-[4px] h-[32px] bg-[#d3ccb8]"
          style={{
            transform: 'rotateX(-90deg)',
            transformOrigin: 'center top',
            backgroundImage: 'repeating-linear-gradient(to right, transparent 0px, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px)',
            boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.2)'
          }}
        />

        {/* Front Cover - Front Face */}
        <div
          className="absolute inset-0 rounded-r-lg border-l-8 border-[#1a120b]"
          style={{
            background: 'linear-gradient(135deg, #423021 0%, #2d1e14 100%)',
            boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Leather Texture Overlay */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Gold Embossed Frame */}
          <div className="absolute inset-6 border-2 border-[#d4af37]/30 rounded-sm pointer-events-none" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >

            </motion.div>
          </div>

          {/* Spine Light Reflection */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-white/5 blur-[2px]" />
        </div>
      </motion.div>
    </div>
  );
}