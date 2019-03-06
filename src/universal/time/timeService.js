/* eslint-disable import/prefer-default-export */
// @flow
import moment from 'moment';

/**
 * From the given time formatted ISO-8601 (e.g., 2017-09-12T20:20:33Z), extract only short month + date and year.
 *
 * E.g., Jan 1, 2018
 *
 */
export function extractShortMonthDateYear(isoTime: string) {
  const m = moment(isoTime, moment.ISO_8601);
  return m.format('ll');
}
