'use client';

import clsx from 'clsx';
import { CreditCard, Laptop, Phone, Plus, Shield } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Color = (typeof colorList)[number];

export default function ComponentPage() {
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');
  const [color, setColor] = React.useState<Color>('sky');
  function toggleMode() {
    return mode === 'dark' ? setMode('light') : setMode('dark');
  }

  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <main>
      <section
        className={clsx(mode === 'dark' ? 'bg-dark' : 'bg-white', color)}
      >
        <div
          className={clsx(
            'layout min-h-screen py-20',
            mode === 'dark' ? 'text-white' : 'text-black'
          )}
        >
          <h1>Built-in Components</h1>
          <div className='mt-8 flex flex-wrap gap-2'>
            <Button
              onClick={toggleMode}
              variant={mode === 'dark' ? 'default' : 'secondary'}
            >
              Set to {mode === 'dark' ? 'light' : 'dark'}
            </Button>
          </div>

          <ol className='mt-8 space-y-6'>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Customize Colors</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                You can change primary color to any Tailwind CSS colors. See
                globals.css to change your color.
              </p>
              <div className='flex flex-wrap gap-2'>
                <Select
                  value={color}
                  onValueChange={(value) => setColor(value as Color)}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select a color' />
                  </SelectTrigger>
                  <SelectContent>
                    {colorList.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button asChild variant='outline'>
                  <a href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/src/styles/colors.css'>
                    Check list of colors
                  </a>
                </Button>
              </div>
              <div className='flex flex-wrap gap-2 text-xs font-medium'>
                <div className='bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                  50
                </div>
                <div className='bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                  100
                </div>
                <div className='bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                  200
                </div>
                <div className='bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                  300
                </div>
                <div className='bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                  400
                </div>
                <div className='bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                  500
                </div>
                <div className='bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-black'>
                  600
                </div>
                <div className='bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-black'>
                  700
                </div>
                <div className='bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-black'>
                  800
                </div>
                <div className='bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-black'>
                  900
                </div>
                <div className='bg-primary-950 flex h-10 w-10 items-center justify-center rounded text-black'>
                  950
                </div>
              </div>
            </li>
            <li className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Buttons</h2>
              <p className={clsx('!mt-1 text-sm', textColor)}>
                Buttons with various styles.
              </p>
              <div className='space-x-2'>
                <Button>Primary Button</Button>
                <Button variant='secondary'>Secondary Button</Button>
                <Button variant='outline'>Outline Button</Button>
                <Button variant='ghost'>Ghost Button</Button>
                <Button variant='destructive'>Destructive</Button>
              </div>

              <div className='space-x-2'>
                <Button size='lg'>Large</Button>
                <Button>Default</Button>
                <Button size='sm'>Small</Button>
              </div>

              <div className='space-x-2'>
                <Button>
                  <Plus className='mr-2 h-4 w-4' /> With Icon
                </Button>
                <Button variant='secondary'>
                  <Laptop className='mr-2 h-4 w-4' /> With Icon
                </Button>
                <Button variant='outline'>
                  <Phone className='mr-2 h-4 w-4' /> With Icon
                </Button>
              </div>

              <div className='space-x-2'>
                <Button disabled>
                  <Shield className='mr-2 h-4 w-4' /> Disabled
                </Button>
                <Button disabled variant='secondary'>
                  <CreditCard className='mr-2 h-4 w-4' /> Disabled
                </Button>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}

const colorList = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;
