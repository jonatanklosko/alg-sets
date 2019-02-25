import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { TwitterPicker } from 'react-color'

import { defaultColorScheme, algImageUrl } from '../../logic/utils';

const colorList = ['#000000', '#FFFFFF', '#FEFE00', '#EE0000', '#FFA100', '#0000F2', '#00D800'];
const sides = ['U', 'R', 'F', 'D', 'L', 'B'];

const ColorSchemeEditor = ({ colorScheme, onChange }) => {
  const [side, setSide] = useState('U');
  const colors = (colorScheme || defaultColorScheme).split(',');
  const colorIndex = sides.indexOf(side);
  const handleColorChange = ({ hex }) => onChange(
    [ ...colors.slice(0, colorIndex),
      hex.slice(1), /* Without the leading # */
      ...colors.slice(colorIndex + 1),
    ].join(',')
  );

  return (
    <Grid container spacing={24}>
      <Grid item>
        <FormControl component="fieldset">
          <RadioGroup
            value={side}
            onChange={event => setSide(event.target.value)}
            row={true}
          >
            {sides.map(side => (
              <FormControlLabel value={side} control={<Radio />} label={side} key={side} />
            ))}
          </RadioGroup>
        </FormControl>
        <Grid container spacing={8}>
          <Grid item>
            <TwitterPicker
              triangle="hide"
              colors={colorList}
              color={'#' + colors[colorIndex]}
              onChangeComplete={handleColorChange}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => onChange(defaultColorScheme)} >
              <Icon>format_color_reset</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <img src={algImageUrl('R2 L2 U2 D2 F2 B2', { colorScheme })} alt="Alg" />
      </Grid>
    </Grid>
  );
};

export default ColorSchemeEditor;
