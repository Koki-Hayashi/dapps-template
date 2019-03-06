// @flow

const styles = {
  root: {
    marginBottom: 48,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  list: {
    width: 'calc(50% - 22px)',
    minWidth: 480,
    '&.first': {
      marginRight: 40,
    },
  },
};

export default styles;

export type _styles = typeof styles;
