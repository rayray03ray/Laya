import { X, Edit2, Share2, Flag, Calendar } from 'lucide-react';

export function MemoriesScreen_DetailView() {
  const selectedMemory = {
    title: 'First Diwali Together',
    date: 'Nov 12, 2023',
    note: 'Lights, laughter, and endless mithai. You wore that stunning red saree. The way the diyas lit up your face, I knew every Diwali from then on would be incomplete without you.',
    imageUrl: 'https://images.unsplash.com/photo-1605274313962-2bf61a3c4df6?w=800',
    hasBeigeFlag: true,
    isSpecialOccasion: true,
  };

  return (
    <div
      style={{
        background: 'rgba(61, 46, 40, 0.85)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Detail Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
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

        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
        </div>
      </div>
    </div>
  );
}
