import { motion } from 'motion/react';
import { useState } from 'react';

interface MinimalSetupProps {
  onComplete: (data: { name: string; dob: string; gender: string }) => void;
}

export function MinimalSetup({ onComplete }: MinimalSetupProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (name && dob && gender) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete({ name, dob, gender });
      }, 2500);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: '#F2E8DA' }}>
        {/* Interlocking rings animation */}
        <motion.div className="mb-8" style={{ position: 'relative', width: '200px', height: '120px' }}>
          {/* Ring 1 */}
          <motion.div
            style={{
              position: 'absolute',
              left: '20px',
              top: '20px',
              width: '80px',
              height: '80px',
              border: '6px solid #8E075F',
              borderRadius: '50%',
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Ring 2 */}
          <motion.div
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              width: '80px',
              height: '80px',
              border: '6px solid #4ECDC4',
              borderRadius: '50%',
            }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Sparkle effect */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 180 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path
                d="M20 0L22 18L20 40L18 18L20 0Z M0 20L18 22L40 20L18 18L0 20Z"
                fill="#F7B731"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Success text */}
        <motion.h2
          className="laya-headline text-center"
          style={{ 
            fontSize: '32px',
            color: '#3D2E28',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Sync Complete
        </motion.h2>
      </div>
    );
  }

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
          Let's get to know you
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
          Just 3 quick things to personalize your experience
        </motion.p>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 space-y-6">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <label
            className="laya-body block mb-3"
            style={{ 
              fontSize: '16px',
              color: '#3D2E28',
              fontWeight: 600,
            }}
          >
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="laya-card w-full p-4"
            style={{
              fontSize: '16px',
              fontFamily: 'var(--laya-font-body)',
              color: '#3D2E28',
              border: 'none',
              outline: 'none',
            }}
          />
        </motion.div>

        {/* Date of Birth */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <label
            className="laya-body block mb-3"
            style={{ 
              fontSize: '16px',
              color: '#3D2E28',
              fontWeight: 600,
            }}
          >
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="laya-card w-full p-4"
            style={{
              fontSize: '16px',
              fontFamily: 'var(--laya-font-body)',
              color: '#3D2E28',
              border: 'none',
              outline: 'none',
            }}
          />
          <p
            className="laya-body mt-2"
            style={{ 
              fontSize: '13px',
              color: '#3D2E28',
              opacity: 0.5,
            }}
          >
            For rhythm calculation & astrology insights
          </p>
        </motion.div>

        {/* Gender */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <label
            className="laya-body block mb-3"
            style={{ 
              fontSize: '16px',
              color: '#3D2E28',
              fontWeight: 600,
            }}
          >
            Gender
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((option) => (
              <button
                key={option}
                onClick={() => setGender(option)}
                className="laya-card p-4"
                style={{
                  border: gender === option ? '2px solid #8E075F' : 'none',
                  background: gender === option ? '#FFFCF8' : '#FFFCF8',
                }}
              >
                <p
                  className="laya-body"
                  style={{ 
                    fontSize: '15px',
                    color: '#3D2E28',
                    fontWeight: gender === option ? 700 : 500,
                  }}
                >
                  {option}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-12 pt-6">
        <motion.button
          onClick={handleSubmit}
          className="w-full py-4 laya-button-primary"
          style={{
            fontSize: '18px',
            fontFamily: 'var(--laya-font-body)',
            fontWeight: 600,
            opacity: name && dob && gender ? 1 : 0.4,
          }}
          disabled={!name || !dob || !gender}
          initial={{ opacity: 0 }}
          animate={{ opacity: name && dob && gender ? 1 : 0.4 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileTap={name && dob && gender ? { scale: 0.98 } : {}}
        >
          Complete Setup
        </motion.button>
      </div>
    </div>
  );
}
