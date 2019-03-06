// @flow

import { color, typography } from '../../../cssCommon';

const statusWrapperBase = {
  display: 'flex',
  width: 400,
  height: 96,
  margin: '0 auto 36px auto',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '200px 0 100px',
  },
  contentWrapper: {
    marginBottom: 200,
  },
  text: {
    ...typography.large2,
    color: color.primary,
  },
  button: {
    width: 176,
  },
  noMetaMask: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: {
      ...typography.largeTitle2,
      color: color.primary,
      marginBottom: 40,
    },
  },
  transition: {
    statusWrapper: {
      ...statusWrapperBase,
      backgroundColor: color.base,
    },
    attentionStatusWrapper: {
      ...statusWrapperBase,
      backgroundColor: color.attentionBg,
    },
    statusText: {
      ...typography.largeTitle2,
      color: color.primary,
    },
    attentionStatusText: {
      ...typography.largeTitle2,
      color: color.attention,
    },
    text: {
      ...typography.largeTitle2,
      color: color.primary,
    },
  },
  success: {
    root: {
      display: 'flex',
    },
    icon: {
      color: color.primary,
      marginRight: 8,
    },
    text: {
      ...typography.title,
      color: color.primary,
    },
  },
};

export default styles;

export type _styles = typeof styles;
