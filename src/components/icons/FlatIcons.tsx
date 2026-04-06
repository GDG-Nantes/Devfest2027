import React from 'react';

/**
 * Flat SVG icons as React components.
 * All icons are monochrome, flat design, no gradients or shadows.
 */

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
  </svg>
);

export const ExpandMoreIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    style={style}
    className={className}
  >
    <path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z' />
    <circle cx='12' cy='13' r='3' />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M8 5v14l11-7z' />
  </svg>
);

export const AppleIcon: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
  </svg>
);

export const AndroidIcon: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  style,
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={style}
    className={className}
  >
    <path d='M17.523 15.341c-.583 0-1.055.473-1.055 1.055 0 .583.473 1.055 1.055 1.055.583 0 1.056-.473 1.056-1.055 0-.583-.473-1.055-1.056-1.055zm-11.046 0c-.583 0-1.055.473-1.055 1.055 0 .583.473 1.055 1.055 1.055.583 0 1.055-.473 1.055-1.055 0-.583-.472-1.055-1.055-1.055zm11.405-6.02l1.953-3.382a.406.406 0 00-.148-.554.406.406 0 00-.554.148l-1.978 3.424a12.04 12.04 0 00-5.155-1.139c-1.849 0-3.583.392-5.155 1.139L4.867 5.533a.406.406 0 00-.554-.148.406.406 0 00-.148.554l1.953 3.382C2.695 11.473.337 15.303 0 19.691h24c-.337-4.388-2.695-8.218-6.118-10.37z' />
  </svg>
);
