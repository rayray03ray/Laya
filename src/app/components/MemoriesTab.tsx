import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Camera, X, Edit2, Share2, Flag, Calendar } from 'lucide-react';

interface MemoriesTabProps {
  userName: string;
  partnerName: string;
}

interface Memory {
  id: number;
  title: string;
  date: string;
  note: string;
  imageUrl: string;
  isSpecialOccasion: boolean;
  remindAnnually: boolean;
  hasBeigeFlag?: boolean;
  side: 'left' | 'right';
  rotation: number;
}

const MILESTONE_SUGGESTIONS = [
  'First Date',
  'First Trip',
  'Roka Ceremony',
  'First Diwali',
  'The Proposal',
  'Wedding Day',
  'First Rain',
  'Anniversary',
];

export function MemoriesTab({ userName, partnerName }: MemoriesTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isSpecialOccasion, setIsSpecialOccasion] = useState(false);
  const [remindAnnually, setRemindAnnually] = useState(false);

  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      title: 'Goa Escape',
      date: 'Dec 12, 2023',
      note: 'Our first beach sunset together. The waves, the warmth, the endless conversations.',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      isSpecialOccasion: true,
      remindAnnually: true,
      side: 'left',
      rotation: -2,
    },
    {
      id: 2,
      title: 'Brought Max Home',
      date: 'Jan 14, 2024',
      note: 'Our little furball joined the family. Best decision ever!',
      imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      isSpecialOccasion: false,
      remindAnnually: false,
      side: 'right',
      rotation: 1.5,
    },
    {
      id: 3,
      title: 'First Diwali Together',
      date: 'Nov 12, 2023',
      note: 'Lights, laughter, and endless mithai. You wore that stunning red saree.',
      imageUrl: 'https://images.unsplash.com/photo-1605274313962-2bf61a3c4df6?w=800',
      isSpecialOccasion: true,
      remindAnnually: true,
      hasBeigeFlag: true,
      side: 'left',
      rotation: -1.5,
    },
    {
      id: 4,
      title: 'Rainy Drive to Lonavala',
      date: 'Aug 5, 2023',
      note: 'Chai, pakoras, and endless rain. Perfect monsoon vibes.',
      imageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800',
      isSpecialOccasion: false,
      remindAnnually: false,
      side: 'right',
      rotation: 2,
    },
  ]);

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setShowDetailModal(true);
  };

  const handleAddMemory = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setIsSpecialOccasion(false);
    setRemindAnnually(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedMemory(null);
  };

  const scrollToStart = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          paddingBottom: '60px',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 16px',
            background: '#FFFCF8',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(61, 46, 40, 0.05)',
          }}
        >
          <h1
            className="laya-headline"
            style={{
              fontSize: '36px',
              color: '#3D2E28',
              marginBottom: '8px',
            }}
          >
            Our Journey
          </h1>
          <p
            className="laya-body"
            style={{
              fontSize: '15px',
              color: '#8B7355',
            }}
          >
            Every moment, captured & cherished
          </p>
        </div>

        {/* Cold Start Prompts */}
        {memories.length < 5 && (
          <div style={{ padding: '0 24px 24px' }}>
            <p
              className="laya-body"
              style={{
                fontSize: '14px',
                color: '#8B7355',
                marginBottom: '12px',
              }}
            >
              Quick start: Add your first memories
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '8px',
              }}
            >
              {MILESTONE_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={handleAddMemory}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '24px',
                    border: '2px dashed #8E075F',
                    background: 'transparent',
                    color: '#8E075F',
                    fontSize: '14px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(142, 7, 95, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            padding: '32px 24px',
          }}
        >
          {/* Vertical Dashed Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'repeating-linear-gradient(to bottom, #C9B79C 0, #C9B79C 10px, transparent 10px, transparent 20px)',
              transform: 'translateX(-50%)',
            }}
          />

          {/* Memory Cards */}
          <div style={{ position: 'relative' }}>
            {memories.map((memory, idx) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
                style={{
                  display: 'flex',
                  justifyContent: memory.side === 'left' ? 'flex-start' : 'flex-end',
                  marginBottom: '48px',
                  position: 'relative',
                }}
              >
                {/* Timeline Node */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#8E075F',
                    border: '3px solid #FFFCF8',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(142, 7, 95, 0.3)',
                  }}
                />

                {/* Polaroid Card */}
                <motion.div
                  onClick={() => handleMemoryClick(memory)}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: 'calc(50% - 32px)',
                    background: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '16px',
                    boxShadow: '0 8px 24px rgba(61, 46, 40, 0.15)',
                    cursor: 'pointer',
                    transform: `rotate(${memory.rotation}deg)`,
                    transition: 'all 0.3s ease',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.03" /%3E%3C/svg%3E")',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      background: '#F2E8DA',
                    }}
                  >
                    <img
                      src={memory.imageUrl}
                      alt={memory.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Handwritten Note */}
                  <h3
                    style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '22px',
                      color: '#3D2E28',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}
                  >
                    {memory.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '18px',
                      color: '#8B7355',
                      marginBottom: '8px',
                    }}
                  >
                    {memory.date}
                  </p>

                  {/* Beige Flag Badge */}
                  {memory.hasBeigeFlag && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        background: 'rgba(247, 183, 49, 0.15)',
                        borderRadius: '12px',
                        marginTop: '8px',
                      }}
                    >
                      <Flag size={12} color="#F7B731" fill="#F7B731" />
                      <span
                        className="laya-body"
                        style={{
                          fontSize: '11px',
                          color: '#F7B731',
                          fontWeight: 600,
                        }}
                      >
                        Beige Flag
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Jump to Start Button */}
          {memories.length > 3 && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={scrollToStart}
                className="laya-body"
                style={{
                  padding: '12px 24px',
                  borderRadius: '24px',
                  border: '2px solid #8E075F',
                  background: 'transparent',
                  color: '#8E075F',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8E075F';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#8E075F';
                }}
              >
                Jump to Start ↓
              </button>
            </div>
          )}
        </div>

        {/* FAB */}
        <motion.button
          onClick={handleAddMemory}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '32px',
            width: '64px',
            height: '64px',
            borderRadius: '32px',
            background: '#8E075F',
            boxShadow: '0 8px 24px rgba(142, 7, 95, 0.4)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={32} color="white" strokeWidth={2.5} />
        </motion.button>

        {/* Add Memory Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeAddModal}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(61, 46, 40, 0.5)',
                  zIndex: 200,
                }}
              />

              {/* Modal */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: '#FFFCF8',
                  borderRadius: '24px 24px 0 0',
                  padding: '32px 24px',
                  paddingBottom: '120px',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  zIndex: 201,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="laya-headline"
                    style={{
                      fontSize: '28px',
                      color: '#3D2E28',
                    }}
                  >
                    Add Memory
                  </h3>
                  <button
                    onClick={closeAddModal}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '18px',
                      background: 'rgba(61, 46, 40, 0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={20} style={{ color: '#3D2E28' }} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {/* Photo Upload */}
                  <div>
                    <label
                      className="laya-body block mb-3"
                      style={{
                        fontSize: '15px',
                        color: '#3D2E28',
                        fontWeight: 600,
                      }}
                    >
                      Photo
                    </label>
                    <div
                      style={{
                        width: '100%',
                        height: '240px',
                        borderRadius: '16px',
                        border: '2px dashed #C9B79C',
                        background: '#F2E8DA',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Camera size={48} color="#8B7355" strokeWidth={1.5} />
                      <p
                        className="laya-body"
                        style={{
                          fontSize: '16px',
                          color: '#8B7355',
                          marginTop: '16px',
                        }}
                      >
                        Tap to upload photo
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label
                      className="laya-body block mb-3"
                      style={{
                        fontSize: '15px',
                        color: '#3D2E28',
                        fontWeight: 600,
                      }}
                    >
                      What's this memory?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., First Date, Goa Trip..."
                      className="w-full p-4"
                      style={{
                        background: '#F2E8DA',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontFamily: 'var(--laya-font-body)',
                        color: '#3D2E28',
                        border: 'none',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      className="laya-body block mb-3"
                      style={{
                        fontSize: '15px',
                        color: '#3D2E28',
                        fontWeight: 600,
                      }}
                    >
                      When did this happen?
                    </label>
                    <input
                      type="date"
                      className="w-full p-4"
                      style={{
                        background: '#F2E8DA',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontFamily: 'var(--laya-font-body)',
                        color: '#3D2E28',
                        border: 'none',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Story/Note */}
                  <div>
                    <label
                      className="laya-body block mb-3"
                      style={{
                        fontSize: '15px',
                        color: '#3D2E28',
                        fontWeight: 600,
                      }}
                    >
                      Add a little note...
                    </label>
                    <textarea
                      placeholder="What made this moment special?"
                      rows={4}
                      className="w-full p-4"
                      style={{
                        background: '#F2E8DA',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontFamily: 'var(--laya-font-body)',
                        color: '#3D2E28',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  {/* Special Occasion Section - Highlighted */}
                  <div
                    style={{
                      background: 'rgba(247, 183, 49, 0.1)',
                      border: '2px solid rgba(247, 183, 49, 0.3)',
                      borderRadius: '20px',
                      padding: '20px',
                      marginTop: '24px',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: '#F7B731',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Calendar size={20} color="white" />
                        </div>
                        <div>
                          <p
                            className="laya-body"
                            style={{
                              fontSize: '16px',
                              color: '#3D2E28',
                              fontWeight: 700,
                            }}
                          >
                            Mark as Special Occasion
                          </p>
                          <p
                            className="laya-body"
                            style={{
                              fontSize: '13px',
                              color: '#8B7355',
                              marginTop: '2px',
                            }}
                          >
                            Anniversaries, birthdays, milestones
                          </p>
                        </div>
                      </div>
                      <label
                        style={{
                          position: 'relative',
                          display: 'inline-block',
                          width: '52px',
                          height: '30px',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSpecialOccasion}
                          onChange={(e) => setIsSpecialOccasion(e.target.checked)}
                          style={{ display: 'none' }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isSpecialOccasion ? '#8E075F' : '#C9B79C',
                            borderRadius: '30px',
                            transition: '0.3s',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              content: '',
                              height: '22px',
                              width: '22px',
                              left: isSpecialOccasion ? '26px' : '4px',
                              bottom: '4px',
                              background: 'white',
                              borderRadius: '50%',
                              transition: '0.3s',
                            }}
                          />
                        </span>
                      </label>
                    </div>

                    {/* Conditional: Remind Annually */}
                    <AnimatePresence>
                      {isSpecialOccasion && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '1px solid rgba(247, 183, 49, 0.2)',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p
                                className="laya-body"
                                style={{
                                  fontSize: '15px',
                                  color: '#3D2E28',
                                  fontWeight: 600,
                                }}
                              >
                                Remind us every year?
                              </p>
                              <p
                                className="laya-body"
                                style={{
                                  fontSize: '12px',
                                  color: '#8B7355',
                                  marginTop: '2px',
                                }}
                              >
                                We'll add this to your Shared Calendar and remind you beforehand
                              </p>
                            </div>
                            <label
                              style={{
                                position: 'relative',
                                display: 'inline-block',
                                width: '52px',
                                height: '30px',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={remindAnnually}
                                onChange={(e) => setRemindAnnually(e.target.checked)}
                                style={{ display: 'none' }}
                              />
                              <span
                                style={{
                                  position: 'absolute',
                                  cursor: 'pointer',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: remindAnnually ? '#8E075F' : '#C9B79C',
                                  borderRadius: '30px',
                                  transition: '0.3s',
                                }}
                              >
                                <span
                                  style={{
                                    position: 'absolute',
                                    content: '',
                                    height: '22px',
                                    width: '22px',
                                    left: remindAnnually ? '26px' : '4px',
                                    bottom: '4px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    transition: '0.3s',
                                  }}
                                />
                              </span>
                            </label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      alert(`Memory saved! ${isSpecialOccasion && remindAnnually ? 'Added to calendar!' : ''}`);
                      closeAddModal();
                    }}
                    className="w-full py-4 laya-button-primary mt-4"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'var(--laya-font-body)',
                      fontWeight: 600,
                    }}
                  >
                    Save Memory
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Memory Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedMemory && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeDetailModal}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(61, 46, 40, 0.85)',
                  zIndex: 300,
                  backdropFilter: 'blur(8px)',
                }}
              />

              {/* Detail View */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '500px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '24px',
                  zIndex: 301,
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Action Buttons */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <button
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '20px',
                        background: 'rgba(142, 7, 95, 0.1)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Edit2 size={18} color="#8E075F" />
                    </button>
                    <button
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '20px',
                        background: 'rgba(142, 7, 95, 0.1)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Share2 size={18} color="#8E075F" />
                    </button>
                  </div>
                  <button
                    onClick={closeDetailModal}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '20px',
                      background: 'rgba(61, 46, 40, 0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={20} style={{ color: '#3D2E28' }} />
                  </button>
                </div>

                {/* Large Image */}
                <div
                  style={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '20px',
                    background: '#F2E8DA',
                  }}
                >
                  <img
                    src={selectedMemory.imageUrl}
                    alt={selectedMemory.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Title - Handwritten */}
                <h2
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '36px',
                    color: '#3D2E28',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  {selectedMemory.title}
                </h2>

                {/* Date - Handwritten */}
                <p
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '24px',
                    color: '#8B7355',
                    marginBottom: '16px',
                  }}
                >
                  {selectedMemory.date}
                </p>

                {/* Note */}
                <p
                  className="laya-body"
                  style={{
                    fontSize: '16px',
                    color: '#3D2E28',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                  }}
                >
                  {selectedMemory.note}
                </p>

                {/* Beige Flag Badge */}
                {selectedMemory.hasBeigeFlag && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: 'rgba(247, 183, 49, 0.15)',
                      borderRadius: '16px',
                    }}
                  >
                    <Flag size={16} color="#F7B731" fill="#F7B731" />
                    <span
                      className="laya-body"
                      style={{
                        fontSize: '14px',
                        color: '#F7B731',
                        fontWeight: 600,
                      }}
                    >
                      Beige Flag Moment
                    </span>
                  </div>
                )}

                {/* Special Occasion Badge */}
                {selectedMemory.isSpecialOccasion && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: 'rgba(142, 7, 95, 0.1)',
                      borderRadius: '16px',
                      marginLeft: selectedMemory.hasBeigeFlag ? '8px' : '0',
                    }}
                  >
                    <Calendar size={16} color="#8E075F" />
                    <span
                      className="laya-body"
                      style={{
                        fontSize: '14px',
                        color: '#8E075F',
                        fontWeight: 600,
                      }}
                    >
                      Special Occasion
                    </span>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}