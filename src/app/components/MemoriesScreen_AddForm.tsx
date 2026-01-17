import { Camera, X, Calendar } from 'lucide-react';
import { useState } from 'react';

export function MemoriesScreen_AddForm() {
  const [isSpecialOccasion, setIsSpecialOccasion] = useState(false);
  const [remindAnnually, setRemindAnnually] = useState(false);

  return (
    <div
      style={{
        background: '#FFFCF8',
        minHeight: '100vh',
        padding: '32px 24px',
        paddingBottom: '80px',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            marginTop: '12px',
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
                flexShrink: 0,
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

          {/* Conditional: Remind Annually - ALWAYS SHOWN FOR EXPORT */}
          {isSpecialOccasion && (
            <div
              style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(247, 183, 49, 0.2)',
              }}
            >
              <div className="flex items-center justify-between">
                <div style={{ flex: 1, paddingRight: '12px' }}>
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
                    flexShrink: 0,
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
            </div>
          )}
        </div>

        {/* CTA */}
        <button
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
    </div>
  );
}
