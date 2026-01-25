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

        if (step === 1) {
            // Play Part 1 for 2.5 seconds
            timer = setTimeout(() => {
                setStep(2);
            }, 2500);
        } else if (step === 2) {
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
                    <motion.img
                        key="part1"
                        src={part1Gif}
                        alt="Intro Part 1"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
                {step === 2 && (
                    <motion.img
                        key="part2"
                        src={part2Gif}
                        alt="Intro Part 2"
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
                    alt="Erocras Logo"
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
