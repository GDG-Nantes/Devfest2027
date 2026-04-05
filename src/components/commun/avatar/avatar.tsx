'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

interface MyAvatarProps extends ImageProps {
  size?: number;
}

export const MyAvatar: React.FC<MyAvatarProps> = (props) => {
  const size = props.size || props.width || 100;

  return (
    <div
      className='avatar-picture-container'
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <Image
        className='avatar-picture'
        src={props.src}
        alt={props.alt}
        width={props.width || size}
        height={props.height || size}
      />
    </div>
  );
};
