import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find a Top Denver Realtor | Agent Matching | Obsidian Denver',
  description:
    'Get matched with a vetted, top-performing Denver real estate agent. Join 350+ Denver families who skipped the guesswork. West Highland, LoHi, Sloan\'s Lake & all Denver neighborhoods. Keller Williams Urban Elite.',
  keywords: [
    'best realtor Denver',
    'top real estate agent Denver',
    'Denver realtor near me',
    'find a realtor Denver',
    'Denver real estate agent',
    'West Highland realtor',
    'LoHi real estate agent',
    'Sloan\'s Lake realtor',
    'Denver buyer agent',
    'Denver listing agent',
  ],
  openGraph: {
    title: 'Find a Top Denver Realtor | Obsidian Denver',
    description:
      'Get matched with a vetted, top-performing Denver real estate agent. Join 350+ Denver families who found their perfect agent match.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Obsidian Denver',
  },
};

export default function FindRealtorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
