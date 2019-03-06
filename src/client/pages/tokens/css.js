// @flow

const tokenPanelHeight = 260;
const tokenPanelMarginBottom = 30;

const sidebarWidth = 288;
const contentPaddingWidth = 32 * 2;

const styles = {
  tokenPanel: {
    display: 'flex',
    width: `calc(100vw - ${sidebarWidth + contentPaddingWidth}px)`,
    height: tokenPanelHeight,
    marginBottom: tokenPanelMarginBottom,
    overflowX: 'scroll',
  },
};

export default styles;

export type _styles = typeof styles;
