// @flow

import typography from '../../../cssCommon/styleGuide/typography';
import color from '../../../cssCommon/styleGuide/color';

const panelSize = {
  width: 240,
  height: 240,
  minWidth: 240,
  minHeight: 240,
};

const styles = {
  root: {
    ...panelSize,
    marginRight: 40,
    padding: '40px 0 16px',
    textAlign: 'center',
  },
  symbolText: {
    marginBottom: 24,
    ...typography.display1_500,
    color: color.primary,
  },
  nameText: {
    marginBottom: 8,
    ...typography.largeTitle2,
    color: color.primary,
  },
};

export default styles;

export type _styles = typeof styles;
