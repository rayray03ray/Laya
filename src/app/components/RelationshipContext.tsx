import { motion } from 'motion/react';

interface RelationshipContextProps {
  onSelect: (value: string) => void;
}

const options = [
  { value: 'dating', label: 'Dating / Situationship' },
  { value: 'living-together', label: 'Living Together' },
  { value: 'married', label: 'Married' },
  { value: 'married-joint', label: 'Married (Joint Family)', highlight: true },
  { value: 'long-distance', label: 'Long Distance' },
];

export function RelationshipContext({ onSelect }: RelationshipContextProps) {
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
          Define your current rhythm.
        </motion.h2>
      </div>

      {/* Options */}
      <div className="flex-1 px-8 space-y-3">
        {options.map((option, idx) => (
          <motion.button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="w-full laya-card p-5 flex items-center"
            style={{
              border: option.highlight ? '2px solid #8E075F' : 'none',
            }}
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
              {option.label}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
