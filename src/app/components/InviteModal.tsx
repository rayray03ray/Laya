import { motion } from 'motion/react';
import { Share2, CheckCircle } from 'lucide-react';

interface InviteModalProps {
  onShare: () => void;
  onSkip: () => void;
}

export function InviteModal({ onShare, onSkip }: InviteModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-8" style={{ background: 'rgba(61, 46, 40, 0.4)' }}>
      <motion.div
        className="laya-card p-8 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ticket illustration */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative" style={{ height: '160px' }}>
            {/* Left side - User A (colored) */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: 'calc(50% - 8px)',
                background: 'linear-gradient(135deg, #8E075F 0%, #4ECDC4 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Ticket notch */}
              <div
                style={{
                  position: 'absolute',
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '32px',
                  background: '#FFFCF8',
                  borderRadius: '0 8px 8px 0',
                }}
              />
              <CheckCircle size={48} color="white" strokeWidth={1.5} />
            </div>

            {/* Right side - User B (dotted outline) */}
            <div
              className="absolute right-0 top-0 bottom-0"
              style={{
                width: 'calc(50% - 8px)',
                border: '2px dashed rgba(142, 7, 95, 0.3)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Ticket notch */}
              <div
                style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '32px',
                  background: '#FFFCF8',
                  borderRadius: '8px 0 0 8px',
                }}
              />
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  border: '2px dashed rgba(142, 7, 95, 0.3)',
                }}
              />
            </div>

            {/* Center divider line */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(142, 7, 95, 0.2) 20%, rgba(142, 7, 95, 0.2) 80%, transparent 80%, transparent 100%)',
                backgroundSize: '2px 12px',
              }}
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h3
          className="laya-headline text-center mb-3"
          style={{ 
            fontSize: '28px',
            lineHeight: '1.3',
            color: '#3D2E28',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Laya is better together.
        </motion.h3>

        <motion.p
          className="laya-body text-center mb-6"
          style={{ 
            fontSize: '16px',
            color: '#3D2E28',
            opacity: 0.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Invite your partner for FREE.
        </motion.p>

        {/* Primary CTA */}
        <motion.button
          onClick={onShare}
          className="w-full py-4 laya-button-primary mb-4 flex items-center justify-center gap-3"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 size={20} />
          Share Invite Link
        </motion.button>

        {/* Micro-copy */}
        <motion.p
          className="laya-body text-center"
          style={{ 
            fontSize: '13px',
            color: '#3D2E28',
            opacity: 0.6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          They skip the paywall. You've got them covered.
        </motion.p>

        {/* Skip option */}
        <motion.button
          onClick={onSkip}
          className="w-full mt-6 py-2"
          style={{
            fontSize: '15px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 500,
            color: '#3D2E28',
            opacity: 0.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ opacity: 0.8 }}
        >
          I'll do this later
        </motion.button>
      </motion.div>
    </div>
  );
}
