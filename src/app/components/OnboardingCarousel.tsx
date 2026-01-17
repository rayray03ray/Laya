import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Calendar, Heart, MessageCircle, Users } from 'lucide-react';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: TrendingUp,
    headline: "From Dissonance to Harmony",
    body: "Sync your emotional worlds in just 5 minutes a day.",
  },
  {
    icons: [Calendar, Heart, MessageCircle],
    headline: "The Ultimate Relationship Toolkit",
    body: "Memories, Nudges, Shared Calendars, and more.",
  },
  {
    icon: Users,
    headline: "Join 50,000+ Couples",
    body: "Finding their rhythm in a chaotic world.",
  },
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#F2E8DA' }}>
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-md"
          >
            {/* Icon(s) */}
            <div className="mb-12 flex justify-center gap-6">
              {slide.icons ? (
                slide.icons.map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Icon size={48} style={{ color: '#8E075F' }} strokeWidth={1.5} />
                  </motion.div>
                ))
              ) : slide.icon ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <slide.icon size={64} style={{ color: '#8E075F' }} strokeWidth={1.5} />
                </motion.div>
              ) : null}
            </div>

            {/* Headline */}
            <h2 
              className="laya-headline mb-6"
              style={{ 
                fontSize: '32px',
                lineHeight: '1.3',
                color: '#3D2E28',
              }}
            >
              {slide.headline}
            </h2>

            {/* Body */}
            <p
              className="laya-body"
              style={{ 
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#3D2E28',
                opacity: 0.8,
              }}
            >
              {slide.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: idx === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: idx === currentSlide ? '#8E075F' : 'rgba(142, 7, 95, 0.2)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-12">
        <motion.button
          onClick={handleNext}
          className="w-full py-4 laya-button-primary"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {currentSlide === slides.length - 1 ? "Start Your Journey" : "Continue"}
        </motion.button>
      </div>
    </div>
  );
}
