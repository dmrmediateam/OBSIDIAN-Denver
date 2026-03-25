import PropertyLandingClient from './PropertyLandingClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ location: '3227-w-20th-ave-denver-co-80211' }];
}

export default function PropertyPage() {
  return <PropertyLandingClient />;
}
