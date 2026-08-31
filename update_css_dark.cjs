const fs = require('fs');

fs.writeFileSync('src/index.css', `@import "tailwindcss";

@layer base {
  :root {
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  }
  
  html, body {
    font-family: var(--font-sans);
    color: #f4f4f6;
    background-color: #090a0f;
    overflow-x: hidden;
  }
}

/* Custom 3D Perspective & Floating Effects */
.perspective-1000 {
  perspective: 1200px;
}

.perspective-mockup {
  transform: rotateY(-7deg) rotateX(12deg) rotateZ(-1.5deg);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
  box-shadow: 
    0 30px 80px -15px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 40px -10px rgba(147, 51, 234, 0.2);
}

.perspective-mockup:hover {
  transform: rotateY(-3deg) rotateX(6deg) rotateZ(-0.5deg) translateY(-4px);
  box-shadow: 
    0 40px 90px -15px rgba(0, 0, 0, 0.9),
    0 0 0 1px rgba(255, 255, 255, 0.15),
    0 0 50px -5px rgba(147, 51, 234, 0.3);
}

/* Studio Spotlight & Ambient Lighting */
.studio-spotlight {
  background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(20, 20, 28, 0) 70%);
}

.studio-glow-purple {
  box-shadow: 0 0 50px -10px rgba(147, 51, 234, 0.35);
}

/* Frosted Dark Glass Cards */
.dark-glass {
  background: rgba(18, 19, 26, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dark-glass-subtle {
  background: rgba(24, 25, 35, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Custom smooth pulse */
@keyframes subtle-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-float {
  animation: subtle-float 6s ease-in-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
}

.animate-pulse-ring {
  animation: pulse-ring 4s ease-in-out infinite;
}

/* Clean Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #090a0f;
}

::-webkit-scrollbar-thumb {
  background: #272732;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3f3f50;
}
`, 'utf8');

console.log('index.css updated with dark titanium background and glass styles');
