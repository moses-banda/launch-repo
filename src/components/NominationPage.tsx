import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

interface NominationPageProps {
    onBack: () => void;
}

export function NominationPage({ onBack }: NominationPageProps) {
    const [nomineeName, setNomineeName] = useState('');
    const [nomineeEmail, setNomineeEmail] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        // In a real app, submit here
        console.log('Nomination Submitted:', { nomineeName, nomineeEmail, reason });
        onBack();
    };

    return (
        <div className="absolute inset-0 bg-black/50 overflow-hidden flex items-center justify-center p-4 z-50 pointer-events-auto backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg relative bg-[#fefce8] p-8 md:p-12 shadow-[10px_10px_30px_rgba(0,0,0,0.3)] transform rotate-1"
                style={{
                    boxShadow: '10px 10px 30px rgba(0,0,0,0.3), inset 0 0 40px rgba(0,0,0,0.05)',
                }}
            >
                {/* Sticky Note Tape */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-32 h-8 bg-white/40 rotate-1 backdrop-blur-sm shadow-sm" />

                <button
                    onClick={onBack}
                    className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
                >
                    <X className="w-6 h-6 text-[#2d2d2d]" />
                </button>

                <h2
                    className="text-3xl md:text-4xl text-center mb-8"
                    style={{ fontFamily: "'Caveat', cursive", color: '#b91c1c' }}
                >
                    Nominate a Voice
                </h2>

                <div className="space-y-6">
                    <div>
                        <label
                            className="block text-xl mb-2"
                            style={{ fontFamily: "'Caveat', cursive", color: '#4a4a4a' }}
                        >
                            First Name of Vandy Student
                        </label>
                        <input
                            type="text"
                            value={nomineeName}
                            onChange={(e) => setNomineeName(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-[#b91c1c]/20 focus:border-[#b91c1c] outline-none text-xl p-2 transition-colors"
                            style={{ fontFamily: "'Caveat', cursive", color: '#2d2d2d' }}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xl mb-2"
                            style={{ fontFamily: "'Caveat', cursive", color: '#4a4a4a' }}
                        >
                            Vanderbilt or Personal Email
                        </label>
                        <input
                            type="email"
                            value={nomineeEmail}
                            onChange={(e) => setNomineeEmail(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-[#b91c1c]/20 focus:border-[#b91c1c] outline-none text-xl p-2 transition-colors"
                            style={{ fontFamily: "'Caveat', cursive", color: '#2d2d2d' }}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xl mb-2"
                            style={{ fontFamily: "'Caveat', cursive", color: '#4a4a4a' }}
                        >
                            Why should they be the voice?
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            className="w-full bg-transparent border-b-2 border-[#b91c1c]/20 focus:border-[#b91c1c] outline-none text-xl p-2 transition-colors resize-none"
                            style={{ fontFamily: "'Caveat', cursive", color: '#2d2d2d' }}
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <motion.button
                            onClick={handleSubmit}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#b91c1c] text-[#fefce8] px-8 py-3 rounded-full text-xl shadow-lg flex items-center gap-2"
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
