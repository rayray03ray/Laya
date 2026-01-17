import { motion } from 'motion/react';
import { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background: '#F2E8DA' }}>
      {/* Pulsing fluid shapes */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Terracotta blob */}
        <motion.div
          className="absolute"
          style={{
            width: '200px',
            height: '200px',
            background: '#8E075F',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: [
              '40% 60% 70% 30% / 40% 50% 60% 50%',
              '60% 40% 30% 70% / 50% 60% 40% 60%',
              '40% 60% 70% 30% / 40% 50% 60% 50%',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Oasis Teal blob */}
        <motion.div
          className="absolute"
          style={{
            width: '180px',
            height: '180px',
            background: '#4ECDC4',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 70% 60% 40% / 40% 70% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        
        {/* Text Content */}
        <div className="relative z-10 text-center">
          <motion.h1
            className="laya-headline mb-4"
            style={{ 
              fontSize: '64px',
              color: '#3D2E28',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Laya
          </motion.h1>
          
          <motion.p
            className="laya-body"
            style={{ 
              fontSize: '18px',
              color: '#3D2E28',
              opacity: 0.8,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Find Your Rhythm
          </motion.p>
        </div>
      </div>
    </div>
  );
}
