import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '600', '700']
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Obsidian Denver | Architectural & Historic Homes | West Highland, LoHi, Sloan's Lake",
  description: "Denver's boutique real estate team specializing in architectural, historic, and luxury properties across West Highland, LoHi, and Sloan's Lake. KW Urban Elite. David & Dax — Co-Founders.",
  keywords: [
    "Denver real estate",
    "West Highland homes for sale",
    "LoHi real estate",
    "Sloan's Lake homes",
    "Denver luxury homes",
    "Denver historic homes",
    "Denver realtor",
    "Keller Williams Urban Elite Denver",
  ],
  openGraph: {
    title: "Obsidian Denver | Architectural & Historic Homes",
    description: "Denver's boutique real estate team specializing in architectural, historic, and luxury properties across West Highland, LoHi, and Sloan's Lake.",
    type: "website",
    locale: "en_US",
    siteName: "Obsidian Denver",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* JSON-LD Structured Data: RealEstateAgent + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["RealEstateAgent", "LocalBusiness"],
              name: "Obsidian Denver",
              description:
                "Denver's boutique real estate team specializing in architectural, historic, and luxury properties across West Highland, LoHi, and Sloan's Lake.",
              url: "https://obsidiandenver.com",
              telephone: "+17207066768",
              address: {
                "@type": "PostalAddress",
                streetAddress: "4045 N Pecos St #201",
                addressLocality: "Denver",
                addressRegion: "CO",
                postalCode: "80211",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 39.7713,
                longitude: -105.0166,
              },
              areaServed: [
                { "@type": "City", name: "Denver, CO" },
                { "@type": "Neighborhood", name: "West Highland, Denver" },
                { "@type": "Neighborhood", name: "LoHi, Denver" },
                { "@type": "Neighborhood", name: "Sloan's Lake, Denver" },
                { "@type": "Neighborhood", name: "Highland, Denver" },
                { "@type": "Neighborhood", name: "Berkeley, Denver" },
                { "@type": "City", name: "Arvada, CO" },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "19",
                bestRating: "5",
              },
              priceRange: "$$$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "19:00",
              },
              member: [
                {
                  "@type": "Person",
                  name: "David",
                  jobTitle: "Co-Founder & Real Estate Expert",
                },
                {
                  "@type": "Person",
                  name: "Dax",
                  jobTitle: "Co-Founder & Real Estate Expert",
                },
              ],
              parentOrganization: {
                "@type": "Organization",
                name: "Keller Williams Urban Elite",
              },
            }),
          }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TWK9Q9NR');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWK9Q9NR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SiteHeader />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17827272815"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17827272815');
            gtag('config', 'G-FF0EWBXMKM');
          `}
        </Script>
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_8ee35a1b99c74c969f274765867e1ad2"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
