import type { Favicon } from '@/types/config.ts'

export const defaultFavicons: Favicon[] = [
  {
    src: '/favicon/android-chrome-192x192.png',
    theme: 'light',
    sizes: '192x192',
  },
  {
    src: '/favicon/apple-touch-icon.png',
    theme: 'light',
    sizes: '180x180', // Add appropriate size here if the file is applicable
  },
  {
    src: '/favicon/favicon-32x32.png',
    theme: 'light',
    sizes: '32x32',
  },
  {
    src: '/favicon/android-chrome-512x512.png',
    theme: 'light',
    sizes: '512x512', // This was not in your original, but you can add it.
  },
  {
    src: '/favicon/favicon-16x16.png',
    theme: 'light',
    sizes: '16x16',
  },
  {
    src: '/favicon/favicon.ico',
    theme: 'light',
    sizes: 'any', 
  },
  
  {
    src: '/favicon/android-chrome-192x192.png',
    theme: 'dark',
    sizes: '192x192',
  },
  {
    src: '/favicon/apple-touch-icon.png',
    theme: 'dark',
    sizes: '180x180',
  },
  {
    src: '/favicon/favicon-32x32.png',
    theme: 'dark',
    sizes: '32x32',
  },
  {
    src: '/favicon/android-chrome-512x512.png',
    theme: 'dark',
    sizes: '512x512',
  },
  {
    src: '/favicon/favicon-16x16.png',
    theme: 'dark', 
    sizes: '16x16',
  },
  {
    src: '/favicon/favicon.ico',
    theme: 'dark',
    sizes: 'any',
  },
];