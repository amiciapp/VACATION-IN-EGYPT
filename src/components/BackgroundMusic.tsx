import { useEffect, useRef, useState } from 'react';

/**
 * BackgroundMusic
 * ---------------
 * Plays /videos/song.mpeg on loop at low volume as ambient site music.
 *
 * Browser autoplay policy:
 *  Modern browsers block audio autoplay until the user has interacted
 *  with the page. We attempt autoplay on the first user gesture.
 *
 * UI:
 *  Fixed floating music-toggle button (bottom-LEFT) so visitors can
 *  mute / unmute at will. Fades in after 1.5 s to avoid distraction.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  /* ── initialise audio element ── */
  useEffect(() => {
    const audio = new Audio('/videos/song.mpeg');
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    audio.addEventListener('canplaythrough', onCanPlay);

    /* Attempt autoplay immediately */
    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          /* Autoplay blocked — wait for first user gesture */
          const onGesture = () => {
            audio
              .play()
              .then(() => setPlaying(true))
              .catch(() => {/* silently ignore */});
          };
          window.addEventListener('click', onGesture, { once: true });
          window.addEventListener('touchstart', onGesture, { once: true });
          window.addEventListener('keydown', onGesture, { once: true });
        });
    };

    tryPlay();

    /* Fade-in the toggle button after 1.5 s */
    const revealTimer = setTimeout(() => setVisible(true), 1500);

    return () => {
      clearTimeout(revealTimer);
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  /* ── toggle handler ── */
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <style>{`
        @keyframes musicPulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%       { transform: scale(1.4); opacity: 0;   }
        }
        @keyframes bar1 { 0%,100%{height:6px}  50%{height:16px} }
        @keyframes bar2 { 0%,100%{height:14px} 50%{height:4px}  }
        @keyframes bar3 { 0%,100%{height:10px} 50%{height:18px} }
        @keyframes bar4 { 0%,100%{height:4px}  50%{height:12px} }
        .music-btn {
          position: fixed;
          bottom: 88px;
          left: 20px;
          z-index: 9990;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(212,175,55,0.6);
          background: rgba(5,7,13,0.80);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s ease, transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          padding: 0;
          outline: none;
        }
        .music-btn:hover {
          border-color: rgba(212,175,55,1);
          transform: scale(1.12);
          box-shadow: 0 6px 28px rgba(212,175,55,0.25);
        }
        .music-btn:active {
          transform: scale(0.95);
        }
        .music-bars {
          display: flex;
          align-items: flex-end;
          gap: 2.5px;
          height: 20px;
        }
        .music-bars span {
          width: 3px;
          border-radius: 2px;
          background: #D4AF37;
          display: block;
        }
        .music-bars span:nth-child(1) { animation: bar1 0.8s ease-in-out infinite; }
        .music-bars span:nth-child(2) { animation: bar2 0.8s ease-in-out infinite 0.15s; }
        .music-bars span:nth-child(3) { animation: bar3 0.8s ease-in-out infinite 0.3s; }
        .music-bars span:nth-child(4) { animation: bar4 0.8s ease-in-out infinite 0.45s; }
      `}</style>

      <button
        className="music-btn"
        onClick={toggle}
        aria-label={playing ? 'Mute background music' : 'Play background music'}
        title={playing ? 'Mute music' : 'Play music'}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.7)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {playing ? (
          /* Animated sound-bars when playing */
          <div className="music-bars">
            <span style={{ height: '6px' }} />
            <span style={{ height: '14px' }} />
            <span style={{ height: '10px' }} />
            <span style={{ height: '4px' }} />
          </div>
        ) : (
          /* Static muted speaker icon when paused */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}

        {/* Pulsing ring when playing */}
        {playing && (
          <span
            style={{
              position: 'absolute',
              inset: '-5px',
              borderRadius: '50%',
              border: '2px solid rgba(212,175,55,0.35)',
              animation: 'musicPulse 2s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </button>
    </>
  );
}
