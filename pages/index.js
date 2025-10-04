import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import ParticleField from '../components/ParticleField';
import VisualEffectsOverlay from '../components/VisualEffectsOverlay';
import utilStyles from '../styles/utils.module.css';
import modulesStyles from '../styles/modules.module.css';
import hobbyStyles from '../styles/hobby.module.css';
import effectsStyles from '../styles/effects.module.css';
import leagueStyles from '../styles/league.module.css';

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
  const [summonerName, setSummonerName] = useState('');
  const [region, setRegion] = useState('na1');
  const [message, setMessage] = useState(null);
  const [results, setResults] = useState(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const messageTimeoutRef = useRef(null);
  const riotFunctionUrl = process.env.NEXT_PUBLIC_RIOT_FUNCTION_URL;

  const showMessage = (text, type = null) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }

    if (!text) {
      setMessage(null);
      return;
    }

    setMessage({ text, type });
    messageTimeoutRef.current = setTimeout(() => {
      setMessage(null);
      messageTimeoutRef.current = null;
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const handleLookup = async (event) => {
    event.preventDefault();

    const trimmedName = summonerName.trim();

    if (!trimmedName) {
      showMessage('Please enter a Riot ID.', 'error');
      return;
    }

    if (!trimmedName.includes('#')) {
      showMessage('Please use Riot ID format: GameName#TAG', 'error');
      return;
    }

    if (!riotFunctionUrl) {
      showMessage('Lookup service is not configured yet. Add NEXT_PUBLIC_RIOT_FUNCTION_URL to your environment variables.', 'error');
      return;
    }

    setIsLookingUp(true);
    showMessage(null);
    setResults(null);

    try {
      const response = await fetch(riotFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summonerName: trimmedName,
          region,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || 'Failed to fetch summoner data.';
        showMessage(errorMessage, 'error');
        return;
      }

      setResults(data);
      showMessage('Summoner found!', 'success');
    } catch (error) {
      showMessage('Network error. Please try again.', 'error');
    } finally {
      setIsLookingUp(false);
    }
  };

  const topChampions = results?.topChampions ?? [];

  return (
    <>
      <VisualEffectsOverlay />
      <ParticleField opacity={0.9} />

      <Layout home>
        <Head>
          <title>{`${siteTitle} - Gaming Hub`}</title>
          <meta
            name="description"
            content="Welcome to Praneel's gaming world. Explore my favorite games, hobbies, and connect with me."
          />
        </Head>

        {/* Hero Introduction */}
        <section
          className={`${utilStyles.headingMd} ${effectsStyles.cyberBorder}`}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--muted-text)' }}>
            Passionate gamer and computer science student. Explore my gaming library and connect with me.
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
              href="#league-lookup"
              className={`${hobbyStyles.navigationButton} ${effectsStyles.particleTrail}`}
            >
              League Lookup
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
              href="https://www.praneel.tech"
              target="_blank"
              rel="noreferrer noopener"
              className={effectsStyles.neonGlow}
            >
              Main Site
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

        <section id="league-lookup" className={leagueStyles.leagueLookup}>
          <h3 className={leagueStyles.title}>League Data Lookup</h3>
          <p className={leagueStyles.intro}>
            Enter a Riot ID to see their level and top champions!
          </p>

          {message?.text && (
            <div
              className={`${leagueStyles.message} ${message.type ? leagueStyles[message.type] : ''}`}
              role="status"
              aria-live="polite"
            >
              {message.text}
            </div>
          )}

          <form className={leagueStyles.lookupForm} onSubmit={handleLookup}>
            <div className={leagueStyles.formGroup}>
              <label htmlFor="summoner-name">Riot ID</label>
              <input
                id="summoner-name"
                name="summoner-name"
                type="text"
                className={leagueStyles.input}
                placeholder="GameName#TAG (e.g., Hide on bush#KR1)"
                value={summonerName}
                onChange={(event) => setSummonerName(event.target.value)}
                required
              />
              <small className={leagueStyles.helper}>Format: GameName#TAG</small>
            </div>

            <div className={leagueStyles.formGroup}>
              <label htmlFor="region">Region</label>
              <select
                id="region"
                name="region"
                className={leagueStyles.select}
                value={region}
                onChange={(event) => setRegion(event.target.value)}
              >
                <option value="na1">North America</option>
                <option value="euw1">Europe West</option>
                <option value="eun1">Europe Nordic &amp; East</option>
                <option value="kr">Korea</option>
                <option value="br1">Brazil</option>
                <option value="la1">Latin America North</option>
                <option value="la2">Latin America South</option>
                <option value="oc1">Oceania</option>
                <option value="tr1">Turkey</option>
                <option value="ru">Russia</option>
                <option value="jp1">Japan</option>
              </select>
            </div>

            <button
              type="submit"
              id="lookup-btn"
              className={leagueStyles.submitButton}
              disabled={isLookingUp}
            >
              {isLookingUp ? 'Looking up…' : 'Look Up Summoner'}
            </button>
          </form>

          {results && (
            <div className={leagueStyles.results}>
              <h4 className={leagueStyles.championsTitle}>Summoner Info</h4>
              <div className={leagueStyles.summonerCard}>
                <h5>{results?.summoner?.name ?? 'Unknown Summoner'}</h5>
                <p>Level: {results?.summoner?.level ?? '—'}</p>
              </div>

              <div>
                <h5 className={leagueStyles.championsTitle}>Top Champions</h5>
                {topChampions.length > 0 ? (
                  <div className={leagueStyles.championsGrid}>
                    {topChampions.map((champion) => (
                      <div key={champion.championId} className={leagueStyles.championCard}>
                        <p>
                          <strong>Champion ID:</strong> {champion.championId}
                        </p>
                        <p>
                          <strong>Mastery Level:</strong> {champion.championLevel}
                        </p>
                        <p>
                          <strong>Mastery Points:</strong>{' '}
                          {typeof champion.championPoints === 'number'
                            ? champion.championPoints.toLocaleString()
                            : '—'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No champion mastery data found.</p>
                )}
              </div>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}
