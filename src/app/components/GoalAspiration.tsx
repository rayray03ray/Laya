import { useState } from 'react';
import { motion } from 'motion/react';

interface GoalAspirationProps {
  onComplete: (values: string[]) => void;
}

const options = [
  { value: 'heal', label: 'Heal a disconnect' },
  { value: 'spark', label: 'Reignite the spark' },
  { value: 'communication', label: 'Fix communication loops' },
  { value: 'peace', label: 'Find peace amidst chaos' },
  { value: 'surprises', label: 'Plan better surprises' },
];

export function GoalAspiration({ onComplete }: GoalAspirationProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onComplete(selected);
    }
  };

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
          What brings you to Laya?
        </motion.h2>
        <motion.p
          className="laya-body mt-4"
          style={{ 
            fontSize: '16px',
            color: '#3D2E28',
            opacity: 0.7,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Select all that apply
        </motion.p>
      </div>

      {/* Options */}
      <div className="flex-1 px-8 space-y-3">
        {options.map((option, idx) => {
          const isSelected = selected.includes(option.value);
          return (
            <motion.button
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className="w-full laya-card p-5 flex items-center relative overflow-hidden"
              style={{
                border: isSelected ? '2px solid #F7B731' : 'none',
                background: isSelected ? '#FFFCF8' : '#FFFCF8',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect when selected */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(247, 183, 49, 0.1), rgba(247, 183, 49, 0.05))',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <p
                className="laya-body text-left relative z-10"
                style={{ 
                  fontSize: '18px',
                  color: '#3D2E28',
                  fontWeight: 600,
                }}
              >
                {option.label}
              </p>

              {/* Checkmark */}
              {isSelected && (
                <motion.div
                  className="ml-auto relative z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '12px',
                      background: '#F7B731',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-12 pt-6">
        <motion.button
          onClick={handleContinue}
          className="w-full py-4 laya-button-primary"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
            opacity: selected.length > 0 ? 1 : 0.4,
          }}
          disabled={selected.length === 0}
          whileTap={selected.length > 0 ? { scale: 0.98 } : {}}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}
