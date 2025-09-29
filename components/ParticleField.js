import { useMemo, useRef } from 'react';

import { useParticleNetwork } from '../hooks/useParticleNetwork';

const baseStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -1,
};

function useStableOptions(options) {
  return useMemo(() => options, [JSON.stringify(options)]);
}

export default function ParticleField({ style, opacity = 0.8, ...options }) {
  const canvasRef = useRef(null);
  const stableOptions = useStableOptions(options);

  useParticleNetwork(canvasRef, stableOptions);

  return (
    <canvas
      ref={canvasRef}
      style={{ ...baseStyle, opacity, ...style }}
    />
  );
}
