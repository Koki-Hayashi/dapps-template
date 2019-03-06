// @flow

import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography/Typography';
import Drawer from '@material-ui/core/Drawer/Drawer';
import List from '@material-ui/core/List/List';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import type { _styles } from './css';
import styles from './css';
import { TOKENS } from '../pages/PAGE_ENUM';
import { redirect } from '../redirect/redirectService';

type _props = {
  classes: $PropertyType<_styles, 'sideBar'>,
};

const getUpperMenus = () => [
  {
    icon: <ListIcon />,
    page: TOKENS,
  },
];

const handleRedirect = m => {
  redirect(m.page);
};

const listItem = (m, classes) => (
  <ListItem
    key={m.page.title}
    className={classes.listItem}
    onClick={() => handleRedirect(m)}
    button
    disableGutters
  >
    <ListItemIcon className={classes.menuIcon}>{m.icon}</ListItemIcon>
    <ListItemText
      className={classes.listItemText}
      primary={
        <Typography className={classes.menuTitle}>{m.page.title}</Typography>
      }
    />

    {/* setting Typography as primary attibute is the only solution to apply custom css to ListItem as of 2018/10/30 */}
  </ListItem>
);

const createSideBar = classes => (
  <div className={classes.root}>
    <CssBaseline />
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.logo}>
        <Typography className={classes.logoText}>DApps Template</Typography>
      </div>
      <div className={classes.links}>
        <List className={classes.list}>
          {getUpperMenus().map(m => listItem(m, classes))}
        </List>
      </div>
    </Drawer>
  </div>
);

const sideBar = ({ classes }: _props) => createSideBar(classes);

export default withStyles(styles.sideBar)(sideBar);
