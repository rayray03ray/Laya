import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WelcomeHomeProps {
  partnerName: string;
  onJoin: () => void;
}

export function WelcomeHome({ partnerName, onJoin }: WelcomeHomeProps) {
  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#F2E8DA' }}>
      {/* Premium Unlocked Badge */}
      <motion.div
        className="absolute top-8 right-8 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div
          style={{
            background: '#F7B731',
            color: '#3D2E28',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(247, 183, 49, 0.3)',
          }}
        >
          <Sparkles size={16} fill="#3D2E28" />
          <span
            className="laya-body"
            style={{ 
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            Premium Unlocked
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Decorative element */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              background: 'linear-gradient(135deg, rgba(142, 7, 95, 0.15), rgba(78, 205, 196, 0.15))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Animated rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '2px solid #8E075F',
                  borderRadius: '60px',
                  opacity: 0.3,
                }}
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.3, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut',
                }}
              />
            ))}
            
            {/* Heart icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill="#8E075F"
              />
            </svg>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="laya-headline text-center mb-4"
          style={{ 
            fontSize: '40px',
            lineHeight: '1.2',
            color: '#3D2E28',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to<br />{partnerName}'s Oasis
        </motion.h1>

        {/* Body text */}
        <motion.p
          className="laya-body text-center max-w-sm"
          style={{ 
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#3D2E28',
            opacity: 0.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {partnerName} has invited you to sync your rhythm together. Your premium access is already covered.
        </motion.p>
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-12">
        <motion.button
          onClick={onJoin}
          className="w-full py-4 laya-button-primary"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          Join the Rhythm
        </motion.button>
      </div>
    </div>
  );
}
