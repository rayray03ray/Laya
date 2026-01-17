import { motion } from 'motion/react';
import { Users, User, Heart } from 'lucide-react';

interface IdentitySetupProps {
  onSelect: (value: string) => void;
}

const options = [
  { value: 'partner', label: 'My Partner', icon: Users },
  { value: 'solo', label: 'Just Me (For Now)', icon: User },
  { value: 'fiance', label: 'My Fiancé/Fiancée', icon: Heart },
];

export function IdentitySetup({ onSelect }: IdentitySetupProps) {
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
          Who are we syncing with today?
        </motion.h2>
      </div>

      {/* Options */}
      <div className="flex-1 px-8 space-y-4">
        {options.map((option, idx) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="w-full laya-card p-6 flex items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#F2E8DA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={28} style={{ color: '#8E075F' }} strokeWidth={1.5} />
              </div>
              
              <p
                className="laya-body flex-1 text-left"
                style={{ 
                  fontSize: '20px',
                  color: '#3D2E28',
                  fontWeight: 600,
                }}
              >
                {option.label}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
