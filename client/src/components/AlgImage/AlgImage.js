import React from 'react';

import ColorSchemeContext from '../ColorSchemeContext/ColorSchemeContext';
import { algImageUrl } from '../../logic/utils';

/* Valid options: stage, topView, colorScheme, size. */
const AlgImage = ({ alg = '', options = {}, style = {}, ...props }) => (
  <ColorSchemeContext.Consumer>
    {colorScheme => (
      <img
        {...props}
        src={algImageUrl(alg, { colorScheme, ...options })}
        alt="Alg"
        style={{ minHeight: options.size || 150, ...style }}
      />
    )}
  </ColorSchemeContext.Consumer>
);

export default AlgImage;
