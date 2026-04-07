import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moving to Denver? Relocation Guide & Realtor Support | Obsidian Denver',
  description:
    'Relocating to Denver with family? Obsidian Denver handles the housing so you can focus on your move. Trusted by Google, Lockheed Martin & RBC employees. Expert neighborhood guidance for West Highland, LoHi & beyond.',
  keywords: [
    'moving to Denver',
    'relocating to Denver',
    'Denver relocation realtor',
    'moving to Denver from California',
    'Denver relocation guide',
    'best neighborhoods in Denver for families',
    'Denver schools',
    'corporate relocation Denver',
    'Denver cost of living',
    'Denver family neighborhoods',
  ],
  openGraph: {
    title: 'Moving to Denver? Relocation Guide | Obsidian Denver',
    description:
      'Relocating to Denver with family? We handle the housing so you can focus on your move. Trusted by Fortune 500 companies. Expert neighborhood guidance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Obsidian Denver',
  },
};

export default function MovingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
