'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Barlow, Barlow_Condensed, Cormorant_Garamond } from 'next/font/google';
import SiteFooter from '../components/SiteFooter';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-body',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-ui',
});

const photoPaths = {
  hero: '/01-virtual%20Enhanced-2026-02-10T04-15-15.webp',
  dayExterior: '/04-virtual%20Enhanced-2026-02-10T05-20-46.webp',
  kitchenWide: '/13-75A0984.webp',
  kitchenAngle: '/14-75A0988.webp',
  livingRoom: '/15-75A0994.webp',
  openPlan: '/16-75A0999.webp',
  loftLiving: '/20-75A0900.webp',
  upperBedroom: '/21-75A0868.webp',
  showerBath: '/23-75A0880.webp',
  secondBedroom: '/27-75A0908.webp',
  primaryBedroom: '/28-75A0914.webp',
  loftBath: '/38-75A0973.webp',
  backyard: '/40-75A1026.webp',
  david: '/KWUE_3%20(1).webp',
  daxon: '/JHP_0162_S%20(1).webp',
} as const;

type PhotoKey = keyof typeof photoPaths;

type Photo = {
  key: PhotoKey;
  label: string;
  alt: string;
  src: string;
};

type StatItem = {
  value: string;
  label: string;
  subLabel: string;
};

type SpecRow = {
  label: string;
  value: string;
};

type NeighborhoodCard = {
  icon: string;
  title: string;
  detail: string;
};

type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
};

type ListingData = {
  slug: string;
  address: string;
  cityStateZip: string;
  neighborhood: string;
  price: string;
  pricePerSqFt: string;
  beds: string;
  baths: string;
  squareFeet: string;
  lotSize: string;
  yearBuilt: string;
  propertyType: string;
  style: string;
  stories: string;
  garage: string;
  hoa: string;
  subdivision: string;
  zoning: string;
  mlsNumber: string;
  listedDate: string;
  annualTaxes: string;
  taxAssessed: string;
  walkScore: string;
  transitScore: string;
  bikeScore: string;
  heroEyebrow: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroIntro: string;
  detailParagraphs: string[];
  featureList: string[];
  statStrip: StatItem[];
  specs: SpecRow[];
  loftCalloutTitle: string;
  loftCalloutBody: string;
  loftFeatureBody: string;
  loftFeatureStats: StatItem[];
  locationBody: string;
  neighborhoodCards: NeighborhoodCard[];
};

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const allPhotos: Photo[] = [
  {
    key: 'hero',
    label: 'Twilight Exterior',
    alt: 'Twilight exterior of 3227 W 20th Ave in Denver.',
    src: photoPaths.hero,
  },
  {
    key: 'dayExterior',
    label: 'Daytime Exterior',
    alt: 'Daytime exterior of the modern half-duplex at 3227 W 20th Ave.',
    src: photoPaths.dayExterior,
  },
  {
    key: 'kitchenWide',
    label: 'Chef’s Kitchen',
    alt: 'Chef’s kitchen with quartz counters and oversized island.',
    src: photoPaths.kitchenWide,
  },
  {
    key: 'kitchenAngle',
    label: 'Kitchen Angle',
    alt: 'Additional angle of the chef’s kitchen and open-plan layout.',
    src: photoPaths.kitchenAngle,
  },
  {
    key: 'livingRoom',
    label: 'Living Room',
    alt: 'Light-filled living room at 3227 W 20th Ave.',
    src: photoPaths.livingRoom,
  },
  {
    key: 'openPlan',
    label: 'Open Floor Plan',
    alt: 'Open floor plan connecting kitchen, dining, and living.',
    src: photoPaths.openPlan,
  },
  {
    key: 'primaryBedroom',
    label: 'Primary Suite',
    alt: 'Primary bedroom suite inside the home.',
    src: photoPaths.primaryBedroom,
  },
  {
    key: 'secondBedroom',
    label: 'Second Bedroom',
    alt: 'Second bedroom on the upper level.',
    src: photoPaths.secondBedroom,
  },
  {
    key: 'upperBedroom',
    label: 'Third Bedroom',
    alt: 'Upper bedroom on the third floor.',
    src: photoPaths.upperBedroom,
  },
  {
    key: 'showerBath',
    label: 'Glass Shower Bath',
    alt: 'Bathroom with glass shower detail.',
    src: photoPaths.showerBath,
  },
  {
    key: 'backyard',
    label: 'Backyard Pergola',
    alt: 'Private backyard with pergola, turf, and string lights.',
    src: photoPaths.backyard,
  },
  {
    key: 'loftLiving',
    label: 'Loft Living',
    alt: 'Third-floor loft living area with entertaining potential.',
    src: photoPaths.loftLiving,
  },
  {
    key: 'loftBath',
    label: 'Loft Bath',
    alt: 'Bathroom serving the third-floor loft and bedroom level.',
    src: photoPaths.loftBath,
  },
];

const photoMap = new Map(allPhotos.map((photo, index) => [photo.key, { photo, index }]));

const photoStripKeys: PhotoKey[] = ['dayExterior', 'kitchenWide', 'livingRoom', 'openPlan', 'backyard'];
const galleryRowKeys: PhotoKey[] = [
  'kitchenWide',
  'livingRoom',
  'openPlan',
  'primaryBedroom',
  'secondBedroom',
  'showerBath',
  'backyard',
  'loftLiving',
];

const listing: ListingData = {
  slug: '3227-w-20th-ave-denver-co-80211',
  address: '3227 W 20th Ave',
  cityStateZip: 'Denver, CO 80211',
  neighborhood: "Sloan's Lake",
  price: '$1,050,000',
  pricePerSqFt: '$444/sqft',
  beds: '3',
  baths: '4',
  squareFeet: '2,363',
  lotSize: '3,697 sq ft',
  yearBuilt: '2015',
  propertyType: 'Modern Half-Duplex',
  style: 'Contemporary',
  stories: 'Three or more + rooftop deck',
  garage: '2-car detached + 2 off-street',
  hoa: 'None',
  subdivision: 'Highlands',
  zoning: 'U-TU-C',
  mlsNumber: '6527217',
  listedDate: 'February 13, 2026',
  annualTaxes: '$5,926',
  taxAssessed: '$1,171,700',
  walkScore: '79',
  transitScore: '50',
  bikeScore: '71',
  heroEyebrow: "Sloan's Lake · Denver, CO 80211 · Built 2015",
  heroTitleTop: 'Modern Living on',
  heroTitleBottom: 'West 20th Avenue',
  heroIntro:
    "A contemporary half-duplex just blocks from Sloan's Lake, offering three above-grade levels, a rooftop deck, chef's kitchen, and the kind of polished indoor-outdoor living that reads move-in ready from the first showing.",
  detailParagraphs: [
    "Built in 2015 and thoughtfully composed across more than 2,300 square feet, 3227 W 20th Ave delivers the clean lines buyers want in Sloan's Lake without sacrificing warmth. Quartz surfaces, wide-plank hardwoods, a gas range, built-in wine cooler, and natural light throughout create a modern home that still feels grounded in Denver's organic material palette.",
    "The floor plan is practical as much as it is striking: a connected kitchen, dining, and living level with a dedicated office nook and powder bath; two en-suite bedrooms and laundry on the second floor; then a third-floor flex loft with wet bar, wine fridge, bedroom, full bath, and rooftop deck access above. Add the fenced backyard, pergola, detached two-car garage, and no HOA, and the result is a highly livable urban property minutes from LoHi, Downtown, and the park.",
  ],
  featureList: [
    "Chef's kitchen with quartz island, gas range & built-in wine cooler",
    'Open plan main floor — kitchen, dining, living all connected',
    'Dedicated main-floor office nook',
    'Wide-plank hardwood floors throughout',
    'Primary suite with walk-in closet & dual-head shower',
    'Second en-suite bedroom on primary level',
    'Third-floor loft with wet bar & wine fridge',
    'Rooftop deck with panoramic Denver city views',
    'Private backyard with pergola, turf & string lights',
    '2-car detached garage + 2 off-street spaces',
    'Smart lighting, video doorbell, tankless water heater',
    'All appliances included — washer, dryer, refrigerator + more',
    'No HOA',
  ],
  statStrip: [
    { value: '$1,050,000', label: 'List Price', subLabel: 'No HOA' },
    { value: '3', label: 'Bedrooms', subLabel: 'All upper level' },
    { value: '2,363', label: 'Square Feet', subLabel: '$444 per sq ft' },
    { value: '2015', label: 'Year Built', subLabel: 'Contemporary' },
    { value: '3 Levels + Rooftop', label: 'Stories', subLabel: 'Panoramic Views' },
    { value: 'Detached 2-Car', label: 'Garage', subLabel: '+ 2 off-street' },
  ],
  specs: [
    { label: 'Address', value: '3227 W 20th Ave' },
    { label: 'City', value: 'Denver, CO 80211' },
    { label: 'Neighborhood', value: "Sloan's Lake" },
    { label: 'MLS#', value: '6527217' },
    { label: 'Type', value: 'Modern Half-Duplex' },
    { label: 'Year Built', value: '2015' },
    { label: 'Square Feet', value: '2,363 sq ft' },
    { label: 'Lot Size', value: '3,697 sq ft' },
    { label: 'Bedrooms', value: '3' },
    { label: 'Bathrooms', value: '4 (1 full · 2 three-quarter · 1 half)' },
    { label: 'Stories', value: '3 + Rooftop Deck' },
    { label: 'Garage', value: '2-Car Detached + 2 Off-Street' },
    { label: 'HOA', value: 'None' },
    { label: 'Annual Taxes', value: '$5,926' },
    { label: 'Elementary', value: 'Brown Elementary · 8/10 GS · 0.5 mi' },
    { label: 'Middle', value: 'Lake Middle School · 0.3 mi' },
    { label: 'High School', value: 'North High School · 0.9 mi' },
    { label: 'Walk Score', value: '79 / 100' },
    { label: 'Transit Score', value: '50 / 100' },
    { label: 'Bike Score', value: '71 / 100' },
  ],
  loftCalloutTitle: 'The Third Floor: Entertain or Earn',
  loftCalloutBody:
    'The 322 sq ft loft level combines a wet bar, wine fridge, third bedroom, full bath, and immediate rooftop deck access, making it equally compelling as an Airbnb-style guest suite, entertaining lounge, flex office, or income-minded retreat.',
  loftFeatureBody:
    "At the top of the home, the third floor becomes its own destination. The loft's 23×14 footprint gives owners room for a second living area, media den, creative studio, or elevated hosting zone, while the wet bar and wine fridge make the transition from indoors to rooftop effortless. Step outside and the panoramic city views do the rest.",
  loftFeatureStats: [
    { value: '322 Sq Ft', label: 'Loft Area', subLabel: '' },
    { value: 'Wet Bar + Wine Fridge', label: 'Feature', subLabel: '' },
    { value: 'Panoramic City Views', label: 'Deck', subLabel: '' },
  ],
  locationBody:
    "This stretch of West 20th puts Sloan's Lake within a short walk while keeping LoHi, Downtown, and I-25 close enough for an easy daily rhythm. It is the kind of address that supports both neighborhood living and city access without compromise.",
  neighborhoodCards: [
    { icon: '🌊', title: "Sloan's Lake Park", detail: '3 blocks — trail, paddleboarding, sunsets' },
    { icon: '🍺', title: 'Odell Brewing & Joyride', detail: "Steps away — Denver's best craft beer scene" },
    { icon: '🥐', title: 'Rise & Shine Biscuit Co', detail: 'Steps away — neighborhood breakfast institution' },
    { icon: '🏟', title: 'Empower Field', detail: '1 mile — Broncos & major concerts' },
    { icon: '🎬', title: 'Alamo Drafthouse', detail: '1 mile — dine-in cinema & events' },
    { icon: '🏙', title: 'LoHi & Downtown', detail: 'Minutes via I-25 or bike' },
  ],
};

function getPhoto(key: PhotoKey) {
  const entry = photoMap.get(key);

  if (!entry) {
    throw new Error(`Missing photo for key: ${key}`);
  }

  return entry;
}

export default function PropertyLandingClient() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [quickInfoOpen, setQuickInfoOpen] = useState(false);
  const [quickLeadStatus, setQuickLeadStatus] = useState<SubmissionStatus>('idle');
  const [inquiryStatus, setInquiryStatus] = useState<SubmissionStatus>('idle');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isPropertyExpanded, setIsPropertyExpanded] = useState(false);
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    fbclid: '',
  });
  const pageRef = useRef<HTMLDivElement | null>(null);
  const lightboxDialogRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const galleryScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scope = pageRef.current;

    if (!scope) {
      return;
    }

    const revealNodes = Array.from(scope.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      revealNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setUtmParams({
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '',
      utm_term: params.get('utm_term') ?? '',
      utm_content: params.get('utm_content') ?? '',
      gclid: params.get('gclid') ?? '',
      fbclid: params.get('fbclid') ?? '',
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }

      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === 0 ? allPhotos.length - 1 : current - 1;
        });
      }

      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === allPhotos.length - 1 ? 0 : current + 1;
        });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (!quickInfoOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuickInfoOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [quickInfoOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const openQuickInfo = () => {
    setQuickLeadStatus('idle');
    setQuickInfoOpen(true);
  };

  const closeQuickInfo = () => {
    setQuickInfoOpen(false);
  };

  const handlePrev = () => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? allPhotos.length - 1 : current - 1;
    });
  };

  const handleNext = () => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === allPhotos.length - 1 ? 0 : current + 1;
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void submitLeadForm(event.currentTarget, 'private_showing');
  };

  const submitLeadForm = async (form: HTMLFormElement, leadType: 'quick_info' | 'private_showing') => {
    const setStatus = leadType === 'quick_info' ? setQuickLeadStatus : setInquiryStatus;

    setStatus('submitting');

    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      leadType,
      listingAddress: listing.address,
      listingSlug: listing.slug,
      listingPrice: listing.price,
      pagePath: window.location.pathname,
    };

    try {
      const response = await fetch('/api/submit-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit property inquiry');
      }

      setStatus('success');

      if (leadType === 'quick_info') {
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting property inquiry:', error);
      setStatus('error');
    }
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    const gallery = galleryScrollerRef.current;

    if (!gallery) {
      return;
    }

    const scrollAmount = Math.max(gallery.clientWidth * 0.8, 320);
    gallery.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const activePhoto = lightboxIndex !== null ? allPhotos[lightboxIndex] : null;
  const activeCounter = lightboxIndex !== null ? lightboxIndex + 1 : 0;

  return (
    <div ref={pageRef} className={`${cormorant.variable} ${barlow.variable} ${barlowCondensed.variable} propertyPage ${heroLoaded ? 'hero-loaded' : ''}`}>
      <header ref={heroSectionRef} className="heroSection">
        <div className="heroMedia">
          <Image
            src={photoPaths.hero}
            alt="Twilight exterior of 3227 W 20th Ave."
            fill
            priority
            sizes="100vw"
            className="heroImage"
            onLoad={() => setHeroLoaded(true)}
          />
        </div>
        <div className="heroOverlay" />
        <div className="heroTopBar">
          <Link href="/" className="brandMark">
            <span>Obsidian Denver</span>
          </Link>

          <div className="navRight">
            <div className="navLinks">
              <a href="#gallery">Gallery</a>
              <a href="#details">Details</a>
              <a href="#neighborhood">Location</a>
            </div>
            <a href="#inquire" className="heroTopCta">
              Schedule Showing
            </a>
          </div>
        </div>
        <div className="heroContent">
          <div className="heroEyebrow heroFade heroDelay1">
            <span className="heroEyebrowLine" />
            <span>{listing.heroEyebrow}</span>
          </div>

          <div className="heroTitleWrap heroFade heroDelay2">
            <h1 className="heroTitle">
              <span>{listing.heroTitleTop}</span>
              <span className="heroTitleAccent">{listing.heroTitleBottom}</span>
            </h1>
          </div>

          <div className="heroMetaBar heroFade heroDelay3">
            <div className="heroMetaItem">
              <span className="heroMetaLabel">List Price</span>
              <span className="heroMetaValue">{listing.price}</span>
            </div>
            <div className="heroMetaItem">
              <span className="heroMetaLabel">Beds</span>
              <span className="heroMetaValue">{listing.beds}</span>
            </div>
            <div className="heroMetaItem">
              <span className="heroMetaLabel">Baths</span>
              <span className="heroMetaValue">{listing.baths}</span>
            </div>
            <div className="heroMetaItem">
              <span className="heroMetaLabel">Sq Ft</span>
              <span className="heroMetaValue">{listing.squareFeet}</span>
            </div>
            <div className="heroMetaItem">
              <span className="heroMetaLabel">Built</span>
              <span className="heroMetaValue">{listing.yearBuilt}</span>
            </div>
          </div>

          <div className="heroActions heroFade heroDelay4">
            <button type="button" className="buttonPrimary" onClick={() => document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' })}>
              Schedule a Showing
            </button>
            <button
              type="button"
              className="buttonGhost"
              aria-expanded={quickInfoOpen}
              aria-controls="quick-info-form"
              onClick={openQuickInfo}
            >
              Get More Info
            </button>
          </div>
        </div>
      </header>

      <section className="statStrip">
        <div className="statStripInner">
          {listing.statStrip.map((item, index) => (
            <article key={item.label} className={`statStripItem reveal delay-${Math.min(index % 3, 2) + 1}`}>
              <div className="statPrimary">{item.value}</div>
              <div className="statLabel">{item.label}</div>
              <div className="statSub">{item.subLabel}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="photoStrip reveal">
        <div className="photoStripGrid">
          {photoStripKeys.map((key, index) => {
            const { photo, index: photoIndex } = getPhoto(key);
            const label = photo.label;
            const isMain = index === 0;

            return (
              <button
                key={photo.key}
                type="button"
                className={`photoCell ${isMain ? 'photoCellMain' : ''}`}
                onClick={() => openLightbox(photoIndex)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={isMain ? '(max-width: 960px) 100vw, 50vw' : '(max-width: 960px) 50vw, 25vw'}
                  loading="eager"
                  className="cellImage"
                />
                <span className="cellOverlay">
                  <span className="cellLabel">{label}</span>
                </span>
              </button>
            );
          })}
          <div className="photoStripCtaWrap">
            <button type="button" className="photoStripCta" onClick={openQuickInfo}>
              Get More Info
            </button>
          </div>
        </div>
      </section>

      <section id="details" className="detailsSection">
        <div className="container">
          <div className={`detailsExpandable ${isPropertyExpanded ? 'isExpanded' : ''}`}>
            <div className="detailsGrid">
              <div className="detailsColumn reveal">
              <p className="sectionLabel">The Property</p>
              <h2 className="sectionTitle">
                <span>Three Levels of</span>
                <span>Considered Design</span>
              </h2>
              {listing.detailParagraphs.map((paragraph) => (
                <p key={paragraph} className="bodyText">
                  {paragraph}
                </p>
              ))}

              <div className="featureList">
                {listing.featureList.map((feature) => (
                  <div key={feature} className="featureItem">
                    <span className="featureDot" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

              <div className="detailsColumn reveal delay-1">
                <p className="sectionLabel">Specifications</p>
                <div className="specTable">
                  {listing.specs.map((spec) => (
                    <div key={spec.label} className="specRow">
                      <span className="specLabel">{spec.label}</span>
                      <span className="specValue">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="loftCallout">
                  <p className="loftCalloutTitle">
                    <em>{listing.loftCalloutTitle}</em>
                  </p>
                  <p className="bodyText">{listing.loftCalloutBody}</p>
                </div>
              </div>
            </div>

            {!isPropertyExpanded ? <div className="detailsFade" /> : null}
          </div>

          <button type="button" className="readMoreButton" onClick={() => setIsPropertyExpanded((current) => !current)}>
            {isPropertyExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </section>

      <section id="gallery" className="gallerySection">
        <div className="container">
          <div className="galleryHeader reveal">
            <div>
              <p className="sectionLabel">Gallery</p>
              <h2 className="sectionTitle singleLine">Interior & Exterior</h2>
            </div>
            <div className="galleryControls" aria-label="Gallery navigation">
              <button type="button" className="galleryArrow" onClick={() => scrollGallery('left')} aria-label="Scroll gallery left">
                ‹
              </button>
              <button type="button" className="galleryArrow" onClick={() => scrollGallery('right')} aria-label="Scroll gallery right">
                ›
              </button>
            </div>
          </div>

          <div ref={galleryScrollerRef} className="galleryScroller">
            {galleryRowKeys.map((key) => {
              const { photo, index } = getPhoto(key);

              return (
                <button key={photo.key} type="button" className="galleryThumb" onClick={() => openLightbox(index)}>
                  <span className="galleryThumbInner">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="340px"
                      loading="eager"
                      className="galleryThumbImage"
                    />
                    <span className="galleryThumbOverlay">
                      <span className="galleryThumbLabel">{photo.label}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="loftFeatureSection">
        <div className="loftFeatureMedia reveal">
          <Image src={photoPaths.loftLiving} alt="Third-floor loft living room at 3227 W 20th Ave." fill sizes="(max-width: 960px) 100vw, 50vw" className="featureImage" />
        </div>

        <div className="loftFeatureContent reveal delay-1">
          <p className="sectionLabel">The Third Floor</p>
          <h2 className="sectionTitle">
            <span>Wet Bar. Wine Fridge.</span>
            <span>Rooftop Views.</span>
          </h2>
          <p className="bodyText">{listing.loftFeatureBody}</p>

          <div className="loftMiniStats">
            {listing.loftFeatureStats.map((item) => (
              <div key={item.label} className="loftMiniStat">
                <span className="loftMiniLabel">{item.label}</span>
                <span className="loftMiniValue">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="neighborhood" className="neighborhoodSection">
        <div className="container">
          <div className="neighborhoodHeader">
            <div className="reveal">
              <p className="sectionLabel">Neighborhood</p>
              <h2 className="sectionTitle singleLine">Sloan&apos;s Lake Living</h2>
              <p className="bodyText">{listing.locationBody}</p>
            </div>

            <div className="scoreRow reveal delay-1">
              <div className="scoreItem">
                <span className="scoreValue">{listing.walkScore}</span>
                <span className="scoreLabel">Walk</span>
              </div>
              <div className="scoreItem">
                <span className="scoreValue">{listing.transitScore}</span>
                <span className="scoreLabel">Transit</span>
              </div>
              <div className="scoreItem">
                <span className="scoreValue">{listing.bikeScore}</span>
                <span className="scoreLabel">Bike</span>
              </div>
            </div>
          </div>

          <div className="neighborhoodGrid">
            {listing.neighborhoodCards.map((card, index) => (
              <article key={card.title} className={`neighborhoodCard reveal delay-${Math.min(index % 3, 2) + 1}`}>
                <h3 className="cardTitle">{card.title}</h3>
                <p className="cardText">{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="inquire" className="inquirySection">
        <div className="agentPanel reveal">
          <div className="agentGrid">
            <article className="agentMiniCard">
              <div className="agentPortrait">
                <Image src={photoPaths.david} alt="David Heine of Obsidian Denver." fill sizes="80px" className="portraitImage" />
              </div>
              <p className="agentRole">Co-Founder & Listing Agent · Obsidian Denver</p>
              <h2 className="agentName">David Heine</h2>
              <p className="agentFirm">KW Urban Elite</p>

              <div className="agentLinks">
                <a href="tel:3039007702" className="agentLink">
                  <span>Phone</span>
                  <strong>303-900-7702</strong>
                </a>
                <a href="mailto:hello@obsidiandenver.com" className="agentLink">
                  <span>Email</span>
                  <strong>hello@obsidiandenver.com</strong>
                </a>
              </div>
            </article>

            <article className="agentMiniCard">
              <div className="agentPortrait">
                <Image src={photoPaths.daxon} alt="Daxon McInnis of Obsidian Denver." fill sizes="80px" className="portraitImage" />
              </div>
              <p className="agentRole">Co-Founder & Listing Agent · Obsidian Denver</p>
              <h2 className="agentName">Daxon McInnis</h2>
              <p className="agentFirm">KW Urban Elite</p>

              <div className="agentLinks">
                <a href="tel:7208108887" className="agentLink">
                  <span>Phone</span>
                  <strong>720-810-8887</strong>
                </a>
                <a href="mailto:Dax@Daxonre.com" className="agentLink">
                  <span>Email</span>
                  <strong>Dax@Daxonre.com</strong>
                </a>
              </div>
            </article>
          </div>

          <div className="agentStatement">
            <p>
              Obsidian Denver represents architectural homes with a neighborhood-first approach, combining design fluency with real local context across Sloan&apos;s Lake, Highlands, LoHi, and the west side of the city.
            </p>
          </div>
        </div>

        <div className="formPanel reveal delay-1">
          <h2 className="formTitle">Request a Private Showing</h2>
          <p className="formSub">We&apos;ll be in touch within 2 hours</p>

          {inquiryStatus === 'success' ? (
            <div className="successState">
              <p className="successTitle">Request received.</p>
              <p className="bodyText">An Obsidian Denver team member will follow up shortly to coordinate your showing.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="inquiryForm">
              <input type="hidden" name="utm_source" value={utmParams.utm_source} />
              <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
              <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
              <input type="hidden" name="utm_term" value={utmParams.utm_term} />
              <input type="hidden" name="utm_content" value={utmParams.utm_content} />
              <input type="hidden" name="gclid" value={utmParams.gclid} />
              <input type="hidden" name="fbclid" value={utmParams.fbclid} />
              <input type="hidden" name="listingAddress" value={listing.address} />
              <input type="hidden" name="listingPrice" value={listing.price} />
              <div className="fieldGrid">
                <label className="field">
                  <span>First Name</span>
                  <input type="text" name="firstName" required />
                </label>
                <label className="field">
                  <span>Last Name</span>
                  <input type="text" name="lastName" required />
                </label>
                <label className="field fieldFull">
                  <span>Email</span>
                  <input type="email" name="email" required />
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input type="tel" name="phone" required />
                </label>
                <label className="field">
                  <span>Preferred Date</span>
                  <select name="preferredDate" defaultValue="This Week">
                    <option>This Week</option>
                    <option>Next Week</option>
                    <option>Within 30 Days</option>
                    <option>Flexible</option>
                  </select>
                </label>
                <label className="field fieldFull">
                  <span>Message</span>
                  <textarea name="message" rows={5} placeholder="Tell us when you'd like to tour, whether you're represented, or any specific questions about the property." />
                </label>
              </div>

              <button type="submit" className="submitButton" disabled={inquiryStatus === 'submitting'}>
                {inquiryStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
              </button>
              {inquiryStatus === 'error' ? (
                <p className="formError">There was an issue sending your request. Please try again.</p>
              ) : null}
              <p className="privacyNote">By submitting, you agree to be contacted by Obsidian Denver regarding this listing. Your information is never sold.</p>
            </form>
          )}
        </div>
      </section>

      {activePhoto ? (
        <div
          className="lightboxOverlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Property image gallery"
        >
          <div ref={lightboxDialogRef} className="lightboxShell" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightboxClose" onClick={() => setLightboxIndex(null)}>
              Close
            </button>
            <button type="button" className="lightboxPrev" onClick={handlePrev} aria-label="Previous image">
              ‹
            </button>
            <div className="lightboxStage">
              <div className="lightboxImageWrap">
                <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width: 960px) 100vw, 1100px" className="lightboxImage" />
              </div>
              <div className="lightboxMeta">
                <span>{activePhoto.label}</span>
                <span>
                  {activeCounter} / {allPhotos.length}
                </span>
              </div>
            </div>
            <button type="button" className="lightboxNext" onClick={handleNext} aria-label="Next image">
              ›
            </button>
          </div>
        </div>
      ) : null}

      {quickInfoOpen ? (
        <div className="quickLeadOverlay" onClick={closeQuickInfo} role="dialog" aria-modal="true" aria-label="Get more info form">
          <div id="quick-info-form" className="quickLeadModal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="quickLeadClose" onClick={closeQuickInfo}>
              Close
            </button>
            {quickLeadStatus === 'success' ? (
              <div className="quickLeadSuccess">
                <p className="quickLeadTitle">Info request received.</p>
                <p className="quickLeadCopy">We&apos;ll follow up shortly with property details and next steps.</p>
              </div>
            ) : (
              <>
                <div className="quickLeadHeader">
                  <p className="quickLeadEyebrow">Quick Lead Capture</p>
                  <h2 className="quickLeadTitle">Get pricing details, disclosures, and showing info.</h2>
                  <p className="quickLeadCopy">Leave your name and best email. Add a phone number if you want a faster callback.</p>
                </div>

                <form
                  className="quickLeadForm"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void submitLeadForm(event.currentTarget, 'quick_info');
                  }}
                >
                  <input type="hidden" name="utm_source" value={utmParams.utm_source} />
                  <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
                  <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
                  <input type="hidden" name="utm_term" value={utmParams.utm_term} />
                  <input type="hidden" name="utm_content" value={utmParams.utm_content} />
                  <input type="hidden" name="gclid" value={utmParams.gclid} />
                  <input type="hidden" name="fbclid" value={utmParams.fbclid} />
                  <div className="quickLeadGrid">
                    <label className="quickLeadField">
                      <span>Name</span>
                      <input type="text" name="name" placeholder="Your name" required />
                    </label>
                    <label className="quickLeadField">
                      <span>Email</span>
                      <input type="email" name="email" placeholder="you@example.com" required />
                    </label>
                    <label className="quickLeadField quickLeadFieldWide">
                      <span>Phone</span>
                      <input type="tel" name="phone" placeholder="Optional for a faster callback" />
                    </label>
                  </div>

                  <button type="submit" className="quickLeadButton" disabled={quickLeadStatus === 'submitting'}>
                    {quickLeadStatus === 'submitting' ? 'Sending...' : 'Send Me the Details'}
                  </button>
                  {quickLeadStatus === 'error' ? (
                    <p className="quickLeadError">There was an issue sending your request. Please try again.</p>
                  ) : null}
                  <p className="quickLeadNote">Your information stays private and is only used to respond about this listing.</p>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}

      <SiteFooter />

      <style jsx global>{`
        .propertyPage {
          --cream: #f8f7f4;
          --ink: #1a1a1a;
          --warm: #8a7255;
          --warm-lt: #b09a7e;
          --warm-dim: rgba(138, 114, 85, 0.12);
          --border: rgba(26, 26, 26, 0.1);
          --border-w: rgba(138, 114, 85, 0.25);
          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-body), sans-serif;
        }

        .propertyPage * {
          box-sizing: border-box;
        }

        .propertyPage a {
          color: inherit;
          text-decoration: none;
        }

        .propertyPage button,
        .propertyPage input,
        .propertyPage textarea,
        .propertyPage select {
          font: inherit;
        }

        .propertyPage img {
          display: block;
        }

        .container {
          width: min(1200px, calc(100% - 8rem));
          margin: 0 auto;
        }

        .heroTopBar {
          position: absolute;
          top: 1.6rem;
          left: 50%;
          z-index: 3;
          width: min(1200px, calc(100% - 8rem));
          transform: translateX(-50%);
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--cream);
        }

        .brandMark {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display), serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: rgba(248, 247, 244, 0.96);
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.4);
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .navLinks {
          display: flex;
          gap: 1.3rem;
          font-family: var(--font-ui), sans-serif;
          font-size: 0.84rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(248, 247, 244, 0.96);
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.4);
        }

        .heroTopCta,
        .buttonPrimary,
        .buttonGhost,
        .submitButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 1.35rem;
          border-radius: 999px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }

        .heroTopCta {
          color: rgba(248, 247, 244, 0.98) !important;
          font-family: var(--font-ui), sans-serif;
          font-size: 0.84rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.4);
        }

        .heroSection {
          position: relative;
          min-height: max(100vh, 680px);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .heroMedia,
        .heroOverlay {
          position: absolute;
          inset: 0;
        }

        .heroImage {
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
          opacity: 0.9;
          transition: transform 1.1s ease, opacity 1.1s ease;
        }

        .hero-loaded .heroImage {
          transform: scale(1);
          opacity: 1;
        }

        .heroOverlay {
          background: linear-gradient(to top, rgba(26, 26, 26, 0.72) 0%, rgba(26, 26, 26, 0.15) 48%, rgba(26, 26, 26, 0.08) 100%);
        }

        .heroContent {
          position: relative;
          z-index: 2;
          width: min(1200px, calc(100% - 8rem));
          margin: 0 auto;
          padding: 0 0 4.5rem;
          color: var(--cream);
        }

        .heroEyebrow,
        .sectionLabel,
        .statLabel,
        .heroMetaLabel,
        .specLabel,
        .loftMiniLabel,
        .agentRole,
        .agentLink span,
        .scoreLabel {
          font-family: var(--font-ui), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .heroEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1rem;
          color: rgba(248, 247, 244, 0.88);
          text-shadow: 0 6px 24px rgba(0, 0, 0, 0.48);
        }

        .heroEyebrowLine {
          width: 42px;
          height: 1px;
          background: var(--warm);
        }

        .heroTitle {
          display: flex;
          flex-direction: column;
          gap: 0.1em;
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(3.6rem, 7vw, 6.2rem);
          line-height: 0.94;
          font-weight: 300;
          color: rgba(248, 247, 244, 0.96);
          text-shadow: 0 12px 34px rgba(0, 0, 0, 0.52);
        }

        .heroTitleAccent {
          color: #f3ede2;
        }

        .heroMetaBar {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 1rem;
          max-width: 960px;
          margin-top: 2rem;
          padding: 1.15rem 1.2rem;
          border-top: 1px solid rgba(248, 247, 244, 0.34);
          border-bottom: 1px solid rgba(248, 247, 244, 0.34);
          background: linear-gradient(to bottom, rgba(26, 26, 26, 0.16), rgba(26, 26, 26, 0.08));
          backdrop-filter: blur(6px);
        }

        .heroMetaItem {
          display: grid;
          gap: 0.45rem;
        }

        .heroMetaLabel {
          color: rgba(248, 247, 244, 0.9);
          text-shadow: 0 7px 22px rgba(0, 0, 0, 0.58);
        }

        .heroMetaValue {
          font-family: var(--font-display), serif;
          font-size: clamp(1.55rem, 2.3vw, 2.05rem);
          font-weight: 300;
          color: rgba(248, 247, 244, 0.98);
          text-shadow: 0 10px 28px rgba(0, 0, 0, 0.62);
          line-height: 1;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }

        .quickLeadOverlay {
          position: fixed;
          inset: 0;
          z-index: 110;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(10, 10, 10, 0.76);
          backdrop-filter: blur(6px);
        }

        .quickLeadModal {
          position: relative;
          width: min(580px, 100%);
          max-height: min(90vh, 760px);
          overflow: auto;
          padding: 1.35rem;
          border: 1px solid rgba(248, 247, 244, 0.18);
          background: rgba(15, 15, 15, 0.38);
          backdrop-filter: blur(14px);
        }

        .quickLeadClose {
          position: absolute;
          top: 1rem;
          right: 1rem;
          min-height: 38px;
          padding: 0 0.9rem;
          border: 1px solid rgba(248, 247, 244, 0.18);
          border-radius: 999px;
          background: rgba(248, 247, 244, 0.08);
          color: var(--cream);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .quickLeadHeader {
          max-width: 42rem;
          padding-right: 4.5rem;
        }

        .quickLeadEyebrow,
        .quickLeadField span {
          margin: 0;
          color: rgba(248, 247, 244, 0.74);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .quickLeadTitle {
          margin: 0.6rem 0 0;
          color: var(--cream);
          font-family: var(--font-display), serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 300;
          line-height: 1;
        }

        .quickLeadCopy,
        .quickLeadNote,
        .quickLeadError {
          margin: 0.75rem 0 0;
          color: rgba(248, 247, 244, 0.78);
          font-size: 0.96rem;
          line-height: 1.7;
        }

        .quickLeadForm {
          margin-top: 1.1rem;
        }

        .quickLeadGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
        }

        .quickLeadField {
          display: grid;
          gap: 0.5rem;
        }

        .quickLeadFieldWide {
          grid-column: 1 / -1;
        }

        .quickLeadField input {
          width: 100%;
          min-height: 48px;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(248, 247, 244, 0.16);
          background: rgba(248, 247, 244, 0.08);
          color: var(--cream);
          outline: none;
        }

        .quickLeadField input::placeholder {
          color: rgba(248, 247, 244, 0.42);
        }

        .quickLeadButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          margin-top: 0.95rem;
          padding: 0 1.35rem;
          border: 0;
          border-radius: 999px;
          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .quickLeadButton:disabled,
        .submitButton:disabled {
          cursor: wait;
          opacity: 0.8;
        }

        .quickLeadSuccess {
          max-width: 32rem;
        }

        .buttonPrimary {
          background: var(--cream);
          color: var(--ink);
        }

        .buttonGhost {
          background: transparent;
          color: var(--cream);
          border-color: rgba(248, 247, 244, 0.4);
        }

        .buttonPrimary:hover,
        .buttonGhost:hover,
        .heroTopCta:hover,
        .submitButton:hover {
          transform: translateY(-1px);
        }

        .heroFade {
          opacity: 0;
          animation: fadeInUp 0.9s ease forwards;
        }

        .heroDelay1 {
          animation-delay: 0.2s;
        }

        .heroDelay2 {
          animation-delay: 0.4s;
        }

        .heroDelay3 {
          animation-delay: 0.6s;
        }

        .heroDelay4 {
          animation-delay: 0.8s;
        }

        .photoStrip {
          background: var(--cream);
          padding: 0 0 0.25rem;
        }

        .photoStripGrid {
          position: relative;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 340px 220px;
          gap: 3px;
          background: #e8e5e0;
        }

        .photoCell {
          position: relative;
          border: 0;
          padding: 0;
          background: transparent;
          overflow: hidden;
          cursor: pointer;
        }

        .photoCellMain {
          grid-row: span 2;
        }

        .cellImage,
        .featureImage,
        .galleryThumbImage {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .cellOverlay,
        .galleryThumbOverlay {
          position: absolute;
          inset: auto 0 0;
          padding: 2rem 1rem 1rem;
          background: linear-gradient(to top, rgba(26, 26, 26, 0.62), rgba(26, 26, 26, 0));
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .cellLabel,
        .galleryThumbLabel {
          color: var(--cream);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .photoCell:hover .cellImage,
        .galleryThumb:hover .galleryThumbImage {
          transform: scale(1.04);
        }

        .photoCell:hover .cellOverlay,
        .galleryThumb:hover .galleryThumbOverlay {
          opacity: 1;
        }

        .photoStripCtaWrap {
          position: absolute;
          left: 50%;
          bottom: 1.25rem;
          transform: translateX(-50%);
          z-index: 2;
        }

        .photoStripCta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 1rem;
          border-radius: 999px;
          border: 0;
          background: rgba(248, 247, 244, 0.95);
          color: var(--ink);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .statStrip {
          background: var(--ink);
        }

        .statStripInner {
          display: flex;
          flex-wrap: wrap;
        }

        .statStripItem {
          flex: 1 1 16.666%;
          min-width: 220px;
          padding: 1.65rem 1.5rem;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .statStripItem:last-child {
          border-right: 0;
        }

        .statPrimary {
          color: var(--cream);
          font-family: var(--font-display), serif;
          font-size: 2.4rem;
          font-weight: 300;
          line-height: 1.05;
        }

        .statLabel {
          margin-top: 0.35rem;
          color: rgba(248, 247, 244, 0.7);
        }

        .statSub {
          margin-top: 0.5rem;
          color: var(--warm-lt);
          font-size: 0.88rem;
        }

        .detailsSection,
        .neighborhoodSection {
          padding: 5rem 0;
          background: var(--cream);
        }

        .detailsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
        }

        .detailsExpandable {
          position: relative;
          max-height: 920px;
          overflow: hidden;
        }

        .detailsExpandable.isExpanded {
          max-height: none;
        }

        .detailsFade {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 140px;
          background: linear-gradient(to bottom, rgba(248, 247, 244, 0), rgba(248, 247, 244, 0.94) 55%, rgba(248, 247, 244, 1));
          pointer-events: none;
        }

        .sectionLabel {
          margin: 0 0 0.9rem;
          color: var(--warm);
        }

        .sectionTitle,
        .formTitle,
        .agentName {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: clamp(2.5rem, 4vw, 4.1rem);
          font-weight: 300;
          line-height: 0.96;
        }

        .sectionTitle span,
        .formTitle span {
          display: block;
        }

        .sectionTitle.singleLine {
          line-height: 1;
        }

        .bodyText,
        .specValue,
        .cardText,
        .formSub,
        .privacyNote,
        .agentFirm,
        .agentStatement p {
          margin: 1rem 0 0;
          color: rgba(26, 26, 26, 0.65);
          font-family: var(--font-body), sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.85;
        }

        .featureList {
          margin-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .readMoreButton {
          display: block;
          width: 100%;
          margin-top: -0.35rem;
          padding: 0.55rem 0 0;
          border: 0;
          border-top: 1px solid var(--border);
          background: transparent;
          color: var(--warm);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          text-align: center;
        }

        .featureItem,
        .specRow {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.9rem;
          align-items: start;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }

        .featureDot {
          width: 8px;
          height: 8px;
          margin-top: 0.65rem;
          border-radius: 999px;
          background: var(--warm);
        }

        .specTable {
          border-top: 1px solid var(--border);
        }

        .specRow {
          grid-template-columns: minmax(120px, 180px) 1fr;
          gap: 1rem;
        }

        .specLabel {
          color: rgba(26, 26, 26, 0.55);
        }

        .specValue {
          margin: 0;
          color: rgba(26, 26, 26, 0.82);
          line-height: 1.6;
        }

        .loftCallout {
          margin-top: 2rem;
          padding: 2rem;
          border-left: 3px solid var(--warm);
          background: var(--warm-dim);
        }

        .loftCalloutTitle {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: 2rem;
          font-weight: 300;
        }

        .gallerySection {
          padding: 5rem 0;
          background: #f0ede7;
        }

        .galleryHeader {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .galleryControls {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .galleryArrow {
          width: 46px;
          height: 46px;
          border: 1px solid rgba(26, 26, 26, 0.14);
          border-radius: 999px;
          background: rgba(248, 247, 244, 0.9);
          color: var(--ink);
          font-size: 1.6rem;
          line-height: 1;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .galleryArrow:hover {
          transform: translateY(-1px);
          background: #f8f7f4;
          border-color: rgba(26, 26, 26, 0.28);
        }

        .galleryScroller {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.4rem;
          scrollbar-width: none;
        }

        .galleryScroller::-webkit-scrollbar {
          display: none;
        }

        .galleryThumb {
          flex: 0 0 340px;
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
        }

        .galleryThumbInner {
          position: relative;
          display: block;
          width: 340px;
          height: 240px;
          overflow: hidden;
        }

        .loftFeatureSection {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .loftFeatureMedia {
          position: relative;
          min-height: 420px;
        }

        .loftFeatureContent {
          padding: 5rem 4rem;
          background: #f0ede7;
        }

        .loftMiniStats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .loftMiniStat {
          display: grid;
          gap: 0.4rem;
        }

        .loftMiniLabel {
          color: rgba(26, 26, 26, 0.5);
        }

        .loftMiniValue {
          font-family: var(--font-display), serif;
          font-size: 1.4rem;
          font-weight: 300;
        }

        .neighborhoodHeader {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: start;
          margin-bottom: 2rem;
        }

        .scoreRow {
          display: flex;
          justify-content: flex-end;
          gap: 2rem;
        }

        .scoreItem {
          text-align: center;
        }

        .scoreValue {
          display: block;
          color: var(--warm);
          font-family: var(--font-display), serif;
          font-size: 3rem;
          font-weight: 300;
          line-height: 1;
        }

        .scoreLabel {
          display: block;
          margin-top: 0.5rem;
          color: rgba(26, 26, 26, 0.6);
        }

        .neighborhoodGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }

        .neighborhoodCard {
          padding: 1.6rem;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transition: background 0.25s ease;
        }

        .neighborhoodCard:hover {
          background: var(--warm-dim);
        }

        .cardTitle {
          margin: 0;
          font-family: var(--font-display), serif;
          font-size: 1.6rem;
          font-weight: 300;
        }

        .cardText {
          margin-top: 0.5rem;
        }

        .inquirySection {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--ink);
        }

        .agentPanel,
        .formPanel {
          padding: 5rem 4rem;
        }

        .agentPanel {
          color: var(--cream);
        }

        .agentGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .agentMiniCard {
          padding: 1.35rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
        }

        .formPanel {
          background: rgba(255, 255, 255, 0.03);
          color: var(--cream);
        }

        .agentPortrait {
          position: relative;
          width: 80px;
          height: 100px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
        }

        .portraitImage {
          object-fit: cover;
        }

        .agentRole,
        .agentLink span {
          color: var(--warm-lt);
        }

        .agentRole {
          margin: 1.4rem 0 0;
        }

        .agentName {
          margin-top: 0.55rem;
          color: var(--cream);
          font-size: 2.2rem;
        }

        .agentFirm {
          margin-top: 0.35rem;
          color: rgba(248, 247, 244, 0.58);
        }

        .agentLinks {
          display: grid;
          gap: 0.9rem;
          margin-top: 1.4rem;
        }

        .agentLink {
          display: grid;
          gap: 0.25rem;
        }

        .agentLink strong {
          color: rgba(248, 247, 244, 0.84);
          font-weight: 400;
          transition: color 0.2s ease;
        }

        .agentLink:hover strong {
          color: var(--cream);
        }

        .agentStatement {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .agentStatement p,
        .formSub,
        .privacyNote {
          color: rgba(248, 247, 244, 0.62);
        }

        .formError {
          margin: 0.85rem 0 0;
          color: #f1c6c6;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .formTitle {
          color: var(--cream);
          font-size: 3.2rem;
        }

        .inquiryForm {
          margin-top: 2rem;
        }

        .fieldGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .field {
          display: grid;
          gap: 0.55rem;
        }

        .fieldFull {
          grid-column: 1 / -1;
        }

        .field span {
          color: rgba(248, 247, 244, 0.7);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
          color: var(--cream);
          padding: 0.95rem 1rem;
          outline: none;
        }

        .field textarea {
          resize: vertical;
        }

        .submitButton {
          width: 100%;
          margin-top: 1rem;
          background: var(--warm);
          color: var(--cream);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .submitButton:hover {
          background: var(--warm-lt);
        }

        .successState {
          margin-top: 2rem;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
        }

        .successTitle {
          margin: 0;
          color: var(--cream);
          font-family: var(--font-display), serif;
          font-size: 2rem;
          font-weight: 300;
        }

        .lightboxOverlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(6px);
        }

        .lightboxShell {
          position: relative;
          width: min(1100px, 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightboxStage {
          width: 100%;
        }

        .lightboxImageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
        }

        .lightboxImage {
          object-fit: contain;
        }

        .lightboxClose,
        .lightboxPrev,
        .lightboxNext {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(248, 247, 244, 0.08);
          color: var(--cream);
          cursor: pointer;
        }

        .lightboxClose {
          top: -3.5rem;
          right: 0;
          min-height: 42px;
          padding: 0 1rem;
          border-radius: 999px;
          font-family: var(--font-ui), sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .lightboxPrev,
        .lightboxNext {
          top: 50%;
          width: 52px;
          height: 52px;
          margin-top: -26px;
          border-radius: 999px;
          font-size: 2rem;
          line-height: 1;
        }

        .lightboxPrev {
          left: -4.25rem;
        }

        .lightboxNext {
          right: -4.25rem;
        }

        .lightboxMeta {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          color: rgba(248, 247, 244, 0.82);
          font-family: var(--font-ui), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .reveal.in-view {
          opacity: 1;
          transform: none;
        }

        .delay-1 {
          transition-delay: 0.1s;
        }

        .delay-2 {
          transition-delay: 0.2s;
        }

        .delay-3 {
          transition-delay: 0.3s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 960px) {
          .container,
          .heroContent,
          .heroTopBar {
            width: min(100%, calc(100% - 3rem));
          }

          .heroTopBar {
            top: 0.9rem;
            min-height: 40px;
          }

          .navLinks {
            display: none;
          }

          .heroContent {
            padding-bottom: 2.6rem;
          }

          .heroTitle {
            font-size: clamp(2.8rem, 10vw, 4.4rem);
          }

          .heroMetaBar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.85rem;
            padding: 1rem;
          }

          .heroActions {
            width: 100%;
            gap: 0.85rem;
          }

          .buttonPrimary,
          .buttonGhost {
            flex: 1 1 calc(50% - 0.5rem);
            min-width: 0;
          }

          .quickLeadModal {
            width: 100%;
          }

          .photoStripGrid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 280px 160px 160px;
          }

          .photoCellMain {
            grid-column: 1 / -1;
            grid-row: auto;
          }

          .photoStripCtaWrap {
            bottom: 0.8rem;
          }

          .photoStripCta {
            min-height: 40px;
            padding: 0 0.9rem;
          }

          .statStripItem {
            flex: 1 1 50%;
            min-width: 0;
            padding: 1.25rem 1rem;
          }

          .detailsSection,
          .gallerySection,
          .neighborhoodSection {
            padding: 3.5rem 0;
          }

          .galleryHeader {
            align-items: center;
          }

          .detailsGrid,
          .loftFeatureSection,
          .inquirySection,
          .neighborhoodHeader {
            grid-template-columns: 1fr;
          }

          .agentGrid {
            grid-template-columns: 1fr;
          }

          .loftFeatureContent,
          .agentPanel,
          .formPanel {
            padding: 3.5rem 1.5rem;
          }

          .detailsExpandable {
            max-height: 760px;
          }

          .scoreRow {
            justify-content: flex-start;
            gap: 1.2rem;
          }

          .neighborhoodGrid {
            grid-template-columns: 1fr 1fr;
          }

          .fieldGrid {
            grid-template-columns: 1fr;
          }

          .fieldFull {
            grid-column: auto;
          }

          .quickLeadGrid {
            grid-template-columns: 1fr;
          }

          .quickLeadFieldWide {
            grid-column: auto;
          }

          .lightboxOverlay {
            padding: 1rem;
          }

          .lightboxShell {
            width: 100%;
          }

          .lightboxPrev,
          .lightboxNext {
            top: auto;
            bottom: 4.5rem;
            margin-top: 0;
          }

          .lightboxPrev {
            left: 1rem;
          }

          .lightboxNext {
            right: 1rem;
          }

          .lightboxClose {
            top: -3.1rem;
          }
        }

        @media (max-width: 640px) {
          .heroSection {
            min-height: 88svh;
          }

          .heroTopBar {
            top: 0.85rem;
            width: min(100%, calc(100% - 2.5rem));
          }

          .heroTopCta {
            min-height: 40px;
            padding: 0 0.9rem;
            font-size: 0.68rem;
          }

          .heroContent {
            width: min(100%, calc(100% - 2.5rem));
            padding-bottom: 2.2rem;
          }

          .heroMetaBar {
            grid-template-columns: 1fr;
            gap: 0.7rem;
            margin-top: 1.5rem;
          }

          .heroMetaItem {
            gap: 0.28rem;
          }

          .heroActions {
            flex-direction: column;
          }

          .buttonPrimary,
          .buttonGhost {
            width: 100%;
          }

          .quickLeadModal {
            padding: 1.15rem;
          }

          .quickLeadClose {
            top: 0.85rem;
            right: 0.85rem;
          }

          .galleryThumb {
            flex-basis: 82vw;
          }

          .galleryThumbInner {
            width: 82vw;
            height: 58vw;
          }

          .galleryHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          .galleryControls {
            gap: 0.55rem;
          }

          .galleryArrow {
            width: 42px;
            height: 42px;
            font-size: 1.45rem;
          }

          .photoStripCtaWrap {
            width: calc(100% - 1.5rem);
            max-width: 320px;
          }

          .photoStripCta {
            width: 100%;
          }

          .neighborhoodGrid {
            grid-template-columns: 1fr 1fr;
          }

          .brandMark {
            font-size: 1.55rem;
          }

          .detailsExpandable {
            max-height: 640px;
          }
        }
      `}</style>
    </div>
  );
}
