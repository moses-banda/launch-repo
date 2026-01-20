import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import { XIcon } from './XIcon';
import logo from 'figma:asset/bb1b0d23f9aefeb9ab0d7457ceff54537cc56471.png';

interface NominationPageProps {
    onNavigate: (page: 'home' | 'waitlist' | 'partners' | 'nomination') => void;
}

export function NominationPage({ onNavigate }: NominationPageProps) {
    const [nomineeName, setNomineeName] = useState('');
    const [nomineeEmail, setNomineeEmail] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (nomineeName.trim()) {
            console.log('Nomination Submitted:', { nomineeName, nomineeEmail, reason });
            onNavigate('home');
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#2a2420] overflow-hidden">
            {/* Left book spine shadow */}
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

                {/* Footer */}
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
                                <br />You are not alone in your career journey.
                            </p>

                            <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 pointer-events-auto">
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
            </div>

            {/* Header with Logo and Back Button */}
            <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
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

                {/* Back Button */}
                <motion.button
                    onClick={() => onNavigate('home')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 md:right-12 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto px-4 py-2 rounded-full bg-white/70 hover:bg-white/95 shadow-lg z-[60] cursor-pointer"
                    style={{ fontFamily: "'Caveat', cursive" }}
                    type="button"
                >
                    <ArrowLeft className="w-5 h-5 text-[#4a4a4a]" />
                    <span className="text-[#4a4a4a] text-lg font-medium">Back</span>
                </motion.button>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-2xl mx-auto px-8 md:px-16 pl-24 md:pl-32"
            >
                {/* Title */}
                <h1
                    className="text-3xl md:text-4xl lg:text-5xl text-center mb-12 md:mb-16 italic font-light"
                    style={{
                        fontFamily: "'Caveat', cursive",
                        color: '#b91c1c'
                    }}
                >
                    Nominate a Vanderbilt Student
                </h1>

                {/* Form Fields */}
                {/* Form Fields */}
                <div className="space-y-10 md:space-y-12 pl-[15%]">
                    {/* Name Field */}
                    <div className="flex flex-col items-start">
                        <span
                            className="px-4 py-1.5 rounded-sm text-sm md:text-base mb-3"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                backgroundColor: '#fef08a',
                                color: '#713f12'
                            }}
                        >
                            Insert name of Vandy Student
                        </span>
                        <input
                            type="text"
                            value={nomineeName}
                            onChange={(e) => setNomineeName(e.target.value)}
                            placeholder="      Sabrina Lin ..."
                            className="w-full bg-transparent border-none outline-none text-xl md:text-2xl py-2 font-light"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                color: '#515050ff'
                            }}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col items-start">
                        <span
                            className="px-4 py-1.5 rounded-sm text-sm md:text-base mb-3"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                backgroundColor: '#fecaca',
                                color: '#991b1b'
                            }}
                        >
                            Academic year
                        </span>
                        <input
                            type="email"
                            value={nomineeEmail}
                            onChange={(e) => setNomineeEmail(e.target.value)}
                            placeholder="      sophomore ..."
                            className="w-full bg-transparent border-none outline-none text-xl md:text-2xl py-2 font-light"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                color: '#515050ff'
                            }}
                        />
                    </div>

                    {/* Reason Field */}
                    <div className="flex flex-col items-start">
                        <span
                            className="px-4 py-1.5 rounded-sm text-sm md:text-base mb-3"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                backgroundColor: '#fecaca',
                                color: '#991b1b'
                            }}
                        >
                            In one or two sentences, why should they be nominated?
                        </span>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="      They have been incredibly supportive and deserve recognition..."
                            rows={2}
                            className="w-full bg-transparent border-none outline-none text-xl md:text-2xl py-2 resize-none font-light"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                color: '#515050ff'
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <motion.button
                            onClick={handleSubmit}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#b91c1c] text-white px-8 py-3 rounded-full text-xl shadow-lg flex items-center gap-2"
                            style={{ fontFamily: "'Caveat', cursive" }}
                        >
                            Submit Nomination <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
