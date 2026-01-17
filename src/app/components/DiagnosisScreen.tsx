import { motion } from 'motion/react';

interface DiagnosisScreenProps {
  onContinue: () => void;
}

export function DiagnosisScreen({ onContinue }: DiagnosisScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#F2E8DA' }}>
      {/* Header */}
      <div className="px-8 pt-16 pb-8">
        <motion.h2
          className="laya-headline"
          style={{ 
            fontSize: '36px',
            lineHeight: '1.3',
            color: '#3D2E28',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Laya Analysis
        </motion.h2>
      </div>

      {/* Graph visualization */}
      <div className="flex-1 px-8 flex flex-col justify-center">
        <motion.div
          className="laya-card p-8 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Labels */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <div style={{ width: '16px', height: '3px', background: '#999' }} />
              <span className="laya-body" style={{ fontSize: '14px', color: '#3D2E28', opacity: 0.7 }}>
                Current Laya
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: '16px', height: '3px', background: '#4ECDC4' }} />
              <span className="laya-body" style={{ fontSize: '14px', color: '#3D2E28', opacity: 0.7 }}>
                Potential Laya
              </span>
            </div>
          </div>

          {/* Graph */}
          <div className="relative" style={{ height: '200px' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none">
              {/* Current Laya - Jagged line */}
              <motion.path
                d="M 0,120 L 30,140 L 60,100 L 90,130 L 120,90 L 150,125 L 180,95 L 210,120 L 240,110 L 270,130 L 300,115"
                fill="none"
                stroke="#999"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              
              {/* Potential Laya - Smooth sine wave */}
              <motion.path
                d="M 0,100 Q 75,60 150,100 T 300,100"
                fill="none"
                stroke="#4ECDC4"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Analysis text */}
        <motion.div
          className="laya-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <p
            className="laya-body"
            style={{ 
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#3D2E28',
            }}
          >
            You have a <span style={{ fontWeight: 700, color: '#8E075F' }}>strong foundation in Trust</span>, but your <span style={{ fontWeight: 700, color: '#8E075F' }}>Communication Rhythm</span> is out of phase.
          </p>
          <p
            className="laya-body mt-4"
            style={{ 
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#3D2E28',
            }}
          >
            Your Laya can be synchronized in <span style={{ fontWeight: 700, color: '#4ECDC4' }}>28 days</span>.
          </p>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-12 pt-6">
        <motion.button
          onClick={onContinue}
          className="w-full py-4 laya-button-primary"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          See My Harmony Plan
        </motion.button>
      </div>
    </div>
  );
}
