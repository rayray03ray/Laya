import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Home, Calendar, Image, Gift, Lock, Flame, CheckSquare, Activity, User } from 'lucide-react';
import { PlanTab } from '@/app/components/PlanTab';
import { MemoriesTab } from '@/app/components/MemoriesTab';
import { ProfileTab } from '@/app/components/ProfileTab';

interface HomeDashboardProps {
  userName: string;
  partnerName?: string;
}

type Tab = 'home' | 'plan' | 'memories' | 'gifting';

const moodEmojis = [
  { emoji: '😔', label: 'Tired', value: 1 },
  { emoji: '😐', label: 'Okay', value: 2 },
  { emoji: '🙂', label: 'Good', value: 3 },
  { emoji: '😊', label: 'Happy', value: 4 },
  { emoji: '🤩', label: 'Energetic', value: 5 },
];

const quickNudges = [
  { icon: '🤗', label: 'Send Hug', color: '#8E075F' },
  { icon: '💧', label: 'Water Reminder', color: '#4ECDC4' },
  { icon: '💕', label: 'Miss You', color: '#F7B731' },
  { icon: '⏰', label: 'Late Alert', color: '#3D2E28' },
];

export function HomeDashboard({ userName, partnerName = 'Partner' }: HomeDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showProfile, setShowProfile] = useState(false);
  const [userMood, setUserMood] = useState<number | null>(3); // Demo: User has logged mood
  const [partnerMood, setPartnerMood] = useState<number | null>(null); // Demo: Partner hasn't
  const [dailyAnswer, setDailyAnswer] = useState('');
  const [partnerHasAnswered, setPartnerHasAnswered] = useState(true); // Demo: Partner answered

  const handleMoodSelect = (mood: number) => {
    setUserMood(mood);
  };

  const handleShareAnswer = () => {
    if (dailyAnswer.trim()) {
      // Mock reveal logic
      alert('Answer shared! Your partner\'s answer is now revealed.');
      setPartnerHasAnswered(false);
    }
  };

  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[today.getMonth()]} ${today.getDate()}`;
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex-1 overflow-y-auto pb-24">
            {/* Enhanced Header */}
            <div className="px-6 pt-8 pb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p
                    className="laya-body"
                    style={{ 
                      fontSize: '16px',
                      color: '#3D2E28',
                      opacity: 0.7,
                    }}
                  >
                    {getGreeting()}, {userName}
                  </p>
                  
                  {/* Date Badge */}
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      style={{
                        background: 'rgba(142, 7, 95, 0.1)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        display: 'inline-block',
                      }}
                    >
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '13px',
                          color: '#8E075F',
                          fontWeight: 600,
                        }}
                      >
                        {getCurrentDate()} • Today's Rhythm
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Laya Score */}
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #8E075F, #4ECDC4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Activity size={20} color="white" strokeWidth={2.5} />
                    
                    {/* Pulse animation */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '22px',
                        border: '2px solid #8E075F',
                        opacity: 0.4,
                      }}
                      animate={{
                        scale: [1, 1.3, 1.3],
                        opacity: [0.4, 0, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                  <div>
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '11px',
                        color: '#3D2E28',
                        opacity: 0.6,
                        lineHeight: 1,
                      }}
                    >
                      Laya Score
                    </p>
                    <p
                      className="laya-headline"
                      style={{ 
                        fontSize: '20px',
                        color: '#8E075F',
                        lineHeight: 1,
                        marginTop: '2px',
                      }}
                    >
                      85
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 space-y-5">
              {/* Hero: Sync Status & Streak Card */}
              <motion.div
                className="laya-card p-6 relative overflow-hidden"
                style={{
                  background: userMood && partnerMood ? 'linear-gradient(135deg, rgba(142, 7, 95, 0.05), rgba(78, 205, 196, 0.05))' : '#FFFCF8',
                  boxShadow: userMood && partnerMood ? '0 8px 24px rgba(142, 7, 95, 0.15)' : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Streak Counter - Top Right */}
                <div className="absolute top-5 right-5 flex items-center gap-2">
                  <Flame size={20} style={{ color: '#F7B731' }} fill="#F7B731" />
                  <div>
                    <p
                      className="laya-headline"
                      style={{ 
                        fontSize: '18px',
                        color: '#3D2E28',
                        lineHeight: 1,
                      }}
                    >
                      12
                    </p>
                    <p
                      className="laya-body"
                      style={{ 
                        fontSize: '11px',
                        color: '#3D2E28',
                        opacity: 0.6,
                        lineHeight: 1,
                        marginTop: '2px',
                      }}
                    >
                      Day Streak
                    </p>
                  </div>
                </div>

                <h3
                  className="laya-headline mb-6"
                  style={{ 
                    fontSize: '22px',
                    color: '#3D2E28',
                    paddingRight: '80px', // Space for streak counter
                  }}
                >
                  Today's Sync
                </h3>

                {!userMood ? (
                  /* Mood selection - User hasn't logged yet */
                  <>
                    <p
                      className="laya-body mb-4"
                      style={{ 
                        fontSize: '15px',
                        color: '#3D2E28',
                        opacity: 0.7,
                      }}
                    >
                      How are you feeling?
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      {moodEmojis.map((mood, idx) => (
                        <motion.button
                          key={mood.value}
                          onClick={() => handleMoodSelect(mood.value)}
                          className="flex flex-col items-center gap-2 p-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div
                            style={{
                              fontSize: '32px',
                              lineHeight: 1,
                            }}
                          >
                            {mood.emoji}
                          </div>
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '11px',
                              color: '#3D2E28',
                              opacity: 0.7,
                            }}
                          >
                            {mood.label}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Dual Avatar State */
                  <div className="flex items-center justify-around gap-6">
                    {/* User Avatar */}
                    <div className="flex flex-col items-center gap-3">
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '40px',
                          background: 'linear-gradient(135deg, #8E075F, #4ECDC4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '40px',
                          boxShadow: '0 4px 16px rgba(142, 7, 95, 0.2)',
                        }}
                      >
                        {moodEmojis[userMood - 1].emoji}
                      </div>
                      <div className="text-center">
                        <p
                          className="laya-body"
                          style={{ 
                            fontSize: '15px',
                            color: '#3D2E28',
                            fontWeight: 700,
                          }}
                        >
                          You
                        </p>
                        <p
                          className="laya-body"
                          style={{ 
                            fontSize: '12px',
                            color: '#3D2E28',
                            opacity: 0.6,
                          }}
                        >
                          {moodEmojis[userMood - 1].label}
                        </p>
                      </div>
                    </div>

                    {/* Partner Avatar */}
                    {!partnerMood ? (
                      /* Scenario A: Partner hasn't answered - Waiting State */
                      <div className="flex flex-col items-center gap-3">
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '40px',
                            border: '3px dashed rgba(142, 7, 95, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(142, 7, 95, 0.05)',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '20px',
                              border: '2px dashed rgba(142, 7, 95, 0.3)',
                            }}
                          />
                        </div>
                        <div className="text-center">
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '15px',
                              color: '#3D2E28',
                              fontWeight: 700,
                            }}
                          >
                            {partnerName}
                          </p>
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '12px',
                              color: '#3D2E28',
                              opacity: 0.5,
                              fontStyle: 'italic',
                            }}
                          >
                            Waiting for {partnerName}...
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Scenario C: Both have answered */
                      <div className="flex flex-col items-center gap-3">
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '40px',
                            background: 'linear-gradient(135deg, #4ECDC4, #F7B731)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '40px',
                            boxShadow: '0 4px 16px rgba(78, 205, 196, 0.2)',
                          }}
                        >
                          {moodEmojis[partnerMood - 1].emoji}
                        </div>
                        <div className="text-center">
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '15px',
                              color: '#3D2E28',
                              fontWeight: 700,
                            }}
                          >
                            {partnerName}
                          </p>
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '12px',
                              color: '#3D2E28',
                              opacity: 0.6,
                            }}
                          >
                            {moodEmojis[partnerMood - 1].label}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Daily "Us" Question - With Curiosity Gap */}
              <motion.div
                className="laya-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3
                  className="laya-headline mb-4"
                  style={{ 
                    fontSize: '20px',
                    color: '#3D2E28',
                    lineHeight: '1.4',
                  }}
                >
                  What is one small thing {partnerName} did this week that made you smile?
                </h3>

                <textarea
                  value={dailyAnswer}
                  onChange={(e) => setDailyAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 mb-4"
                  style={{
                    background: '#F2E8DA',
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontFamily: 'var(--laya-font-body)',
                    color: '#3D2E28',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    minHeight: '100px',
                  }}
                />

                {/* Partner's Locked Answer - Curiosity Gap */}
                {partnerHasAnswered && (
                  <motion.div
                    className="mb-4 p-4"
                    style={{
                      background: 'rgba(142, 7, 95, 0.05)',
                      borderRadius: '12px',
                      border: '1px dashed rgba(142, 7, 95, 0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {/* Blurred text */}
                    <div
                      style={{
                        filter: 'blur(6px)',
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    >
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '15px',
                          color: '#3D2E28',
                          lineHeight: '1.6',
                        }}
                      >
                        The way you surprised me with breakfast in bed last Sunday morning was so thoughtful...
                      </p>
                    </div>
                    
                    {/* Lock overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Lock size={16} style={{ color: '#8E075F' }} />
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '13px',
                          color: '#8E075F',
                          fontWeight: 600,
                        }}
                      >
                        {partnerName} has already answered
                      </p>
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={handleShareAnswer}
                  className="w-full py-3"
                  style={{
                    background: dailyAnswer.trim() ? '#8E075F' : 'rgba(142, 7, 95, 0.3)',
                    color: 'white',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                    border: 'none',
                    cursor: dailyAnswer.trim() ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!dailyAnswer.trim()}
                >
                  {partnerHasAnswered ? 'Answer to Unlock' : 'Share to Reveal'}
                </button>
              </motion.div>

              {/* Up Next Context Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3
                  className="laya-body mb-3"
                  style={{ 
                    fontSize: '18px',
                    color: '#3D2E28',
                    fontWeight: 700,
                  }}
                >
                  Up Next
                </h3>

                <div className="space-y-3">
                  {/* Reminder Card - Anniversary */}
                  <motion.div
                    className="p-4 flex items-center gap-4"
                    style={{
                      background: 'rgba(247, 183, 49, 0.15)',
                      borderRadius: '16px',
                      border: '1px solid rgba(247, 183, 49, 0.3)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '24px',
                        background: '#F7B731',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '15px',
                          color: '#3D2E28',
                          fontWeight: 700,
                          marginBottom: '2px',
                        }}
                      >
                        Upcoming: 3rd Anniversary
                      </p>
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '13px',
                          color: '#3D2E28',
                          opacity: 0.7,
                        }}
                      >
                        2 Days away. Plan a surprise?
                      </p>
                    </div>
                  </motion.div>

                  {/* To-Do Card */}
                  <motion.div
                    className="p-4 flex items-center gap-4"
                    style={{
                      background: 'rgba(142, 7, 95, 0.05)',
                      borderRadius: '16px',
                      border: '1px solid rgba(142, 7, 95, 0.1)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '24px',
                        background: '#8E075F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <CheckSquare size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '15px',
                          color: '#3D2E28',
                          fontWeight: 700,
                          marginBottom: '2px',
                        }}
                      >
                        Task Due: Pay Electricity Bill
                      </p>
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '13px',
                          color: '#3D2E28',
                          opacity: 0.7,
                        }}
                      >
                        Assigned to You
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quick Nudges - Refined */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h3
                  className="laya-body mb-3"
                  style={{ 
                    fontSize: '18px',
                    color: '#3D2E28',
                    fontWeight: 700,
                  }}
                >
                  Quick Nudges
                </h3>

                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {quickNudges.map((nudge, idx) => (
                    <motion.button
                      key={nudge.label}
                      className="flex-shrink-0 flex flex-col items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 0.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className="laya-card"
                        style={{
                          width: '64px',
                          height: '64px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                        }}
                      >
                        {nudge.icon}
                      </div>
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '11px',
                          color: '#3D2E28',
                          maxWidth: '64px',
                          textAlign: 'center',
                        }}
                      >
                        {nudge.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'plan':
        return <PlanTab userName={userName} partnerName={partnerName} />;

      case 'memories':
        return (
          <div className="flex-1 overflow-y-auto pb-24" style={{ background: '#FFFCF8' }}>
            <MemoriesTab userName={userName} partnerName={partnerName} />
          </div>
        );

      case 'gifting':
        return <GiftingHub partnerName={partnerName} />;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#F2E8DA' }}>
      {/* Tab content */}
      {renderTabContent()}

      {/* Profile Button - Floating on all screens */}
      <button
        onClick={() => setShowProfile(true)}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          width: '48px',
          height: '48px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #8E075F, #4ECDC4)',
          border: '3px solid #FFFCF8',
          boxShadow: '0 4px 16px rgba(142, 7, 95, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 50,
        }}
      >
        <User size={24} color="white" strokeWidth={2.5} />
      </button>

      {/* Bottom Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          background: '#FFFCF8',
          borderTop: '1px solid rgba(61, 46, 40, 0.1)',
          boxShadow: '0 -4px 20px rgba(61, 46, 40, 0.05)',
        }}
      >
        <div className="flex items-center justify-around py-4 px-6">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center gap-1 relative"
          >
            <Home size={24} style={{ color: activeTab === 'home' ? '#8E075F' : '#3D2E28', opacity: activeTab === 'home' ? 1 : 0.5 }} />
            {activeTab === 'home' && (
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#8E075F' }} />
            )}
          </button>

          {/* Plan */}
          <button
            onClick={() => setActiveTab('plan')}
            className="flex flex-col items-center gap-1 relative"
          >
            <Calendar size={24} style={{ color: activeTab === 'plan' ? '#8E075F' : '#3D2E28', opacity: activeTab === 'plan' ? 1 : 0.5 }} />
            {activeTab === 'plan' && (
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#8E075F' }} />
            )}
          </button>

          {/* Memories */}
          <button
            onClick={() => setActiveTab('memories')}
            className="flex flex-col items-center gap-1 relative"
          >
            <Image size={24} style={{ color: activeTab === 'memories' ? '#8E075F' : '#3D2E28', opacity: activeTab === 'memories' ? 1 : 0.5 }} />
            {activeTab === 'memories' && (
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#8E075F' }} />
            )}
          </button>

          {/* Gifting */}
          <button
            onClick={() => setActiveTab('gifting')}
            className="flex flex-col items-center gap-1 relative"
          >
            <Gift size={24} style={{ color: activeTab === 'gifting' ? '#8E075F' : '#3D2E28', opacity: activeTab === 'gifting' ? 1 : 0.5 }} />
            {activeTab === 'gifting' && (
              <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#8E075F' }} />
            )}
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <ProfileTab
            userName={userName}
            partnerName={partnerName}
            onClose={() => setShowProfile(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Gifting Hub Component
function GiftingHub({ partnerName }: { partnerName: string }) {
  const [claimedCoupons, setClaimedCoupons] = useState<number[]>([]);
  const [claimsRemaining, setClaimsRemaining] = useState<Record<number, number>>({
    1: 10,
    2: 8,
    3: 15,
    4: 5,
    5: 12,
    6: 20,
  });

  const affiliateOffers = [
    { 
      id: 1, 
      partner: 'Ferns N Petals', 
      discount: '25% OFF', 
      code: 'LAYA25',
      description: 'Fresh flowers & gift hampers',
      image: '💐', 
      category: 'Gifts',
      minOrder: '₹999',
      link: 'https://www.fnp.com',
      totalClaims: 10,
    },
    { 
      id: 2, 
      partner: 'Zomato Gold', 
      discount: '₹500 OFF', 
      code: 'LAYADATE',
      description: 'Date night dinners',
      image: '🍽️', 
      category: 'Dining',
      minOrder: '₹1,500',
      link: 'https://www.zomato.com',
      totalClaims: 10,
    },
    { 
      id: 3, 
      partner: 'BookMyShow', 
      discount: '30% OFF', 
      code: 'LAYABMS',
      description: 'Movie tickets & events',
      image: '🎬', 
      category: 'Entertainment',
      minOrder: '₹500',
      link: 'https://www.bookmyshow.com',
      totalClaims: 15,
    },
    { 
      id: 4, 
      partner: 'O2 Spa', 
      discount: '40% OFF', 
      code: 'LAYASPA',
      description: 'Couple spa packages',
      image: '🧖‍♀️', 
      category: 'Wellness',
      minOrder: '₹2,000',
      link: 'https://www.o2spa.in',
      totalClaims: 10,
    },
    { 
      id: 5, 
      partner: 'MakeMyTrip', 
      discount: '₹3,000 OFF', 
      code: 'LAYATRIP',
      description: 'Weekend getaways',
      image: '✈️', 
      category: 'Travel',
      minOrder: '₹10,000',
      link: 'https://www.makemytrip.com',
      totalClaims: 15,
    },
    { 
      id: 6, 
      partner: 'Smytten', 
      discount: '50% OFF', 
      code: 'LAYABEAUTY',
      description: 'Premium beauty & grooming',
      image: '💄', 
      category: 'Beauty',
      minOrder: '₹799',
      link: 'https://www.smytten.com',
      totalClaims: 20,
    },
  ];

  const handleClaimCoupon = (id: number) => {
    if (!claimedCoupons.includes(id) && claimsRemaining[id] > 0) {
      setClaimedCoupons([...claimedCoupons, id]);
      setClaimsRemaining({
        ...claimsRemaining,
        [id]: claimsRemaining[id] - 1,
      });
    }
  };

  const handleVisitSite = (link: string, code: string) => {
    // Fallback copy method for clipboard
    const fallbackCopyToClipboard = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        console.error('Fallback: Could not copy text', err);
        textArea.remove();
        return false;
      }
    };

    // Try modern clipboard API, fallback to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).catch(() => {
        fallbackCopyToClipboard(code);
      });
    } else {
      fallbackCopyToClipboard(code);
    }

    // Open partner site
    window.open(link, '_blank');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h2
          className="laya-headline"
          style={{ 
            fontSize: '28px',
            color: '#3D2E28',
          }}
        >
          Partner Perks
        </h2>
        <p
          className="laya-body mt-2"
          style={{ 
            fontSize: '16px',
            color: '#3D2E28',
            opacity: 0.7,
          }}
        >
          Exclusive deals from our partners—just for Laya couples
        </p>
      </div>

      {/* Coupon Cards */}
      <div className="px-6">
        <div className="flex flex-col gap-4">
          {affiliateOffers.map((offer, idx) => {
            const isClaimed = claimedCoupons.includes(offer.id);
            
            return (
              <motion.div
                key={offer.id}
                className="laya-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                style={{
                  background: isClaimed ? 'rgba(78, 205, 196, 0.05)' : '#FFFFFF',
                }}
              >
                {/* Top Section */}
                <div className="flex items-start gap-4 p-4 pb-3">
                  {/* Icon */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(142, 7, 95, 0.1), rgba(78, 205, 196, 0.1))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      flexShrink: 0,
                    }}
                  >
                    {offer.image}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p
                        className="laya-body"
                        style={{ 
                          fontSize: '11px',
                          color: '#8E075F',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {offer.category}
                      </p>
                      {/* Claims Remaining Badge */}
                      <div
                        style={{
                          padding: '4px 8px',
                          background: claimsRemaining[offer.id] <= 5 
                            ? 'rgba(247, 183, 49, 0.2)' 
                            : 'rgba(78, 205, 196, 0.15)',
                          borderRadius: '8px',
                          border: `1px solid ${claimsRemaining[offer.id] <= 5 ? '#F7B731' : '#4ECDC4'}`,
                        }}
                      >
                        <p
                          className="laya-body"
                          style={{ 
                            fontSize: '10px',
                            color: claimsRemaining[offer.id] <= 5 ? '#F7B731' : '#4ECDC4',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {claimsRemaining[offer.id] === 0 
                            ? 'SOLD OUT' 
                            : `${claimsRemaining[offer.id]} left`}
                        </p>
                      </div>
                    </div>
                    <h4
                      className="laya-body mb-1"
                      style={{ 
                        fontSize: '17px',
                        color: '#3D2E28',
                        fontWeight: 700,
                        lineHeight: '1.3',
                      }}
                    >
                      {offer.partner}
                    </h4>
                    <p
                      className="laya-body mb-2"
                      style={{ 
                        fontSize: '14px',
                        color: '#8B7355',
                      }}
                    >
                      {offer.description}
                    </p>

                    {/* Discount Badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        background: 'rgba(247, 183, 49, 0.15)',
                        borderRadius: '12px',
                      }}
                    >
                      <span
                        className="laya-headline"
                        style={{
                          fontSize: '16px',
                          color: '#F7B731',
                          fontWeight: 600,
                        }}
                      >
                        {offer.discount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div 
                  style={{ 
                    height: '1px', 
                    background: 'rgba(61, 46, 40, 0.1)',
                    margin: '0 16px',
                  }} 
                />

                {/* Bottom Section */}
                <div className="p-4 pt-3">
                  {!isClaimed ? (
                    // Before Claiming
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="laya-body"
                          style={{ 
                            fontSize: '12px',
                            color: '#8B7355',
                            marginBottom: '2px',
                          }}
                        >
                          Min. order: {offer.minOrder}
                        </p>
                      </div>
                      <button
                        onClick={() => handleClaimCoupon(offer.id)}
                        disabled={claimsRemaining[offer.id] === 0}
                        className="laya-button-primary"
                        style={{
                          padding: '10px 24px',
                          fontSize: '15px',
                          fontWeight: 600,
                          background: claimsRemaining[offer.id] === 0 ? 'rgba(142, 7, 95, 0.3)' : undefined,
                          cursor: claimsRemaining[offer.id] === 0 ? 'not-allowed' : 'pointer',
                          opacity: claimsRemaining[offer.id] === 0 ? 0.6 : 1,
                        }}
                      >
                        {claimsRemaining[offer.id] === 0 ? 'Sold Out' : 'Claim Coupon'}
                      </button>
                    </div>
                  ) : (
                    // After Claiming
                    <div>
                      {/* Coupon Code */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          background: 'rgba(142, 7, 95, 0.05)',
                          borderRadius: '12px',
                          border: '2px dashed #8E075F',
                          marginBottom: '12px',
                        }}
                      >
                        <div>
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '11px',
                              color: '#8B7355',
                              marginBottom: '2px',
                            }}
                          >
                            Your code:
                          </p>
                          <p
                            className="laya-headline"
                            style={{ 
                              fontSize: '20px',
                              color: '#8E075F',
                              fontWeight: 600,
                              letterSpacing: '1px',
                            }}
                          >
                            {offer.code}
                          </p>
                        </div>
                        <div
                          style={{
                            padding: '8px 12px',
                            background: 'rgba(78, 205, 196, 0.2)',
                            borderRadius: '8px',
                          }}
                        >
                          <p
                            className="laya-body"
                            style={{ 
                              fontSize: '11px',
                              color: '#4ECDC4',
                              fontWeight: 700,
                            }}
                          >
                            CLAIMED
                          </p>
                        </div>
                      </div>

                      {/* Visit Site Button */}
                      <button
                        onClick={() => handleVisitSite(offer.link, offer.code)}
                        className="w-full laya-button-primary"
                        style={{
                          padding: '12px',
                          fontSize: '15px',
                          fontWeight: 600,
                          background: '#4ECDC4',
                        }}
                      >
                        Visit {offer.partner} →
                      </button>
                      <p
                        className="laya-body text-center mt-2"
                        style={{ 
                          fontSize: '12px',
                          color: '#8B7355',
                        }}
                      >
                        Code will be copied to clipboard
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="px-6 py-8">
        <div
          style={{
            padding: '20px',
            background: 'rgba(142, 7, 95, 0.05)',
            borderRadius: '16px',
          }}
        >
          <p
            className="laya-body"
            style={{ 
              fontSize: '14px',
              color: '#3D2E28',
              lineHeight: '1.6',
              textAlign: 'center',
            }}
          >
            💝 More partner perks coming soon! We're constantly adding exclusive deals for Laya couples.
          </p>
        </div>
      </div>
    </div>
  );
}