import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoopCart — Good things, together',
  description: 'CoopCart is preparing a neighbourhood-first way to buy everyday essentials together across Lagos. Check your local area status.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
