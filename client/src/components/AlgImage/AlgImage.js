import React from 'react';

import ColorSchemeContext from '../ColorSchemeContext/ColorSchemeContext';
import { algImageUrl } from '../../logic/utils';

/* Valid options: stage, topView, colorScheme. */
const AlgImage = ({ alg = '', options = {}, ...props }) => (
  <ColorSchemeContext.Consumer>
    {colorScheme => (
      <img {...props} src={algImageUrl(alg, { colorScheme, ...options })} alt="Alg" />
    )}
  </ColorSchemeContext.Consumer>
);

export default AlgImage;
