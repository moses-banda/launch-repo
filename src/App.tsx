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
            style={{ perspective: "1200px" }}
          >
            <AnimatePresence mode="wait">
              {currentPage === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full absolute inset-0"
                >
                  <NotebookPage onNavigate={navigateToPage} />
                </motion.div>
              )}
              {currentPage === 'waitlist' && (
                <motion.div
                  key="waitlist"
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full absolute inset-0"
                >
                  <JoinWaitlist onNavigate={navigateToPage} />
                </motion.div>
              )}
              {currentPage === 'partners' && (
                <motion.div
                  key="partners"
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full absolute inset-0"
                >
                  <Partners onNavigate={navigateToPage} />
                </motion.div>
              )}
              {currentPage === 'nomination' && (
                <motion.div
                  key="nomination"
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full absolute inset-0"
                >
                  <NominationPage onNavigate={navigateToPage} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}