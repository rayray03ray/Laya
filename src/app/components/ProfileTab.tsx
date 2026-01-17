import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Edit2, Trash2, MessageCircle, LogOut, X, ChevronRight, Check } from 'lucide-react';

interface ProfileTabProps {
  userName: string;
  partnerName: string;
  onClose: () => void;
}

const avatarOptions = [
  '👤', '😊', '😎', '🤓', '🥰', '😇', 
  '🤗', '🙂', '😌', '🤩', '😺', '🐶',
  '🦁', '🐼', '🐨', '🦊', '🐯', '🐸',
];

export function ProfileTab({ userName, partnerName, onClose }: ProfileTabProps) {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState('😊');
  const [editedName, setEditedName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState('priya.sharma@example.com');
  const [editedPhone, setEditedPhone] = useState('+91 98765 43210');
  const [feedbackText, setFeedbackText] = useState('');

  const handleSaveProfile = () => {
    // Mock save
    setShowEditProfile(false);
  };

  const handleDeleteAccount = () => {
    // Mock delete - in real app, this would call API
    alert('Account deletion initiated. You will receive a confirmation email.');
    setShowDeleteConfirm(false);
  };

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) {
      alert('Thank you for your feedback! We\'ll get back to you soon.');
      setFeedbackText('');
      setShowFeedback(false);
    }
  };

  const handleLogout = () => {
    // Mock logout
    alert('Logged out successfully');
    setShowLogoutConfirm(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#F2E8DA',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px',
          background: '#FFFCF8',
          boxShadow: '0 2px 8px rgba(61, 46, 40, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div className="flex items-center justify-between">
          <h2
            className="laya-headline"
            style={{
              fontSize: '28px',
              color: '#3D2E28',
            }}
          >
            Profile
          </h2>
          <button
            onClick={onClose}
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
      </div>

      {/* Content */}
      <div
        style={{
          height: 'calc(100vh - 96px)',
          overflowY: 'auto',
          padding: '24px',
          paddingBottom: '40px',
        }}
      >
        {/* Avatar & User Info Card */}
        <motion.div
          className="laya-card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <button
              onClick={() => setShowAvatarPicker(true)}
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '48px',
                background: 'linear-gradient(135deg, #8E075F, #4ECDC4)',
                border: '4px solid #FFFCF8',
                boxShadow: '0 8px 24px rgba(142, 7, 95, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                cursor: 'pointer',
                marginBottom: '16px',
                position: 'relative',
              }}
            >
              {selectedAvatar}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '14px',
                  background: '#8E075F',
                  border: '3px solid #FFFCF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Edit2 size={12} color="white" />
              </div>
            </button>

            {/* User Info */}
            <h3
              className="laya-headline"
              style={{
                fontSize: '24px',
                color: '#3D2E28',
                marginBottom: '4px',
              }}
            >
              {editedName}
            </h3>
            <p
              className="laya-body"
              style={{
                fontSize: '15px',
                color: '#8B7355',
                marginBottom: '12px',
              }}
            >
              {editedEmail}
            </p>

            {/* Relationship Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'rgba(142, 7, 95, 0.1)',
                borderRadius: '20px',
              }}
            >
              <span style={{ fontSize: '16px' }}>💕</span>
              <p
                className="laya-body"
                style={{
                  fontSize: '14px',
                  color: '#8E075F',
                  fontWeight: 600,
                }}
              >
                Together with {partnerName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Menu Options */}
        <div className="space-y-3">
          {/* Edit Profile */}
          <motion.button
            onClick={() => setShowEditProfile(true)}
            className="w-full laya-card p-4 flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  background: 'rgba(142, 7, 95, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Edit2 size={20} color="#8E075F" />
              </div>
              <div className="text-left">
                <p
                  className="laya-body"
                  style={{
                    fontSize: '16px',
                    color: '#3D2E28',
                    fontWeight: 700,
                  }}
                >
                  Edit Profile
                </p>
                <p
                  className="laya-body"
                  style={{
                    fontSize: '13px',
                    color: '#8B7355',
                  }}
                >
                  Update your personal details
                </p>
              </div>
            </div>
            <ChevronRight size={20} color="#8B7355" />
          </motion.button>

          {/* Write to Us */}
          <motion.button
            onClick={() => setShowFeedback(true)}
            className="w-full laya-card p-4 flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  background: 'rgba(78, 205, 196, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={20} color="#4ECDC4" />
              </div>
              <div className="text-left">
                <p
                  className="laya-body"
                  style={{
                    fontSize: '16px',
                    color: '#3D2E28',
                    fontWeight: 700,
                  }}
                >
                  Write to Us
                </p>
                <p
                  className="laya-body"
                  style={{
                    fontSize: '13px',
                    color: '#8B7355',
                  }}
                >
                  Feedback, suggestions, or support
                </p>
              </div>
            </div>
            <ChevronRight size={20} color="#8B7355" />
          </motion.button>

          {/* Log Out */}
          <motion.button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full laya-card p-4 flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  background: 'rgba(247, 183, 49, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LogOut size={20} color="#F7B731" />
              </div>
              <div className="text-left">
                <p
                  className="laya-body"
                  style={{
                    fontSize: '16px',
                    color: '#3D2E28',
                    fontWeight: 700,
                  }}
                >
                  Log Out
                </p>
                <p
                  className="laya-body"
                  style={{
                    fontSize: '13px',
                    color: '#8B7355',
                  }}
                >
                  Sign out of your account
                </p>
              </div>
            </div>
            <ChevronRight size={20} color="#8B7355" />
          </motion.button>

          {/* Delete Account */}
          <motion.button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full laya-card p-4 flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              border: '1px solid rgba(142, 7, 95, 0.2)',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  background: 'rgba(142, 7, 95, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trash2 size={20} color="#8E075F" />
              </div>
              <div className="text-left">
                <p
                  className="laya-body"
                  style={{
                    fontSize: '16px',
                    color: '#8E075F',
                    fontWeight: 700,
                  }}
                >
                  Delete Account
                </p>
                <p
                  className="laya-body"
                  style={{
                    fontSize: '13px',
                    color: '#8B7355',
                  }}
                >
                  Permanently remove your data
                </p>
              </div>
            </div>
            <ChevronRight size={20} color="#8B7355" />
          </motion.button>
        </div>

        {/* App Version */}
        <div className="text-center mt-8">
          <p
            className="laya-body"
            style={{
              fontSize: '12px',
              color: '#8B7355',
            }}
          >
            Laya v1.0.0 • Made with 💜 for Indian couples
          </p>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(61, 46, 40, 0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setShowAvatarPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFCF8',
                borderRadius: '24px',
                padding: '24px',
                maxWidth: '400px',
                width: '100%',
              }}
            >
              <h3
                className="laya-headline mb-4"
                style={{
                  fontSize: '22px',
                  color: '#3D2E28',
                  textAlign: 'center',
                }}
              >
                Choose Your Avatar
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarPicker(false);
                    }}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '12px',
                      background: selectedAvatar === avatar ? 'rgba(142, 7, 95, 0.1)' : 'rgba(61, 46, 40, 0.05)',
                      border: selectedAvatar === avatar ? '2px solid #8E075F' : '2px solid transparent',
                      fontSize: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {avatar}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAvatarPicker(false)}
                className="w-full laya-button-primary"
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(61, 46, 40, 0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setShowEditProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFCF8',
                borderRadius: '24px',
                padding: '24px',
                maxWidth: '400px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{
                    fontSize: '22px',
                    color: '#3D2E28',
                  }}
                >
                  Edit Profile
                </h3>
                <button
                  onClick={() => setShowEditProfile(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '16px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    className="laya-body block mb-2"
                    style={{
                      fontSize: '14px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full p-3"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="laya-body block mb-2"
                    style={{
                      fontSize: '14px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full p-3"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="laya-body block mb-2"
                    style={{
                      fontSize: '14px',
                      color: '#3D2E28',
                      fontWeight: 600,
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="w-full p-3"
                    style={{
                      background: '#F2E8DA',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'var(--laya-font-body)',
                      color: '#3D2E28',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="w-full laya-button-primary mt-6"
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(61, 46, 40, 0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setShowFeedback(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFCF8',
                borderRadius: '24px',
                padding: '24px',
                maxWidth: '400px',
                width: '100%',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="laya-headline"
                  style={{
                    fontSize: '22px',
                    color: '#3D2E28',
                  }}
                >
                  Write to Us
                </h3>
                <button
                  onClick={() => setShowFeedback(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '16px',
                    background: 'rgba(61, 46, 40, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} style={{ color: '#3D2E28' }} />
                </button>
              </div>

              <p
                className="laya-body mb-4"
                style={{
                  fontSize: '15px',
                  color: '#8B7355',
                  lineHeight: '1.6',
                }}
              >
                We'd love to hear from you! Share your feedback, suggestions, or reach out for support.
              </p>

              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={6}
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
                }}
              />

              <button
                onClick={handleSubmitFeedback}
                disabled={!feedbackText.trim()}
                className="w-full laya-button-primary"
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: feedbackText.trim() ? undefined : 'rgba(142, 7, 95, 0.3)',
                  cursor: feedbackText.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Send Feedback
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(61, 46, 40, 0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFCF8',
                borderRadius: '24px',
                padding: '32px 24px',
                maxWidth: '360px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '32px',
                  background: 'rgba(247, 183, 49, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <LogOut size={32} color="#F7B731" />
              </div>

              <h3
                className="laya-headline mb-3"
                style={{
                  fontSize: '22px',
                  color: '#3D2E28',
                }}
              >
                Log Out?
              </h3>

              <p
                className="laya-body mb-6"
                style={{
                  fontSize: '15px',
                  color: '#8B7355',
                  lineHeight: '1.6',
                }}
              >
                Are you sure you want to log out of your account?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3"
                  style={{
                    background: 'rgba(61, 46, 40, 0.1)',
                    color: '#3D2E28',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3"
                  style={{
                    background: '#F7B731',
                    color: 'white',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(61, 46, 40, 0.85)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFCF8',
                borderRadius: '24px',
                padding: '32px 24px',
                maxWidth: '360px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '32px',
                  background: 'rgba(142, 7, 95, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <Trash2 size={32} color="#8E075F" />
              </div>

              <h3
                className="laya-headline mb-3"
                style={{
                  fontSize: '22px',
                  color: '#8E075F',
                }}
              >
                Delete Account?
              </h3>

              <p
                className="laya-body mb-6"
                style={{
                  fontSize: '15px',
                  color: '#8B7355',
                  lineHeight: '1.6',
                }}
              >
                This will permanently delete your account and all your data. This action cannot be undone.
              </p>

              <div
                className="mb-6 p-4"
                style={{
                  background: 'rgba(142, 7, 95, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(142, 7, 95, 0.2)',
                }}
              >
                <p
                  className="laya-body text-left"
                  style={{
                    fontSize: '13px',
                    color: '#3D2E28',
                    lineHeight: '1.5',
                  }}
                >
                  ⚠️ <strong>What will be deleted:</strong>
                  <br />• All your memories and photos
                  <br />• Shared plans and tasks
                  <br />• Account settings and preferences
                  <br />• Partner connection
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3"
                  style={{
                    background: 'rgba(61, 46, 40, 0.1)',
                    color: '#3D2E28',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 py-3"
                  style={{
                    background: '#8E075F',
                    color: 'white',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontFamily: 'var(--laya-font-body)',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete Forever
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
