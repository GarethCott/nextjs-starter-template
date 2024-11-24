'use client';

import React from 'react';

type Props = {
  title: string;
  description?: string;
  center?: boolean;
};

function Heading({ title, description, center }: Props) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold'>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{description}</div>
    </div>
  );
}

export default Heading;
