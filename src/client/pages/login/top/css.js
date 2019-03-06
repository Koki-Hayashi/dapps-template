// @flow

import { color, typography } from '../../../cssCommon';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundImage: 'url(/img/login/bg.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  upper: {
    flex: 1,
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: '30px 100px 0 0',
  },
  name: {
    color: color.white,
    ...typography.display2_500,
    marginBottom: 170,
  },
  welcome: {
    color: color.white,
    ...typography.extraLarge,
    fontSize: 64, // override

    marginBottom: 48,
  },
  subtitle: {
    color: color.white,
    ...typography.largeTitle2,
  },
  lower: {
    flexBasis: 240,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '0 0 240px 144px',
  },
  loginText: {
    ...typography.large2,
    color: color.primary,

    margin: '0 0 24px 20px',
  },
  subtext: {
    ...typography.largeTitle2,
    color: color.primary,

    margin: '0 0 48px 20px',
  },
  metaMaskBtn: {
    width: 320,
    height: 80,
    fontSize: 24,
  },
};

export default styles;

export type _styles = typeof styles;
