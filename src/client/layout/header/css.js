// @flow

import { typography, color, headerHeight } from '../../cssCommon/';

const styles = {
  root: {
    display: 'flex',
    height: headerHeight,
    padding: '0 32px',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridRow: 1,
    gridColumn: 2,
  },
  title: {
    ...typography.extraLarge2,
    color: color.primary,
  },
  profile: {
    root: {
      width: 240,
      padding: 8,
      color: color.primary,

      '&:hover': {
        position: 'absolute',
        top: 10,
        right: 32,
        borderRadius: 2,
        boxShadow:
          '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)',
      },
    },
    names: {
      padding: '0 0 8px 56px',
    },
    organizationName: {
      ...typography.subHeading2,
      margin: '0 0 4px 0',
    },
    accountName: {
      ...typography.title2,
      margin: '0 0 4px 0',
      '&::before': {
        content: 'xxx',
      },
    },
    statusIcon: {
      marginRight: 8,
      fontSize: 8,
      color: color.success,
    },
    actions: {
      padding: '8px 16px',
      borderTop: `2px solid ${color.border}`,
    },
    action: {
      ...typography.subHeading,
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      border: 'unset',
      color: color.primary,
      backgroundColor: 'unset',
      cursor: 'pointer',
    },
    actionIcon: {
      marginRight: 8,
      fontSize: 24,
    },
  },
};

export default styles;

export type _styles = typeof styles;
