// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import _get from 'lodash/get';

import type { _styles } from './css';
import styles from './css';

type _listComponentProps = {
  className: string,
  classes: _styles,
  children: React.Node,
};

const ListComponent = ({
  className = '',
  classes,
  children,
}: _listComponentProps) => (
  <Paper className={classNames(className, classes.root)}>
    <div className={classes.labelBackGround} />
    {children}
  </Paper>
);
export const List = withStyles(styles)(ListComponent);

type _listItemComponentProps = {
  className: string,
  classes: _styles,
  label: string,
  subLabel: string,
  children: React.Node,
};
const ListItemComponent = ({
  className = '',
  classes,
  label,
  subLabel = '',
  children,
}: _listItemComponentProps) => (
  <section className={classNames(className, classes.section)}>
    <h3 className={classes.header}>
      {label}
      <br />
      <span className={classes.subLabel}>{subLabel}</span>
    </h3>
    <div className={classes.body}>{children}</div>
  </section>
);
export const ListItem = withStyles(styles)(ListItemComponent);

type _item = {
  label: string,
  subLabel: string,
  value: React.Node,
};

type _baseListProps = {
  className: string,
  listItemClassName: string,
  items: Array<_item>,
};

export const BaseList = ({
  className = '',
  listItemClassName = '',
  items,
}: _baseListProps) => (
  <List className={className}>
    {items.map((item, index) => (
      <ListItem
        label={item.label}
        subLabel={item.subLabel}
        className={classNames(listItemClassName, {
          last: items.length - 1 === index,
        })}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      >
        {item.value}
      </ListItem>
    ))}
  </List>
);

type _option = {
  keys: Array<string>,
  label: string,
  subLabel: string,
  render?: (args: Array<any>) => React.Node,
};

export const createListItems = (
  source: any,
  options: Array<_option>
): Array<_item> =>
  options.map(opt => ({
    label: opt.label,
    subLabel: opt.subLabel,
    value: opt.render
      ? // $FlowFixMe
        opt.render(...opt.keys.map(key => _get(source, key)))
      : _get(source, opt.keys[0]),
  }));

type _simpleListProps = {
  className: string,
  listItemClassName: string,
  source: any,
  options: Array<_option>,
};

export const SimpleList = ({
  source,
  options,
  className = '',
  listItemClassName = '',
}: _simpleListProps) => (
  <BaseList
    className={className}
    listItemClassName={listItemClassName}
    items={createListItems(source, options)}
  />
);
