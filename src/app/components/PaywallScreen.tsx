import { motion } from 'motion/react';
import { Check, Shield } from 'lucide-react';
import { useState } from 'react';

interface PaywallScreenProps {
  onSubscribe: (plan: string) => void;
}

const features = [
  "Daily 'Us' Questions",
  "Occasions Calendar",
  "Memories Timeline",
  "Gamified Feelings Streak",
];

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '₹999',
    period: '/mo',
    badge: null,
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '₹299',
    period: '/mo',
    billedAnnually: true,
    badge: 'Save 70% | Most Popular',
    highlight: true,
  },
];

export function PaywallScreen({ onSubscribe }: PaywallScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  return (
    <div className="fixed inset-0 flex flex-col overflow-y-auto" style={{ background: '#F2E8DA' }}>
      {/* Header */}
      <div className="px-8 pt-16 pb-8">
        <motion.h2
          className="laya-headline text-center"
          style={{ 
            fontSize: '36px',
            lineHeight: '1.3',
            color: '#3D2E28',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Unlock Your Harmony Plan
        </motion.h2>
        <motion.p
          className="laya-body text-center mt-4"
          style={{ 
            fontSize: '18px',
            color: '#3D2E28',
            opacity: 0.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Don't let the noise drown out your love.
        </motion.p>
      </div>

      {/* Features */}
      <div className="px-8 mb-8">
        <motion.div
          className="laya-card p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '12px',
                  background: '#4ECDC4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={14} color="white" strokeWidth={3} />
              </div>
              <p
                className="laya-body"
                style={{ 
                  fontSize: '16px',
                  color: '#3D2E28',
                  fontWeight: 600,
                }}
              >
                {feature}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pricing cards */}
      <div className="px-8 mb-8 space-y-4">
        {plans.map((plan, idx) => (
          <motion.button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className="w-full laya-card p-5 relative"
            style={{
              border: plan.highlight 
                ? selectedPlan === plan.id 
                  ? '3px solid #8E075F' 
                  : '3px solid #8E075F'
                : selectedPlan === plan.id 
                  ? '2px solid #8E075F' 
                  : 'none',
              transform: plan.highlight ? 'scale(1.02)' : 'scale(1)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + idx * 0.1, duration: 0.4 }}
            whileTap={{ scale: plan.highlight ? 1 : 0.98 }}
          >
            {/* Badge */}
            {plan.badge && (
              <div
                className="absolute -top-3 left-1/2"
                style={{ transform: 'translateX(-50%)' }}
              >
                <div
                  style={{
                    background: '#F7B731',
                    color: '#3D2E28',
                    padding: '4px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 700,
                  }}
                >
                  {plan.badge}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p
                  className="laya-body text-left mb-1"
                  style={{ 
                    fontSize: '18px',
                    color: '#3D2E28',
                    fontWeight: 700,
                  }}
                >
                  {plan.name}
                </p>
                {plan.billedAnnually && (
                  <p
                    className="laya-body text-left"
                    style={{ 
                      fontSize: '13px',
                      color: '#3D2E28',
                      opacity: 0.6,
                    }}
                  >
                    Billed Annually
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <p
                  className="laya-headline"
                  style={{ 
                    fontSize: '28px',
                    color: '#3D2E28',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                  <span
                    className="laya-body"
                    style={{ 
                      fontSize: '16px',
                      opacity: 0.7,
                    }}
                  >
                    {plan.period}
                  </span>
                </p>
              </div>

              {/* Radio indicator */}
              <div
                className="ml-4"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '12px',
                  border: `2px solid ${selectedPlan === plan.id ? '#8E075F' : 'rgba(61, 46, 40, 0.3)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedPlan === plan.id && (
                  <motion.div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '6px',
                      background: '#8E075F',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-6">
        <motion.button
          onClick={() => onSubscribe(selectedPlan)}
          className="w-full py-4 laya-button-primary relative overflow-hidden"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Pulsing animation */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
            }}
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <span className="relative z-10">Start My Transformation</span>
        </motion.button>
      </div>

      {/* Trust indicators */}
      <motion.div
        className="px-8 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield size={16} style={{ color: '#4ECDC4' }} />
          <p
            className="laya-body text-center"
            style={{ 
              fontSize: '14px',
              color: '#3D2E28',
              opacity: 0.7,
            }}
          >
            100% Risk-Free. Cancel anytime.
          </p>
        </div>
        <p
          className="laya-body text-center"
          style={{ 
            fontSize: '14px',
            color: '#3D2E28',
            opacity: 0.7,
          }}
        >
          Trusted by 50,000+ couples
        </p>
      </motion.div>
    </div>
  );
}
