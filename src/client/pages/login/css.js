// @flow

import { color, typography } from '../../cssCommon';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(39, 88, 107, 0.08)',
  },
  loginBtn: {
    ...typography.button,
    width: 164,
    height: 44,
    color: color.white,
    marginBottom: 17,
    padding: 0,
    borderRadius: 4,
  },
};

export default styles;

export type _styles = typeof styles;
