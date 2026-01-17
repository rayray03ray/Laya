import { Plus, Flag } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
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

const memories: Memory[] = [
  {
    id: 1,
    title: 'Goa Escape',
    date: 'Dec 12, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    side: 'left',
    rotation: -2,
  },
  {
    id: 2,
    title: 'Brought Max Home',
    date: 'Jan 14, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    side: 'right',
    rotation: 1.5,
  },
  {
    id: 3,
    title: 'First Diwali Together',
    date: 'Nov 12, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1605274313962-2bf61a3c4df6?w=800',
    hasBeigeFlag: true,
    side: 'left',
    rotation: -1.5,
  },
  {
    id: 4,
    title: 'Rainy Drive to Lonavala',
    date: 'Aug 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800',
    side: 'right',
    rotation: 2,
  },
];

export function MemoriesScreen_Timeline() {
  return (
    <div
      style={{
        background: '#FFFCF8',
        minHeight: '100vh',
        position: 'relative',
        paddingBottom: '120px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 24px 16px',
          background: '#FFFCF8',
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
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: 'relative',
          padding: '32px 24px',
          minHeight: '800px',
        }}
      >
        {/* Vertical Dashed Line - FIXED FOR EXPORT */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            height: '100%',
            width: '3px',
            backgroundImage: 'repeating-linear-gradient(0deg, #C9B79C, #C9B79C 10px, transparent 10px, transparent 20px)',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        />

        {/* Memory Cards */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {memories.map((memory) => (
            <div
              key={memory.id}
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
                  zIndex: 3,
                  boxShadow: '0 2px 8px rgba(142, 7, 95, 0.3)',
                }}
              />

              {/* Polaroid Card */}
              <div
                style={{
                  width: 'calc(50% - 32px)',
                  background: '#FFFFFF',
                  borderRadius: '4px',
                  padding: '16px',
                  boxShadow: '0 8px 24px rgba(61, 46, 40, 0.15)',
                  transform: `rotate(${memory.rotation}deg)`,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")',
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
              </div>
            </div>
          ))}
        </div>

        {/* Jump to Start Button */}
        <div style={{ textAlign: 'center', marginTop: '24px', position: 'relative', zIndex: 2 }}>
          <button
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
            }}
          >
            Jump to Start ↓
          </button>
        </div>
      </div>

      {/* FAB */}
      <div
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
      >
        <Plus size={32} color="white" strokeWidth={2.5} />
      </div>
    </div>
  );
}
