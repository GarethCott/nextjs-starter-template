'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  buttonLabel?: string;
  onReset?: () => void;
};

function EmptyState({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset,
  buttonLabel = 'Reset Filters',
  onReset,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className='h-[60vh] flex flex-col gap-2 justify-center items-center'
    >
      <Heading center title={title} description={subtitle} />
      <div className='w-48 mt-4'>
        {showReset && <Button onClick={onReset}>{buttonLabel}</Button>}
      </div>
    </motion.div>
  );
}

export default EmptyState;
