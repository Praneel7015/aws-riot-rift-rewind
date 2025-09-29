import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const name = 'Praneel_7015';
const avatarSrc = 'https://shared.fastly.steamstatic.com/community_assets/images/items/2021850/d5bc9154dbf8eefdf959781f5a6b733750a293f0.gif';
export const siteTitle = "Praneel's";

export default function Layout({ children, home, showBackLink = true, compactHeader = false }) {
  const avatarRef = useRef(null);

  useEffect(() => {
    if (!home || !avatarRef.current) return;

    const avatar = avatarRef.current;

    const handleMouseMove = (e) => {
      const rect = avatar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      const rotateX = deltaY * 10;
      const rotateY = deltaX * -10;
      
      avatar.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px) scale(1.03)`;
    };

    const handleMouseLeave = () => {
      avatar.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    avatar.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      avatar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [home]);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href={avatarSrc} />
        <link rel="shortcut icon" href={avatarSrc} />
        <link rel="apple-touch-icon" href={avatarSrc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="My personal blog website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {compactHeader ? null : home ? (
          <>
            <div ref={avatarRef} className={styles.avatarWrap}>
              <Image
                priority
                src={avatarSrc}
                className={utilStyles.squareAvatar}
                height={220}
                width={220}
                alt={name}
                unoptimized
              />
            </div>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <div className={styles.avatarWrap}>
                <Image
                  priority
                  src={avatarSrc}
                  className={utilStyles.squareAvatar}
                  height={160}
                  width={160}
                  alt={name}
                  unoptimized
                />
              </div>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && showBackLink && (
        <div className={styles.backToHome}>
          <Link
            href="/"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--text)'
            }}
          >
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
