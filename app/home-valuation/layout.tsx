import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Denver Home Valuation | What\'s Your Home Really Worth? | Obsidian Denver',
  description:
    'Get an accurate home valuation from Denver experts — not algorithms. Obsidian Denver provides personalized property assessments for West Highland, LoHi, Sloan\'s Lake & beyond. Keller Williams Urban Elite.',
  keywords: [
    'Denver home valuation',
    'what is my house worth Denver',
    'Denver home appraisal',
    'free home value estimate Denver',
    'West Highland home value',
    'LoHi home value',
    'Sloan\'s Lake home value',
    'Denver real estate',
    'sell my house Denver',
    'Denver home price',
  ],
  openGraph: {
    title: 'Free Denver Home Valuation | Obsidian Denver',
    description:
      'Get an accurate home valuation from Denver experts — not algorithms. Personalized property assessments for West Highland, LoHi, Sloan\'s Lake & beyond.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Obsidian Denver',
  },
};

export default function HomeValuationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
