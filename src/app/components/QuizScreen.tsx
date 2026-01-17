import { motion } from 'motion/react';

interface QuizScreenProps {
  question: string;
  options: string[];
  progress: number;
  onSelect: (value: string) => void;
  darker?: boolean;
}

export function QuizScreen({ question, options, progress, onSelect, darker }: QuizScreenProps) {
  return (
    <div 
      className="fixed inset-0 flex flex-col" 
      style={{ background: darker ? '#EBE1D3' : '#F2E8DA' }}
    >
      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(142, 7, 95, 0.1)' }}>
        <motion.div
          style={{ 
            height: '100%', 
            background: '#8E075F',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <div className="px-8 pt-16 pb-8">
        <motion.h2
          className="laya-headline"
          style={{ 
            fontSize: '32px',
            lineHeight: '1.3',
            color: '#3D2E28',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {question}
        </motion.h2>
      </div>

      {/* Options */}
      <div className="flex-1 px-8 space-y-3">
        {options.map((option, idx) => (
          <motion.button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full laya-card p-5 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
          >
            <p
              className="laya-body text-left"
              style={{ 
                fontSize: '18px',
                color: '#3D2E28',
                fontWeight: 600,
              }}
            >
              {option}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
