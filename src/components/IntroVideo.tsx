import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import part1Gif from '@/assets/Part 1.gif';
import part2Gif from '@/assets/Part 2.gif';
import logo from '@/assets/bb1b0d23f9aefeb9ab0d7457ceff54537cc56471.png';

interface IntroVideoProps {
    onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
    const [step, setStep] = useState(1);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (step === 2) {
            // Play Part 2 for 2.5 seconds, totaling 5s
            timer = setTimeout(() => {
                onComplete();
            }, 2500);
        }

        return () => clearTimeout(timer);
    }, [step, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="part1-container"
                        className="relative w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={part1Gif}
                            alt="Student staring at a laptop in a dimly lit room, feeling overwhelmed"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Button - Designer Refinement */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 transition-colors duration-1000 hover:bg-black/20">
                            <motion.button
                                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{
                                    scale: 1.02,
                                    letterSpacing: '0.35em',
                                    borderColor: 'rgba(212, 175, 55, 0.8)',
                                    backgroundColor: 'rgba(0,0,0,0.4)'
                                }}
                                whileTap={{ scale: 0.98, letterSpacing: '0.25em' }}
                                onClick={() => setStep(2)}
                                className="group relative px-8 py-3 md:px-14 md:py-5 border-[0.5px] md:border border-[#d4af37]/40 text-[#f3e5ab] tracking-[0.25em] md:tracking-[0.3em] uppercase backdrop-blur-md bg-black/10 overflow-hidden"
                                style={{
                                    fontFamily: '"Georgia", "Times New Roman", serif',
                                    fontSize: 'clamp(0.8rem, 3vw, 1.5rem)',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                    boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)'
                                }}
                            >
                                <span className="relative z-10 font-light drop-shadow-md">Who are we?</span>

                                {/* Subtle shimmer effect */}
                                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.img
                        key="part2"
                        src={part2Gif}
                        alt="Erocras brand reveal with dynamic particle effects"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>

            {/* Premium Logo Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="absolute top-6 left-6 md:left-12 z-50 flex items-center gap-3 bg-[#d8d4cf] border border-[#c5c0b8] px-5 py-2 rounded-full shadow-lg"
            >
                <motion.img
                    src={logo}
                    alt="Erocras brand emblem"
                    className="w-8 h-8 rounded-full object-cover"
                />
                <h1
                    className="text-lg tracking-normal text-[#4a3b32] font-semibold"
                    style={{
                        fontFamily: 'serif',
                    }}
                >
                    Erocras
                </h1>
            </motion.div>
        </motion.div>
    );
}
