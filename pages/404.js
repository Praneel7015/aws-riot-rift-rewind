import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
// using plain text links styled by global.css

export default function Custom404() {
  return (
  <Layout showBackLink={false}>
      <Head>
        <title>404 - Page not found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{
        textAlign: 'center',
        padding: '3rem 0',
      }}>
        <div style={{
          fontSize: '4rem',
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--text)'
        }}>404</div>
        <p style={{ color: 'var(--muted-text)', marginTop: '0.75rem' }}>
          Sorry, we couldn't find that page.
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          <Link href="/">Go Home</Link>
          <span style={{ color: 'var(--muted-text)' }}> • </span>
          <Link href="https://www.praneel.tech">View Main Page</Link>
        </p>
      </div>
    </Layout>
  );
}