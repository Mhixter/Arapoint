import React from 'react';

interface NetworkLogoProps {
  network: 'mtn' | 'airtel' | 'glo' | '9mobile';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
};

const NetworkLogo: React.FC<NetworkLogoProps> = ({ network, size = 'md' }) => {
  const sizeClass = sizeClasses[size];

  if (network === 'mtn') {
    return (
      <svg className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mtnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFC700', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#mtnGrad)" rx="8" />
        <circle cx="25" cy="50" r="16" fill="#000" />
        <circle cx="50" cy="50" r="16" fill="#000" />
        <circle cx="75" cy="50" r="16" fill="#000" />
        <circle cx="25" cy="50" r="14" fill="#FFD700" opacity="0.3" />
        <circle cx="50" cy="50" r="14" fill="#FFD700" opacity="0.3" />
        <circle cx="75" cy="50" r="14" fill="#FFD700" opacity="0.3" />
      </svg>
    );
  }

  if (network === 'airtel') {
    return (
      <svg className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="airtelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E60000', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#CC0000', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#airtelGrad)" rx="8" />
        <g>
          <path d="M50 25 L58 40 L75 40 L62 50 L70 65 L50 55 L30 65 L38 50 L25 40 L42 40 Z" fill="white" />
          <circle cx="50" cy="75" r="4" fill="white" />
        </g>
      </svg>
    );
  }

  if (network === 'glo') {
    return (
      <svg className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#004D00', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#003300', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#gloGrad)" rx="8" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="6" />
        <path d="M50 22 Q68 35 68 50 Q68 65 50 78" fill="none" stroke="white" strokeWidth="5" />
        <path d="M50 22 Q32 35 32 50 Q32 65 50 78" fill="none" stroke="white" strokeWidth="5" />
        <circle cx="50" cy="50" r="5" fill="white" />
      </svg>
    );
  }

  if (network === '9mobile') {
    return (
      <svg className={sizeClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="9mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1A472A', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0F2818', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#9mobileGrad)" rx="8" />
        <g>
          <text x="50" y="48" fontSize="32" fontWeight="900" fill="#00D084" textAnchor="middle" fontFamily="Arial, sans-serif">
            9
          </text>
          <circle cx="50" cy="65" r="3" fill="#00D084" />
        </g>
      </svg>
    );
  }

  return null;
};

export default NetworkLogo;
