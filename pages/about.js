import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import ParticleField from '../components/ParticleField';
import VisualEffectsOverlay from '../components/VisualEffectsOverlay';
import utilStyles from '../styles/utils.module.css';
import hobbyStyles from '../styles/hobby.module.css';

export default function AboutPage() {
  return (
    <>
      <VisualEffectsOverlay />
      <ParticleField opacity={0.6} />

      <Layout showBackLink={false}>
        <Head>
          <title>{`${siteTitle} About Me`}</title>
          <meta
            name="description"
            content="Learn more me! A passionate gamer, computer science student, and fitness freak."
          />
        </Head>

        <div style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
          <Link href="/" className={hobbyStyles.navigationButton}>
            Back to Gaming Hub
          </Link>
        </div>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h1 className={utilStyles.headingLg} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            About Me
          </h1>

          {/* Hero Section */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: 'hsl(var(--accent-hsl))', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Developer & Gamer
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--muted-text)' }}>
              Hi, I'm <strong style={{ color: 'hsl(var(--accent-hsl))' }}>Praneel</strong> ! a computer science student
              passionate about technology, gaming, and building meaningful projects that make a difference.
            </p>
          </div>

          {/* Main Content */}
          <div style={{ display: 'grid', gap: '2rem', marginBottom: '2rem' }}>
            {/* Academic & Professional */}
            <div className={hobbyStyles.sectionCard}>
              <h3 style={{ color: 'hsl(var(--accent-hsl))', marginBottom: '1rem' }}>
                Academic Journey
              </h3>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                I'm a <strong>Computer Science and Engineering student</strong> in my third year, with a deep passion for
                free and open-source technology. My academic focus spans across <strong>IoT and electronics</strong>,
                <strong>programming for FOSS projects</strong>, and <strong>Cybersecurity</strong>.
              </p>
              <p style={{ lineHeight: '1.6' }}>
                Currently leading my college's <strong>FOSS club, Mukti!</strong> where we organize events and seminars
                around open-source technology. What drives me is building projects that people actually use and that
                make a positive impact on the community.
              </p>
            </div>

            {/* Gaming Passion */}
            <div className={hobbyStyles.sectionCard}>
              <h3 style={{ color: 'hsl(var(--accent-hsl))', marginBottom: '1rem' }}>
                Gaming Passion
              </h3>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                Gaming isn't just a hobby for me, it's a <strong>passion that shapes how I think and live</strong>.
                I love exploring virtual worlds, from indie masterpieces like Hollow Knight to story-driven adventures like Portal.
              </p>
              <p style={{ lineHeight: '1.6' }}>
                Whether I'm speedrunning platformers, strategizing in Deck-Builders, or getting lost in RPG worlds,
                gaming teaches me creativity, persistence, and strategic thinking that I apply to my programming
                projects.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2rem',
            }}
          >
            <Link href="https://www.praneel.tech/contact" target="_blank" className={hobbyStyles.navigationButton}>
              Get In Touch
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}