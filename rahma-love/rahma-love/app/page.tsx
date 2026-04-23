"use client";

import { useState, useEffect, useRef } from "react";

// SVG flower for corners and decorations
function FlowerSVG({ size = 80, opacity = 0.3 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="50" cy="28" rx="7" ry="20"
          fill={i % 2 === 0 ? "#9c6644" : "#c8a882"}
          transform={`rotate(${angle} 50 50)`}
          opacity="0.8"
        />
      ))}
      {/* Center */}
      <circle cx="50" cy="50" r="10" fill="#c9a96e" opacity="0.9" />
      <circle cx="50" cy="50" r="5" fill="#e2c9a8" />
    </svg>
  );
}

// Rose SVG
function RoseSVG({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M50 120 Q48 90 50 80" stroke="#3d2b1f" strokeWidth="3" fill="none" />
      {/* Leaf */}
      <ellipse cx="44" cy="100" rx="10" ry="5" fill="#4a3520" transform="rotate(-30 44 100)" opacity="0.7" />
      {/* Petals outer */}
      <ellipse cx="50" cy="45" rx="12" ry="20" fill="#6b4226" opacity="0.7" />
      <ellipse cx="35" cy="50" rx="12" ry="16" fill="#6b4226" opacity="0.6" transform="rotate(-30 35 50)" />
      <ellipse cx="65" cy="50" rx="12" ry="16" fill="#6b4226" opacity="0.6" transform="rotate(30 65 50)" />
      <ellipse cx="38" cy="35" rx="10" ry="15" fill="#9c6644" opacity="0.7" transform="rotate(-15 38 35)" />
      <ellipse cx="62" cy="35" rx="10" ry="15" fill="#9c6644" opacity="0.7" transform="rotate(15 62 35)" />
      {/* Inner */}
      <ellipse cx="50" cy="42" rx="9" ry="14" fill="#c8a882" opacity="0.8" />
      <ellipse cx="50" cy="40" rx="6" ry="9" fill="#e2c9a8" opacity="0.9" />
      <circle cx="50" cy="38" r="4" fill="#fdf6ee" opacity="0.9" />
    </svg>
  );
}

// Corner ornament
function CornerOrnament() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M10 10 Q10 60 60 110" stroke="#c9a96e" strokeWidth="0.8" opacity="0.5" />
      <path d="M10 10 Q60 10 110 60" stroke="#c9a96e" strokeWidth="0.8" opacity="0.5" />
      <path d="M10 10 L30 10 Q20 20 10 30Z" fill="#9c6644" opacity="0.2" />
      <circle cx="10" cy="10" r="3" fill="#c9a96e" opacity="0.5" />
      <circle cx="30" cy="10" r="1.5" fill="#c8a882" opacity="0.4" />
      <circle cx="10" cy="30" r="1.5" fill="#c8a882" opacity="0.4" />
      <path d="M20 10 Q15 15 10 20" stroke="#c9a96e" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// Floating petal component
function FloatingPetal({ delay, duration, left, color }: { delay: number; duration: number; left: number; color: string }) {
  return (
    <div
      className="petal"
      style={{
        left: `${left}%`,
        width: '8px',
        height: '12px',
        background: color,
        borderRadius: '50% 0 50% 0',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        bottom: 0,
      }}
    />
  );
}

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const [splashExiting, setSplashExiting] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hearts particle system
  useEffect(() => {
    if (!showMain) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    interface Heart {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; fadeSpeed: number;
      rotation: number; rotSpeed: number;
      color: string;
    }

    const hearts: Heart[] = [];
    const colors = ["#c9a96e", "#9c6644", "#c8a882", "#e2c9a8", "#6b4226"];

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.25);
      ctx.bezierCurveTo(size * 0.5, -size * 0.75, size, size * 0.1, 0, size * 0.6);
      ctx.bezierCurveTo(-size, size * 0.1, -size * 0.5, -size * 0.75, 0, -size * 0.25);
      ctx.closePath();
      ctx.restore();
    };

    const spawnHeart = () => {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -(Math.random() * 1.2 + 0.4),
        opacity: Math.random() * 0.4 + 0.15,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const spawnInterval = setInterval(spawnHeart, 320);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.x += h.speedX;
        h.y += h.speedY;
        h.rotation += h.rotSpeed;
        h.opacity -= h.fadeSpeed;
        if (h.opacity <= 0 || h.y < -30) {
          hearts.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = h.opacity;
        ctx.fillStyle = h.color;
        drawHeart(ctx, h.x, h.y, h.size, h.rotation);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [showMain]);

  const handleEnter = () => {
    setSplashExiting(true);
    setTimeout(() => {
      setShowMain(true);
      setTimeout(() => setMainVisible(true), 50);
    }, 1000);
  };

  const petals = [
    { delay: 0, duration: 12, left: 8, color: "#9c6644" },
    { delay: 2, duration: 15, left: 18, color: "#c8a882" },
    { delay: 4, duration: 11, left: 35, color: "#6b4226" },
    { delay: 6, duration: 14, left: 52, color: "#c9a96e" },
    { delay: 1, duration: 13, left: 68, color: "#9c6644" },
    { delay: 3, duration: 16, left: 80, color: "#c8a882" },
    { delay: 5, duration: 12, left: 92, color: "#6b4226" },
    { delay: 7, duration: 14, left: 25, color: "#c9a96e" },
    { delay: 2.5, duration: 11, left: 45, color: "#c8a882" },
    { delay: 8, duration: 15, left: 75, color: "#9c6644" },
  ];

  return (
    <>
      {/* SPLASH PAGE */}
      {!showMain && (
        <div className={`splash ${splashExiting ? "exiting" : ""}`}>
          <div className="splash-bg" />

          {/* Decorative roses */}
          <div style={{ position: "absolute", top: "8%", left: "5%", opacity: 0.3, transform: "rotate(-20deg)" }}>
            <RoseSVG size={70} />
          </div>
          <div style={{ position: "absolute", top: "8%", right: "5%", opacity: 0.3, transform: "rotate(20deg) scaleX(-1)" }}>
            <RoseSVG size={70} />
          </div>
          <div style={{ position: "absolute", bottom: "8%", left: "8%", opacity: 0.2, transform: "rotate(15deg)" }}>
            <RoseSVG size={55} />
          </div>
          <div style={{ position: "absolute", bottom: "8%", right: "8%", opacity: 0.2, transform: "rotate(-15deg) scaleX(-1)" }}>
            <RoseSVG size={55} />
          </div>

          {/* Corner ornaments */}
          <div className="corner-deco tl"><CornerOrnament /></div>
          <div className="corner-deco tr"><CornerOrnament /></div>
          <div className="corner-deco bl"><CornerOrnament /></div>
          <div className="corner-deco br"><CornerOrnament /></div>

          {/* Floating petals */}
          <div className="splash-flowers">
            {petals.slice(0, 6).map((p, i) => (
              <FloatingPetal key={i} {...p} />
            ))}
          </div>

          <p className="splash-title">For You, Rahma</p>
          <button className="splash-btn" onClick={handleEnter}>
            ✦ Click Here ✦
          </button>
        </div>
      )}

      {/* MAIN PAGE */}
      {showMain && (
        <div className={`main-page ${mainVisible ? "visible" : ""}`}>
          {/* Background */}
          <div className="main-bg" />

          {/* Hearts canvas */}
          <canvas ref={canvasRef} id="hearts-canvas" />

          {/* Corner decorations */}
          <div className="corner-deco tl" style={{ opacity: 0.12 }}><CornerOrnament /></div>
          <div className="corner-deco tr" style={{ opacity: 0.12 }}><CornerOrnament /></div>
          <div className="corner-deco bl" style={{ opacity: 0.12 }}><CornerOrnament /></div>
          <div className="corner-deco br" style={{ opacity: 0.12 }}><CornerOrnament /></div>

          {/* Floating roses on sides */}
          <div className="flowers-layer">
            <div style={{ position: "absolute", top: "12%", left: "1%", opacity: 0.22, transform: "rotate(-15deg)" }}>
              <RoseSVG size={65} />
            </div>
            <div style={{ position: "absolute", top: "12%", right: "1%", opacity: 0.22, transform: "rotate(15deg) scaleX(-1)" }}>
              <RoseSVG size={65} />
            </div>
            <div style={{ position: "absolute", top: "42%", left: "0%", opacity: 0.15, transform: "rotate(-5deg)" }}>
              <FlowerSVG size={55} opacity={1} />
            </div>
            <div style={{ position: "absolute", top: "42%", right: "0%", opacity: 0.15, transform: "rotate(5deg)" }}>
              <FlowerSVG size={55} opacity={1} />
            </div>
            <div style={{ position: "absolute", bottom: "10%", left: "2%", opacity: 0.18, transform: "rotate(10deg)" }}>
              <RoseSVG size={50} />
            </div>
            <div style={{ position: "absolute", bottom: "10%", right: "2%", opacity: 0.18, transform: "rotate(-10deg) scaleX(-1)" }}>
              <RoseSVG size={50} />
            </div>
          </div>

          {/* Floating petals */}
          <div className="flowers-layer">
            {petals.map((p, i) => (
              <FloatingPetal key={i} {...p} />
            ))}
          </div>

          {/* ARABIC NAME */}
          <div className="name-section">
            <h1 className="arabic-name">رحمة</h1>
            <div className="name-underline" />
          </div>

          {/* LYRICS */}
          <div className="lyrics-section">
            <p className="lyrics-text">
              <span className="lyrics-line">You are the vitamin that dominates my body,</span>
              <span className="lyrics-line">being by your side, you know how it fascinates me.</span>
              <span className="lyrics-line">I give you the sky, I bring you down the moon,</span>
              <span className="lyrics-line">I tell you: beautiful girl, there is no one like you.</span>
              <span className="lyrics-line">You are my favorite, a rose without thorns,</span>
              <span className="lyrics-line">you are the path my soul walks.</span>
            </p>
          </div>

          {/* IMAGEN */}
<div className="video-section">
  <div className="video-wrapper">
    <img
      src="/rahma.png"
      alt="Rahma"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
    <div className="video-glow" />
  </div>
</div>
        </div>
      )}
    </>
  );
}
