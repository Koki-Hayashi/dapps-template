// @flow

import { color, typography } from '../../../cssCommon/';

const styles = {
  root: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 2,
    boxShadow:
      '0 1px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.14)',
  },
  labelBackGround: {
    position: 'absolute',
    height: '100%',
    width: 128,
    backgroundColor: color.primaryAlpha,
    borderRight: `2px solid ${color.border}`,
  },
  section: {
    display: 'flex',
    position: 'relative',
    minHeight: 56,
    margin: '0 16px 0 8px',
    color: color.primary,
    borderBottom: `2px solid ${color.border}`,
    '&.last': {
      border: 'none',
    },
  },
  header: {
    ...typography.body2,
    minWidth: 120,
    padding: '4px 8px 4px 24px',
    margin: 'auto 0',
    flexBasis: 120,
  },
  subLabel: {
    ...typography.caption1,
  },
  body: {
    ...typography.body1,
    display: 'flex',
    padding: '4px 20px 4px 32px',
    margin: 'auto 0',
    justifyContent: 'start',
    alignItems: 'center',
    lineHeight: 1.57,
    wordBreak: 'break-all',
  },
};

export default styles;

export type _styles = typeof styles;
