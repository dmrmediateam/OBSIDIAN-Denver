'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getScrollY = () =>
      document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
    const onScroll = () => setVisible(getScrollY() > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`site-header${visible ? ' site-header--visible' : ''}`}>
      <Link href="/" className="site-header-logo-link">
        <Image
          src="/new/obsidian denver.png"
          alt="Obsidian Denver"
          width={260}
          height={72}
          style={{ width: 'auto', height: '72px', objectFit: 'contain' }}
          priority
        />
      </Link>
    </header>
  );
}
