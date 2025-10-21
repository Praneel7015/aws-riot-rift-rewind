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

// Champion ID to Name mapping (common champions)
const CHAMPION_NAMES = {
  1: 'Annie', 2: 'Olaf', 3: 'Galio', 4: 'Twisted Fate', 5: 'Xin Zhao',
  6: 'Urgot', 7: 'LeBlanc', 8: 'Vladimir', 9: 'Fiddlesticks', 10: 'Kayle',
  11: 'Master Yi', 12: 'Alistar', 13: 'Ryze', 14: 'Sion', 15: 'Sivir',
  16: 'Soraka', 17: 'Teemo', 18: 'Ashe', 19: 'Leona', 20: 'Sejuani',
  21: 'Karthus', 22: 'Ashe', 23: 'Tryndamere', 24: 'Jax', 25: 'Morgana',
  26: 'Zilean', 27: 'Singed', 28: 'Rammus', 29: 'Twitch', 30: 'Karthus',
  31: 'Cho\'Gath', 32: 'Amumu', 33: 'Rammus', 34: 'Anivia', 35: 'Shaco',
  36: 'Dr. Mundo', 37: 'Sona', 38: 'Kassadin', 39: 'Irelia', 40: 'Janna',
  41: 'Gangplank', 42: 'Corki', 43: 'Karma', 44: 'Taric', 45: 'Veigar',
  48: 'Trundle', 50: 'Swain', 51: 'Caitlyn', 53: 'Blitzcrank', 54: 'Malphite',
  55: 'Katarina', 56: 'Nocturne', 57: 'Maokai', 58: 'Renekton', 59: 'Jarvan IV',
  60: 'Elise', 61: 'Orianna', 62: 'Wukong', 63: 'Brand', 64: 'Lee Sin',
  67: 'Vayne', 68: 'Rumble', 69: 'Cassiopeia', 72: 'Skarner', 74: 'Heimerdinger',
  75: 'Nasus', 76: 'Nidalee', 77: 'Udyr', 78: 'Poppy', 79: 'Gragas',
  80: 'Pantheon', 81: 'Ezreal', 82: 'Mordekaiser', 83: 'Yorick', 84: 'Akali',
  85: 'Kennen', 86: 'Garen', 89: 'Leona', 90: 'Talon', 91: 'Talon', 92: 'Riven',
  96: 'Kog\'Maw', 98: 'Shen', 99: 'Lux', 101: 'Xerath', 102: 'Shyvana',
  103: 'Ahri', 104: 'Graves', 105: 'Fizz', 106: 'Volibear', 107: 'Rengar',
  110: 'Varus', 111: 'Nautilus', 112: 'Viktor', 113: 'Sejuani', 114: 'Fiora',
  115: 'Ziggs', 117: 'Lulu', 119: 'Draven', 120: 'Hecarim', 121: 'Kha\'Zix',
  122: 'Darius', 126: 'Jayce', 127: 'Lissandra', 131: 'Diana', 133: 'Quinn',
  134: 'Syndra', 136: 'Aurelion Sol', 141: 'Kayn', 142: 'Zoe', 143: 'Zyra',
  145: 'Kai\'Sa', 147: 'Seraphine', 150: 'Gnar', 154: 'Zac', 157: 'Yasuo',
  161: 'Vel\'Koz', 163: 'Taliyah', 164: 'Camille', 166: 'Yuumi', 168: 'Pyke',
  69: 'Cassiopeia', 222: 'Jinx', 223: 'Tahm Kench', 224: 'Braum', 225: 'Ekko',
  226: 'Illaoi', 230: 'Rek\'Sai', 235: 'Senna', 236: 'Lucian', 238: 'Zed',
  240: 'Kled', 246: 'Qiyana', 247: 'Akshan', 248: 'Thresh', 266: 'Aatrox',
  267: 'Nami', 268: 'Azir', 350: 'Yuumi', 360: 'Samira', 412: 'Thresh',
  516: 'Ornn', 517: 'Sylas', 518: 'Neeko', 519: 'Leona', 520: 'Okiara',
};

const getMasteryEmoji = (level) => {
  const emojis = ['', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐⭐', '💎'];
  return emojis[level] || '⭐';
};

const getChampionName = (champId) => {
  return CHAMPION_NAMES[champId] || `Champion ${champId}`;
};

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

      let rawPayload = '';
      let data = null;

      try {
        rawPayload = await response.text();
        data = rawPayload ? JSON.parse(rawPayload) : null;
      } catch (parseError) {
        console.error('Failed to parse lookup response as JSON', parseError);
      }

      if (!response.ok) {
        const errorDetails =
          data?.error ||
          data?.message ||
          data?.detail ||
          (typeof data === 'string' ? data : rawPayload) ||
          `${response.status} ${response.statusText}`;

        showMessage(`Lookup failed: ${errorDetails}`.trim(), 'error');
        return;
      }

      if (!data) {
        showMessage('Lookup succeeded but returned no data.', 'error');
        return;
      }

      setResults(data);
      showMessage('Summoner found!', 'success');
    } catch (error) {
      const detailedMessage =
        error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);
      showMessage(`Lookup error: ${detailedMessage}`, 'error');
      console.error('League lookup failed', error);
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
                    {topChampions.map((champion) => {
                      const lastPlayDate = new Date(champion.lastPlayTime).toLocaleDateString();
                      const progressPercent = Math.min(
                        (champion.championPointsSinceLastLevel / 
                          (champion.championPointsSinceLastLevel + champion.championPointsUntilNextLevel)) * 100,
                        100
                      );
                      
                      return (
                        <div key={champion.championId} className={leagueStyles.championCard}>
                          <div className={leagueStyles.championHeader}>
                            <h6 className={leagueStyles.championName}>
                              {getChampionName(champion.championId)}
                            </h6>
                            <div className={leagueStyles.masteryBadge}>
                              {getMasteryEmoji(champion.championLevel)}
                            </div>
                          </div>
                          <div className={leagueStyles.championStats}>
                            <div className={leagueStyles.statRow}>
                              <span className={leagueStyles.statLabel}>Mastery Level:</span>
                              <span className={leagueStyles.statValue}>{champion.championLevel}</span>
                            </div>
                            <div className={leagueStyles.statRow}>
                              <span className={leagueStyles.statLabel}>Total Points:</span>
                              <span className={leagueStyles.statValue}>
                                {champion.championPoints.toLocaleString()}
                              </span>
                            </div>
                            <div className={leagueStyles.statRow}>
                              <span className={leagueStyles.statLabel}>Last Played:</span>
                              <span className={leagueStyles.statValue}>{lastPlayDate}</span>
                            </div>
                          </div>
                          <div className={leagueStyles.progressSection}>
                            <div className={leagueStyles.progressLabel}>
                              <span className={leagueStyles.progressText}>Progress to Next Level</span>
                              <span className={leagueStyles.progressPoints}>
                                {champion.championPointsSinceLastLevel} / {champion.championPointsSinceLastLevel + champion.championPointsUntilNextLevel}
                              </span>
                            </div>
                            <div className={leagueStyles.progressBar}>
                              <div 
                                className={leagueStyles.progressFill}
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
