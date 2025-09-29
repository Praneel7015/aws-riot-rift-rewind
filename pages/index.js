import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import ParticleField from '../components/ParticleField';
import VisualEffectsOverlay from '../components/VisualEffectsOverlay';
import utilStyles from '../styles/utils.module.css';
import modulesStyles from '../styles/modules.module.css';
import hobbyStyles from '../styles/hobby.module.css';
import effectsStyles from '../styles/effects.module.css';

const FEATURED_GAMES = [
  { title: 'Hollow Knight', appId: '367520' },
  { title: 'Hollow Knight: Silksong', appId: '1030300' },
  { title: 'Cuphead', appId: '268910' },
  { title: 'Batman: Arkham Asylum', appId: '35140' },
  { title: 'Batman: Arkham City', appId: '200260' },
  { title: 'Batman: Arkham Knight', appId: '208650', mature: true },
  { title: 'Vampire Survivors', appId: '1794680' },
  { title: 'Undertale', appId: '391540' },
  { title: 'DELTARUNE', appId: '1671210' },
  { title: 'ULTRAKILL', appId: '1229490' },
  { title: 'Portal 2', appId: '620' },
  { title: 'Half-Life 2', appId: '220' },
];

export default function Home() {
  return (
    <>
      <VisualEffectsOverlay />
      <ParticleField opacity={0.9} />

      <Layout home>
        <Head>
          <title>{`${siteTitle} - Gaming Hub`}</title>
          <meta
            name="description"
            content="Welcome to Praneel's gaming world. Explore my favorite games, hobbies, and connect with me across platforms."
          />
        </Head>

        {/* Hero Introduction */}
        <section
          className={`${utilStyles.headingMd} ${effectsStyles.cyberBorder}`}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--muted-text)' }}>
            Passionate gamer and computer science student. Explore my gaming library and connect with me across platforms.
          </p>
        </section>

        {/* Quick Navigation */}
        <section className={utilStyles.headingMd} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
            }}
          >
            <Link href="/about" className={`${hobbyStyles.navigationButton} ${effectsStyles.particleTrail}`}>
              About Me
            </Link>
            <Link
              href="https://www.praneel.tech"
              target="_blank"
              rel="noreferrer noopener"
              className={`${hobbyStyles.navigationButton} ${effectsStyles.particleTrail}`}
            >
              Main Site
            </Link>
          </div>

          {/* Social Links */}
          <div style={{ color: 'var(--muted-text)' }}>
            <Link
              href="https://steamcommunity.com/profiles/76561199089082124/"
              target="_blank"
              rel="noreferrer noopener"
              className={effectsStyles.neonGlow}
            >
              Steam
            </Link>{' '}
            •{' '}
            <Link
              href="https://store.epicgames.com/u/Praneel_7015"
              target="_blank"
              rel="noreferrer noopener"
              className={effectsStyles.neonGlow}
            >
              Epic Games
            </Link>{' '}
            •{' '}
            <Link
              href="https://www.twitch.tv/praneel_7015"
              target="_blank"
              rel="noreferrer noopener"
              className={effectsStyles.neonGlow}
            >
              Twitch
            </Link>
          </div>
        </section>

        {/* Gaming Library */}
        <section
          className={`${modulesStyles.section} ${effectsStyles.cyberGrid}`}
          style={{ padding: '2rem', borderRadius: '12px' }}
        >
          <h2
            className={`${utilStyles.headingLg} ${effectsStyles.glitchText}`}
            style={{ marginBottom: '1rem', textAlign: 'center' }}
            data-text="Gaming Library"
          >
            Gaming Library
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--muted-text)',
              marginBottom: '2rem',
              fontSize: '0.95rem',
            }}
          >
            A curated collection of my favorite games across different genres
          </p>
          <div className={`${modulesStyles.grid} ${effectsStyles.hologram}`}>
            {FEATURED_GAMES.map((game) => (
              <a
                key={game.appId}
                className={modulesStyles.card}
                href={`https://store.steampowered.com/app/${game.appId}/`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className={modulesStyles.coverWrap}>
                  <Image
                    src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appId}/header.jpg`}
                    alt={game.title}
                    fill
                    className={modulesStyles.cover}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className={modulesStyles.meta}>
                  <span className={modulesStyles.title}>{game.title}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
