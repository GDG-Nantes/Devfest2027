import React from 'react';
import Image from 'next/image';
import PlanCiteImage from '@/images/plan-cite-transparent.png';

export const PlanCite = () => {
  return (
    <Image
      src={PlanCiteImage}
      alt='Plan H Arena'
      objectFit='contain'
      style={{ maxHeight: '600px', width: 'auto' }}
    />
  );
};
