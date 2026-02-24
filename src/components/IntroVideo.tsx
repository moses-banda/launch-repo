import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import desktopVideo from '../assets/bigger_screens.mp4';
import mobileVideo from '../assets/smaller_screens.mp4';

interface IntroVideoProps {
    onComplete: () => void;
}

export const IntroVideo = ({ onComplete }: IntroVideoProps) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        console.log("Intro Video component mounted. isMobile:", window.innerWidth < 768);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            console.log("Intro Video component unmounting");
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [videoEnded, setVideoEnded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: videoEnded ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
            <video
                key={isMobile ? 'mobile' : 'desktop'}
                src={isMobile ? mobileVideo : desktopVideo}
                autoPlay
                muted
                loop
                playsInline
                onEnded={(e) => {
                    // Fallback: force restart if loop attribute doesn't work
                    const vid = e.currentTarget;
                    vid.currentTime = 0;
                    vid.play();
                }}
                className="w-full h-full object-cover"
            />

            {/* Centered Start Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                        borderColor: "#daa520",
                        boxShadow: "0 0 40px rgba(218, 165, 32, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        console.log("Explore Erocras clicked");
                        setVideoEnded(true);
                        setTimeout(onComplete, 1000);
                    }}
                    className="px-12 py-5 bg-white/15 backdrop-blur-xl border-2 border-white/40 text-white text-2xl tracking-[0.25em] font-medium uppercase transition-all duration-500 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center gap-4 group"
                    style={{
                        fontFamily: '"Playfair Display", serif',
                    }}
                >
                    Explore Erocras
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[#daa520]"
                    >
                        →
                    </motion.span>
                </motion.button>
            </div>
        </motion.div>
    );
};
