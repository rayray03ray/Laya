import { useState } from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DemoNavigatorProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

const screens = [
  { id: 'splash', label: '01: Splash' },
  { id: 'onboarding', label: '02: Onboarding' },
  { id: 'identity', label: '03: Identity Setup' },
  { id: 'relationship', label: '04: Relationship Context' },
  { id: 'goals', label: '05: Goals' },
  { id: 'quiz1', label: '06: Quiz 1' },
  { id: 'quiz2', label: '07: Quiz 2' },
  { id: 'quiz3', label: '08: Quiz 3' },
  { id: 'vulnerability', label: '09: Vulnerability' },
  { id: 'processing', label: '10: Processing' },
  { id: 'diagnosis', label: '11: Diagnosis' },
  { id: 'paywall', label: '12: Paywall' },
  { id: 'invite', label: '13: Invite Modal' },
  { id: 'partner-welcome', label: '14: Partner Welcome' },
  { id: 'partner-setup', label: '15: Partner Setup' },
  { id: 'home', label: '16: Home Dashboard' },
  { id: 'memories-timeline', label: '22: Memories Timeline' },
  { id: 'memories-add-form', label: '23: Add Memory Form' },
  { id: 'memories-detail', label: '24: Memory Detail' },
];

export function DemoNavigator({ onNavigate, currentScreen }: DemoNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '28px',
          background: '#8E075F',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(142, 7, 95, 0.4)',
          zIndex: 1000,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Menu size={24} />
      </button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(61, 46, 40, 0.5)',
                zIndex: 999,
              }}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                right: 0,
                top: 0,
                bottom: 0,
                width: '320px',
                background: '#FFFCF8',
                boxShadow: '-4px 0 24px rgba(61, 46, 40, 0.15)',
                zIndex: 1000,
                overflowY: 'auto',
                padding: '24px',
              }}
            >
              <h3
                className="laya-headline mb-6"
                style={{ 
                  fontSize: '24px',
                  color: '#3D2E28',
                }}
              >
                Demo Navigator
              </h3>

              <div className="space-y-2">
                {screens.map((screen) => (
                  <button
                    key={screen.id}
                    onClick={() => {
                      onNavigate(screen.id);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3"
                    style={{
                      background: currentScreen === screen.id ? '#F2E8DA' : 'transparent',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      className="laya-body"
                      style={{ 
                        fontSize: '15px',
                        color: '#3D2E28',
                        fontWeight: currentScreen === screen.id ? 700 : 500,
                      }}
                    >
                      {screen.label}
                    </span>
                    <ChevronRight 
                      size={18} 
                      style={{ 
                        color: '#3D2E28',
                        opacity: currentScreen === screen.id ? 1 : 0.3,
                      }} 
                    />
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(61, 46, 40, 0.1)' }}>
                <p
                  className="laya-body text-center"
                  style={{ 
                    fontSize: '13px',
                    color: '#3D2E28',
                    opacity: 0.6,
                  }}
                >
                  Navigate between screens for demo purposes
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}