import { TimeDisplay } from './Control';

export function formatTime(elapsed: number): TimeDisplay {
  return {
    hours: String(Math.floor(elapsed / 3600)).padStart(2, '0'),
    minutes: String(Math.floor(elapsed / 60)).padStart(2, '0'),
    seconds: String(elapsed % 60).padStart(2, '0')
  };
}
