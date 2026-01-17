import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [stage, setStage] = useState(0);
  
  const stages = [
    "Analyzing your Laya...",
    "Identifying your Rhythm...",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1500);
    const timer2 = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: '#F2E8DA' }}>
      {/* Animated data visualization */}
      <div className="mb-16 relative" style={{ width: '200px', height: '200px' }}>
        {/* Central node */}
        <motion.div
          className="absolute"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#8E075F',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orbiting nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: i % 2 === 0 ? '#4ECDC4' : '#F7B731',
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, x, 0],
                y: [0, y, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const radius = 80;
            const x = Math.cos(angle) * radius + 100;
            const y = Math.sin(angle) * radius + 100;

            return (
              <motion.line
                key={i}
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                stroke="#8E075F"
                strokeWidth="1"
                opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Status text */}
      <motion.p
        className="laya-body text-center"
        style={{ 
          fontSize: '20px',
          color: '#3D2E28',
          fontWeight: 600,
        }}
        key={stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {stages[stage]}
      </motion.p>
    </div>
  );
}
