import React from 'react';

export const SparkleIcon = ({ className = "w-5 h-5", size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 8-pointed balanced celestial sparkle */}
    <path 
      d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" 
      fill="#7c3aed" 
    />
    <path 
      d="M12 2V22M2 12H22" 
      stroke="#7c3aed" 
      strokeWidth="1.25" 
      strokeLinecap="round" 
    />
    <path 
      d="M5 5L19 19M19 5L5 19" 
      stroke="#8b5cf6" 
      strokeWidth="0.8" 
      strokeLinecap="round" 
      opacity="0.5" 
    />
    <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
  </svg>
);

export const StarSparkle = ({ className = "w-4 h-4 text-purple-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);
