import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    { title: "INITIATING EXPEDITION PROTOCOL", sub: "27.2579° N, 33.8116° E · HURGHADA · CAIRO · LUXOR" },
    { title: "ALIGNING CELESTIAL ASTROLABE", sub: "CURATING ULTRA-LUXURY EXPERIENCES & PRIVATE FLEET" },
    { title: "CALIBRATING ROYAL SANCTUARY", sub: "VIP CONCIERGE & FIVE-STAR EXPEDITIONS ONLINE" },
    { title: "WELCOME TO THE TIMELESS REALM", sub: "VACATION IN EGYPT · ATELIER DE VOYAGE" },
  ];

  // Precision Hollywood Counter & Step Sequencer
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500; // 2.5s Hollywood cinematic sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) setPhaseIndex(0);
      else if (pct < 65) setPhaseIndex(1);
      else if (pct < 92) setPhaseIndex(2);
      else setPhaseIndex(3);

      if (pct >= 100) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Hollywood Volumetric God-Rays, 3D Sacred Geometry & Anamorphic Flare Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Particles & Golden Embers
    const EMBER_COUNT = 120;
    const embers = Array.from({ length: EMBER_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * width * 1.6,
      y: (Math.random() - 0.5) * height * 1.6,
      z: Math.random() * 900 + 50,
      size: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.35 ? '#D4AF37' : '#60A5FA',
      alpha: Math.random() * 0.8 + 0.2,
      speedZ: Math.random() * 1.8 + 0.8,
      speedY: -(Math.random() * 0.8 + 0.3), // gentle upward float
      sway: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Deep Obsidian Cinematic Vignette
      const bgGradient = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.75);
      bgGradient.addColorStop(0, '#0a101f');
      bgGradient.addColorStop(0.5, '#05070e');
      bgGradient.addColorStop(1, '#020306');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Rotating God-Rays from Center
      ctx.save();
      ctx.translate(cx, cy);
      const RAY_COUNT = 12;
      for (let i = 0; i < RAY_COUNT; i++) {
        const rayAngle = (i * (Math.PI * 2)) / RAY_COUNT + time * 0.08;
        const rayWidth = 0.12 + Math.sin(time * 2 + i) * 0.04;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, Math.max(width, height) * 0.6, rayAngle - rayWidth, rayAngle + rayWidth);
        ctx.closePath();

        const rayGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, Math.max(width, height) * 0.6);
        rayGrad.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
        rayGrad.addColorStop(0.4, 'rgba(99, 179, 237, 0.03)');
        rayGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // 3. Anamorphic Horizontal Optical Flare Sweep
      const flareX = cx + Math.sin(time * 0.8) * (width * 0.25);
      const flareGrad = ctx.createLinearGradient(0, cy, width, cy);
      flareGrad.addColorStop(0, 'transparent');
      flareGrad.addColorStop(Math.max(0, (flareX - 300) / width), 'transparent');
      flareGrad.addColorStop(flareX / width, 'rgba(212, 175, 55, 0.28)');
      flareGrad.addColorStop(Math.min(1, (flareX + 300) / width), 'transparent');
      flareGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, cy - 2, width, 4);

      // 4. 3D Floating Embers and Golden Sand Sparks
      embers.forEach((p) => {
        p.z -= p.speedZ;
        p.y += p.speedY;
        p.sway += 0.03;

        if (p.z <= 10 || p.y < -height * 0.8) {
          p.z = 900;
          p.y = (Math.random() * 0.5 + 0.3) * height;
          p.x = (Math.random() - 0.5) * width * 1.5;
        }

        const fov = 450;
        const scale = fov / (fov + p.z);
        const px = cx + (p.x + Math.sin(p.sway) * 20) * scale;
        const py = cy + p.y * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * scale * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * scale * Math.min(1, (1000 - p.z) / 300);
          ctx.shadowBlur = 14 * scale;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const line1 = "VACATION".split("");
  const line2 = "IN EGYPT".split("");

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-[#030509] select-none">
      {/* 3D Canvas Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Hollywood Cinematic Letterbox Bars */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-black/90 backdrop-blur-md z-30 border-b border-white/5 flex items-center justify-between px-8 text-[10px] uppercase font-mono tracking-[0.3em] text-white/30">
        <span>VACATION IN EGYPT · PRODUCTION</span>
        <span>CINEMATIC INTRO 4K</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-black/90 backdrop-blur-md z-30 border-t border-white/5 flex items-center justify-between px-8 text-[10px] uppercase font-mono tracking-[0.3em] text-white/30">
        <span>RED SEA RIVIERA &amp; NILE EXPEDITIONS</span>
        <span>SECURE HIGH-END ENGINE</span>
      </div>

      {/* Top Brand Header Details */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-center mt-6"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-gold/25 backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-amber-200/90 font-mono">
            ROYAL TRAVEL ATELIER · EST. 2026
          </span>
        </div>
      </motion.div>

      {/* CENTER: 3D Astrolabe, Royal Monogram & Hollywood Gilded Typography */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-2xl mx-auto my-auto text-center">
        
        {/* 3D Celestial Astrolabe & Floating Holographic Core */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center mb-6 sm:mb-8">
          
          {/* Pulsating Shockwave Ring */}
          <motion.div
            animate={{
              scale: [1, 1.8, 2.4],
              opacity: [0.6, 0.2, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-gold/40 pointer-events-none"
          />

          {/* Compass Outer Ring with Degree Ticks */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-gold/30 border-dashed shadow-[0_0_35px_rgba(212,175,55,0.25)]"
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* 3D Tilted Astrolabe Ring 1 */}
          <motion.div
            animate={{ rotateZ: -360, rotateX: 65 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(96,165,250,0.3)]"
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* 3D Tilted Astrolabe Ring 2 */}
          <motion.div
            animate={{ rotateZ: 360, rotateY: 60 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border-2 border-amber-400/50 shadow-[0_0_35px_rgba(251,191,36,0.35)]"
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Sacred Golden Pyramid Wireframe Glow */}
          <motion.div
            animate={{ rotateZ: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-7 rounded-2xl border border-gold/40 rotate-45 pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          />

          {/* Center Royal Gilded Shield Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1.5 bg-gradient-to-br from-gold/50 via-slate-900/90 to-cyan-950/80 backdrop-blur-2xl border-2 border-gold/60 shadow-[0_0_60px_rgba(212,175,55,0.5)] flex items-center justify-center group"
          >
            <img
              src="/logo.jpg"
              alt="VACATION IN EGYPT"
              className="w-full h-full object-contain rounded-2xl drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]"
            />
            {/* Specular Glint Shimmer Sweep */}
            <motion.div
              animate={{ x: ['-150%', '220%'] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] rounded-2xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Hollywood 3D Title Letter Animation */}
        <div className="space-y-1.5 mb-4">
          {/* Word 1: VACATION */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            {line1.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.7, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{
                  delay: 0.25 + i * 0.05,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.14em] uppercase font-sans select-none"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF2B2 30%, #D4AF37 65%, #996F08 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 25px rgba(212,175,55,0.6)) drop-shadow(0 4px 10px rgba(0,0,0,0.9))',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Word 2: IN EGYPT */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            {line2.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.7, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{
                  delay: 0.45 + i * 0.05,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.14em] uppercase font-sans select-none ${
                  char === ' ' ? 'w-4 sm:w-8' : ''
                }`}
                style={{
                  background:
                    char === ' '
                      ? 'none'
                      : 'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 30%, #38BDF8 70%, #0284C7 100%)',
                  WebkitBackgroundClip: char === ' ' ? 'none' : 'text',
                  WebkitTextFillColor: char === ' ' ? 'transparent' : 'transparent',
                  filter: char === ' ' ? 'none' : 'drop-shadow(0 0 25px rgba(56,189,248,0.6)) drop-shadow(0 4px 10px rgba(0,0,0,0.9))',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hollywood Expanding Subtitle with Gold Hairlines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="flex items-center justify-center gap-3 sm:gap-6 mb-8 w-full"
        >
          <div className="h-px flex-1 max-w-[100px] sm:max-w-[160px] bg-gradient-to-r from-transparent via-gold/60 to-gold" />
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-amber-200/90 whitespace-nowrap">
            TIMELESS MAJESTY · CURATED RED SEA &amp; NILE EXPEDITIONS
          </p>
          <div className="h-px flex-1 max-w-[100px] sm:max-w-[160px] bg-gradient-to-l from-transparent via-gold/60 to-gold" />
        </motion.div>

        {/* Precision Progress Bar & Telemetry HUD */}
        <div className="w-full max-w-md space-y-3 px-4">
          {/* Outer glow track */}
          <div className="relative w-full h-2 rounded-full bg-white/[0.07] border border-white/10 p-[1.5px] overflow-hidden backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FDE047] to-[#38BDF8] shadow-[0_0_20px_rgba(212,175,55,0.9)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Dynamic Hollywood Telemetry Readout */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-white/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-left"
              >
                <span className="text-gold font-bold">{phases[phaseIndex].title}</span>
                <span className="hidden sm:block text-[9px] text-white/40 tracking-[0.2em] mt-0.5">
                  {phases[phaseIndex].sub}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="text-right pl-4">
              <span className="text-sm font-black font-mono text-white tracking-wider">
                {progress.toString().padStart(3, '0')}
                <span className="text-gold text-xs">%</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Subtle Copyright / Audio Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-20 text-center mb-6"
      >
        <span className="text-[10px] font-mono tracking-[0.35em] text-white/30 uppercase">
          VACATION IN EGYPT · PRIVATE LUXURY FLEET
        </span>
      </motion.div>
    </div>
  );
}
