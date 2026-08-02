import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const line1 = "VACATION".split("");
  const line2 = "IN EGYPT".split("");

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{     backgroundColor: '#08080E', minHeight: '100vh', minWidth: '100vw' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%,           rgba(16,172,132,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="VACATION IN EGYPT"
        className="w-28 h-28 object-contain rounded-2xl mb-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.6, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Line 1: VACATION */}
      <div className="flex items-center gap-2 mb-1">
        {line1.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + i * 0.07,
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              color: '#10AC84',
              letterSpacing: '0.08em',
              lineHeight: 1,
              textShadow: '0 0 30px rgba(48,213,200,0.6), 0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Line 2: IN EGYPT */}
      <div className="flex items-center gap-2 mb-8">
        {line2.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + (line1.length + i) * 0.07,
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              color: letter === ' ' ? 'transparent' : '#2E86DE',
              letterSpacing: '0.08em',
              lineHeight: 1,
              textShadow: letter === ' ' ? 'none' : '0 0 30px rgba(46,134,222,0.6), 0 2px 4px rgba(0,0,0,0.8)',
              minWidth: letter === ' ' ? '1.5rem' : 'auto',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          color: '          rgba(46,134,222,0.9)',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}
      >
        Premium Travel &amp; Adventure
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          width: '200px',
          height: '2px',
          borderRadius: '9999px',
          background: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.8, duration: 2.4, ease: 'easeInOut' }}
          style={{
            height: '100%',
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, #10AC84, #2E86DE)',
          }}
        />
      </motion.div>

      {/* Status text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.5] }}
        transition={{ delay: 2, duration: 1.5, times: [0, 0.3, 1] }}
        style={{
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
        }}
      >
        Preparing Your Luxury Escape...
      </motion.p>
    </div>
  );
}
