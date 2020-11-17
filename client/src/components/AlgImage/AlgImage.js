import React, { useContext, useEffect, useRef } from 'react';
import { cubeSVG } from 'sr-visualizer';

import ColorSchemeContext from '../ColorSchemeContext/ColorSchemeContext';
import { algImageUrl } from '../../logic/utils';

/* Valid options: stage, topView, colorScheme, size. */
const AlgImage = ({ alg = '', options = {}, style = {}, ...props }) => {
  const size = options.size || 150

  const colorScheme = useContext(ColorSchemeContext)
  const rootRef = useRef(null);

  const url = algImageUrl(alg, { colorScheme, ...options })

  useEffect(() => {
    const root = rootRef.current;
    const svg = root.firstChild;
    if (svg) {
      root.removeChild(svg);
    }

    // Use the URL alternative for easier migration to the JS visualcube.
    cubeSVG(rootRef.current, url);
  }, [url]);

  return (
    <div
      {...props}
      ref={rootRef}
      style={{ minHeight: size, minWidth: size, ...style }}
    />
  )
}

export default AlgImage;
