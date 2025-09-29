import effectsStyles from '../styles/effects.module.css';

export default function VisualEffectsOverlay({ showScanlines = true, showCrt = true, showConsoleLines = true }) {
  return (
    <>
      {showScanlines && <div className={effectsStyles.scanlines} aria-hidden="true" />}
      {showCrt && <div className={effectsStyles.crtEffect} aria-hidden="true" />}
      {showConsoleLines && <div className={effectsStyles.consoleLines} aria-hidden="true" />}
    </>
  );
}
