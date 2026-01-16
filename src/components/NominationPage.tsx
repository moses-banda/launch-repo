import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

interface NominationPageProps {
    onBack: () => void;
}

export function NominationPage({ onBack }: NominationPageProps) {
    const [nomineeName, setNomineeName] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (nomineeName.trim()) {
            console.log('Nomination Submitted:', { nomineeName, reason });
            onBack(); // Transition back to main page
        }
    };

    return (
        <div className="absolute inset-0 bg-black/40 overflow-hidden flex items-center justify-center p-4 z-50 pointer-events-auto backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 2 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md relative bg-[#d4a574] p-6 md:p-8 shadow-xl transform"
                style={{
                    fontFamily: "'Caveat', cursive",
                    boxShadow: '8px 8px 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 rotate-1 backdrop-blur-sm shadow-sm" />

                {/* Cancel Button with hover grow */}
                <motion.button
                    onClick={onBack}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity p-1"
                >
                    <X className="w-6 h-6 text-[#4a3728]" />
                </motion.button>

                <h2
                    className="text-2xl md:text-3xl text-center mb-6 font-normal"
                    style={{ color: '#4a3728' }}
                >
                    Nominate a Voice
                </h2>

                <div className="space-y-5">
                    <div>
                        <label
                            className="block text-lg mb-1 font-normal"
                            style={{ color: '#5a4535' }}
                        >
                            Name of Vandy Student
                        </label>
                        <input
                            type="text"
                            value={nomineeName}
                            onChange={(e) => setNomineeName(e.target.value)}
                            placeholder="Enter their first name..."
                            className="w-full bg-white/30 border-b-2 border-[#4a3728]/30 focus:border-[#4a3728] outline-none text-lg p-2 transition-colors placeholder:text-[#7a6555]"
                            style={{ color: '#3a2a1a' }}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-lg mb-1 font-normal"
                            style={{ color: '#5a4535' }}
                        >
                            Why should they be the voice? (optional)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={2}
                            placeholder="Tell us briefly..."
                            className="w-full bg-white/30 border-b-2 border-[#4a3728]/30 focus:border-[#4a3728] outline-none text-lg p-2 transition-colors resize-none placeholder:text-[#7a6555]"
                            style={{ color: '#3a2a1a' }}
                        />
                    </div>

                    <div className="flex justify-center pt-2">
                        <motion.button
                            onClick={handleSubmit}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#4a3728] text-[#f5ebe0] px-6 py-2.5 rounded-full text-lg shadow-lg flex items-center gap-2"
                        >
                            Submit <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
