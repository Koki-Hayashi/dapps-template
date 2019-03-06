// @flow
import fetch from 'node-fetch';
import safeJsonStringify from 'safe-json-stringify';
import queryStringFormatter from 'query-string';
import { xyzApi } from 'config';
import {
  NO_CONTENT,
  NOT_AUTHORIZED,
} from '../../../universal/http/HTTP_STATUS';
import {
  APPLICATION_JSON,
  BODY,
  CONTENT_TYPE,
  CREDENTIALS,
  DELETE,
  GET,
  HEADERS,
  INCLUDE,
  METHOD,
  POST,
} from '../../../universal/api/consts';

function getJsonContentHeaders() {
  return {
    [CONTENT_TYPE]: APPLICATION_JSON,
  };
}

async function handleResponse(res): Promise<any> {
  if (res.status === NOT_AUTHORIZED) {
    return Promise.reject();
  }

  if (res.status === NO_CONTENT) {
    return Promise.resolve();
  }

  const resBody = await res.json();

  if (!res.ok) {
    return Promise.reject(resBody); // assume error object. See API doc.
  }

  return resBody;
}

function formatQs(queryString: ?{}): string {
  return queryString
    ? `?${queryStringFormatter.stringify(queryString, { encode: true })}`
    : '';
}

export default class XyzApiService {
  static async postJson(
    path: string,
    body: ?{},
    queryString: ?{}
  ): Promise<any> {
    const url = xyzApi.host + path + formatQs(queryString);

    const res = await fetch(url, {
      [METHOD]: POST,
      [HEADERS]: getJsonContentHeaders(),
      [BODY]: body ? safeJsonStringify(body) : '',
      [CREDENTIALS]: INCLUDE,
    }).catch(error => {
      throw error;
    });

    return handleResponse(res);
  }

  static async getJson(path: string, queryString: ?{}): Promise<any> {
    const url = xyzApi.host + path + formatQs(queryString);

    const res = await fetch(url, {
      [METHOD]: GET,
      [HEADERS]: getJsonContentHeaders(),
      [CREDENTIALS]: INCLUDE,
    }).catch(error => {
      throw error;
    });

    return handleResponse(res);
  }

  static async delete(path: string, queryString: ?{}): Promise<any> {
    const url = xyzApi.host + path + formatQs(queryString);

    const res = await fetch(url, {
      [METHOD]: DELETE,
      [CREDENTIALS]: INCLUDE,
    }).catch(error => {
      throw error;
    });

    return handleResponse(res);
  }
}
