// @flow

import { color, typography } from '../../cssCommon';

const buttonBase = {
  ...typography.body3,
  textTransform: 'none',
  minHeight: 15,
  minWidth: 85,
  padding: '10px 30px 12px',
};

const styles = {
  root: {
    ...buttonBase,

    '&.primary': {
      color: color.white,
      backgroundColor: color.primary,

      '&:hover': {
        backgroundColor: color.primaryLight,
      },
    },

    '&.attention': {
      color: color.attention,
      backgroundColor: color.white,
      border: `2px solid ${color.attention}`,

      '&:hover': {
        backgroundColor: color.attentionBg,
      },
    },

    '&.white': {
      color: color.primary,
      backgroundColor: color.white,
      border: `2px solid ${color.primary}`,

      '&:hover': {
        backgroundColor: color.base,
      },
    },

    '&.text': {
      color: color.primary,

      '&:hover': {
        backgroundColor: color.base,
      },
    },
  },
  disabled: {
    color: `${color.disabled} !important`,
    backgroundColor: `${color.disabledBg} !important`,
  },
  etherscan: {
    ...typography.caption2,
    width: 108,
    height: 32,
    padding: 0,
    color: color.primary,
  },
  etherscanIcon: {
    marginRight: 8,
    fontSize: 16,
  },
};

export default styles;

export type _styles = typeof styles;
