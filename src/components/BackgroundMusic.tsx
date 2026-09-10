import { useEffect, useRef, useState } from 'react';

/**
 * BackgroundMusic
 * ---------------
 * Plays /videos/song.mpeg on loop at low volume as ambient site music.
 *
 * Browser autoplay policy:
 *  Modern browsers block audio autoplay until the user has interacted
 *  with the page. We attempt autoplay immediately; if it is blocked we
 *  attach a one-time listener on the first user gesture and retry.
 *
 * UI:
 *  A fixed floating music-toggle button (bottom-right) so visitors can
 *  mute / unmute at will. Fades in after 2 s to avoid distraction.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  /* ── initialise audio element ── */
  useEffect(() => {
    const audio = new Audio('/videos/song.mpeg');
    audio.loop = true;
    audio.volume = 0.25; // ambient – not intrusive
    audio.preload = 'auto';
    audioRef.current = audio;

    /* Attempt autoplay */
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
              .catch(() => {
                /* still blocked – silently ignore */
              });
            window.removeEventListener('click', onGesture);
            window.removeEventListener('touchstart', onGesture);
            window.removeEventListener('keydown', onGesture);
          };
          window.addEventListener('click', onGesture, { once: true });
          window.addEventListener('touchstart', onGesture, { once: true });
          window.addEventListener('keydown', onGesture, { once: true });
        });
    };

    tryPlay();

    /* Fade-in the toggle button after 2 s */
    const revealTimer = setTimeout(() => setVisible(true), 2000);

    return () => {
      clearTimeout(revealTimer);
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
    <button
      onClick={toggle}
      aria-label={playing ? 'Mute background music' : 'Play background music'}
      title={playing ? 'Mute music' : 'Play music'}
      style={{
        position: 'fixed',
        bottom: '88px', /* sits above WhatsApp / booking FABs */
        right: '20px',
        zIndex: 9990,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '2px solid rgba(212,175,55,0.6)',
        background: 'rgba(5,7,13,0.75)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease, transform 0.2s ease, border-color 0.2s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        padding: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          'rgba(212,175,55,1)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          'rgba(212,175,55,0.6)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
    >
      {playing ? (
        /* Sound-wave icon (playing) */
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
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        /* Muted icon */
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

      {/* Subtle pulsing ring when playing */}
      {playing && (
        <span
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid rgba(212,175,55,0.3)',
            animation: 'musicPulse 2s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      <style>{`
        @keyframes musicPulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%       { transform: scale(1.3); opacity: 0;   }
        }
      `}</style>
    </button>
  );
}
