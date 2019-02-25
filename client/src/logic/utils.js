import { shrink } from './moves';

export const defaultColorScheme = 'FEFE00,EE0000,0000F2,FFFFFF,FFA100,00D800'; /* URFDLB */

export const algImageUrl = (alg, { stage , topView, colorScheme } = {}) => {
  const IMAGE_BASE_URL = 'http://cube.crider.co.uk/visualcube.php';
  const params = new URLSearchParams({
    fmt: 'svg',
    size: 150,
    bg: 't',
    pzl: 3,
    case: shrink(alg),
    sch: colorScheme || defaultColorScheme,
    r: 'y34x-34',
    /* Additional options */
    stage,
    view: topView ? 'plan' : '',
  });
  return `${IMAGE_BASE_URL}?${params.toString()}`;
};

export const algAnimationUrl = alg => {
  const ANIMATION_BASE_URL = 'https://alg.cubing.net';
  const params = new URLSearchParams({ alg, type: 'alg' });
  return `${ANIMATION_BASE_URL}?${params.toString()}`;
};

export const preventDefault = fn => event => {
  event.preventDefault();
  fn();
};

export const pluralize = (count, singular, plural) =>
  `${count} ${count === 1 ? singular : (plural || singular + 's')}`;
