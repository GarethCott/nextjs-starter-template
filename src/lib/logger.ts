/* eslint-disable no-console */
import { showLogger } from '@/constant/env';

type LogType = 'info' | 'error' | 'success';

const LOG_COLORS = {
  info: '#22D3EE', // cyan
  error: '#EF4444', // red
  success: '#10B981', // green
} as const;

/**
 * Base logger function
 */
function baseLogger(
  message: string,
  details?: unknown,
  type: LogType = 'info',
): void {
  if (!showLogger) return;

  const color = LOG_COLORS[type];
  const prefix = type.toUpperCase();

  console.log(
    `%c ============== ${prefix} LOG \n`,
    `color: ${color}; font-weight: bold;`,
    `${typeof window !== 'undefined' && window?.location.pathname}\n`,
    `=== ${message}\n`,
    details ? details : '',
  );
}

const logger = {
  log: (message: string, details?: unknown) =>
    baseLogger(message, details, 'info'),
  error: (message: string, error?: unknown) =>
    baseLogger(message, error, 'error'),
  success: (message: string, details?: unknown) =>
    baseLogger(message, details, 'success'),
};

export default logger;
