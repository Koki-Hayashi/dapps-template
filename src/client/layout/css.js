// @flow

import typography from '../cssCommon/styleGuide/typography';
import color from '../cssCommon/styleGuide/color';
import { headerHeight } from './cssCommon';

const styles = {
  root: {
    display: 'grid',
    gridTemplateRows: '100px 1fr',
    gridTemplateColumns: '288px 1fr',
    gridGap: 0,
    height: '100%',
  },
  contentWrapper: {
    height: 'calc(100vh - 100px)',
    maxWidth: 'calc(100vw - 288px)',
    padding: '36px 24px',
    gridRow: 2,
    gridColumn: 2,
  },
  content: {
    padding: 8,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  sideBar: {
    root: {
      display: 'flex',
      gridRow: '1 / 3',
      gridColumn: 1,
    },
    drawerPaper: {
      border: 'none',
      backgroundColor: color.primary,
    },
    logo: {
      display: 'flex',
      height: headerHeight,
      paddingTop: 16,
      margin: '0 24px',
      alignItems: 'center',
      justifyContent: 'start',
    },
    logoText: {
      color: color.white,
      ...typography.display2_500,
    },
    links: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      margin: '40px 16px 12px',
      justifyContent: 'space-between',
    },
    list: {
      marginLeft: 16,
      marginRight: 4,
    },
    listItem: {
      marginBottom: 12,
    },
    listItemText: {
      padding: '0 12px',
    },
    menuTitle: {
      color: color.white,
      ...typography.title2,
    },
    menuIcon: {
      margin: 0,
      color: color.white,
    },
    bottomMenus: {
      paddingTop: 8,
      borderTop: `2px solid ${color.whiteAlpha}`,
    },
  },
};

export default styles;

export type _styles = typeof styles;
