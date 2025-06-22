import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StackedCarousel from '../StackedCarousel';
import type { Service } from '@/types';
import { cn } from '@/utils/utils';

interface ServiceNavigatorProps {
  services: Array<Omit<Service, 'permalink'>>;
  className?: string;
  titleClassName?: string;
}

const ServiceNavigator: React.FC<ServiceNavigatorProps> = ({ services, className, titleClassName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceIndex = urlParams.get('serviceIndex');
    if (serviceIndex && !isNaN(Number(serviceIndex))) {
      const index = Math.max(0, Math.min(Number(serviceIndex), services.length - 1));
      setCurrentIndex(index);
    }
  }, [services.length]);

  // Update URL when index changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentIndex === 0) {
      url.searchParams.delete('serviceIndex');
    } else {
      url.searchParams.set('serviceIndex', currentIndex.toString());
    }

    // Update URL without reloading the page
    window.history.replaceState({}, '', url.toString());
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0));
  };

  const startAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 10000); // 10 seconds
  };

  const resetInterval = () => {
    startAutoAdvance();
  };

  // Auto-advance every 10 seconds
  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [services.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1));
    resetInterval();
  };

  const handleGoToNext = () => {
    goToNext();
    resetInterval();
  };

  if (!services || services.length === 0) {
    return null;
  }

  const currentService = services[currentIndex];
  const { title, images, contents } = currentService;

  return (
    <div className={cn('w-100vw flex flex-col gap-8 !px-0 py-8', className)}>
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className={cn('layout text-center underline', titleClassName)}
        >
          {title}
        </motion.h1>
      </AnimatePresence>

      <div className="mt-60 bg-primary py-8">
        <div className={cn('layout relative -mt-56 flex flex-col items-center gap-6')}>
          <motion.button
            onClick={goToPrevious}
            className="absolute left-0 top-60 disabled:opacity-50"
            disabled={currentIndex === 0}
            aria-label="Previous service"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <svg className="size-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleGoToNext}
            className="absolute right-0 top-60 disabled:opacity-50"
            disabled={currentIndex === services.length - 1}
            aria-label="Next service"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <svg className="size-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <StackedCarousel images={images} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-1 flex-col space-y-12"
            >
              <div className="space-y-10">
                {contents.map((content, contentIndex) => (
                  <motion.div
                    key={contentIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: contentIndex * 0.1 }}
                    className="flex flex-col items-center space-y-4 text-background dark:text-foreground"
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: contentIndex * 0.1 + 0.2 }}
                    >
                      {content.heading}
                    </motion.h3>
                    {content.type === 'list' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: contentIndex * 0.1 + 0.3 }}
                        className="flex flex-row gap-3 rounded-lg border border-foreground bg-background/50 px-6 py-2 text-foreground"
                      >
                        {content.point.map((point, index) => (
                          <React.Fragment key={index}>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4, delay: contentIndex * 0.1 + 0.4 + index * 0.05 }}
                              className="font-bold md:text-lg"
                            >
                              {point}
                            </motion.p>
                            {index !== content.point.length - 1 && <div className="w-0.5 bg-foreground" />}
                          </React.Fragment>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: contentIndex * 0.1 + 0.3 }}
                        className="flex flex-wrap justify-center gap-4 text-foreground"
                      >
                        {content.point.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: contentIndex * 0.1 + 0.4 + index * 0.05 }}
                            className="flex items-center gap-2 rounded-lg border border-foreground bg-background/50 px-4 py-2"
                          >
                            <div className="size-2 shrink-0 rounded-full bg-primary" />
                            <p className="font-bold">{point}</p>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServiceNavigator;
