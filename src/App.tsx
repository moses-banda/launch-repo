import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookCover } from './components/BookCover';
import { NotebookPage } from './components/NotebookPage';
import { JoinWaitlist } from './components/JoinWaitlist';
import { Partners } from './components/Partners';
import { NominationPage } from './components/NominationPage';

type Page = 'home' | 'waitlist' | 'partners' | 'nomination';

export default function App() {
  const [showCover, setShowCover] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    // Automatically flip the book after 2.5 seconds
    const timer = setTimeout(() => {
      setIsFlipping(true);
      // Wait for flip animation to complete before showing notebook
      setTimeout(() => {
        setShowCover(false);
      }, 1500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed inset-0 bg-[#2a2420] overflow-hidden">
      <AnimatePresence mode="wait">
        {showCover ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <BookCover isFlipping={isFlipping} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full"
          >
            {currentPage === 'home' && <NotebookPage onNavigate={navigateToPage} />}
            {currentPage === 'waitlist' && <JoinWaitlist onNavigate={navigateToPage} />}
            {currentPage === 'partners' && <Partners onNavigate={navigateToPage} />}
            {currentPage === 'nomination' && <NominationPage onNavigate={navigateToPage} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}