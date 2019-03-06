// @flow
import safeJsonStringify from 'safe-json-stringify';
import queryStringFormatter from 'query-string';
import { api } from 'config';
import { NOT_AUTHORIZED, NO_CONTENT } from '../../universal/http/HTTP_STATUS';
import logout from '../logout/logoutService';
import {
  AUTHORIZATION,
  BEARER_PREFIX,
  CONTENT_TYPE,
  APPLICATION_JSON,
  CREDENTIALS,
  BODY,
  METHOD,
  HEADERS,
  INCLUDE,
  DELETE,
  POST,
  GET,
  PUT,
} from '../../universal/api/consts';
import { getAccessToken } from './util';

function getCommonHeaders(): {} {
  return {
    [AUTHORIZATION]: BEARER_PREFIX + getAccessToken(),
  };
}

function getJsonContentHeaders() {
  return {
    ...getCommonHeaders(),
    [CONTENT_TYPE]: APPLICATION_JSON,
  };
}

async function handleResponse(res): Promise<any> {
  if (res.status === NOT_AUTHORIZED) {
    logout();
    return Promise.reject();
  }

  if (res.status === NO_CONTENT) {
    return Promise.resolve();
  }

  const resBody = await res.json(); // assume all response is json from the frontend server

  if (!res.ok) {
    return Promise.reject(resBody); // in this case, response body should be an error object.
  }

  return resBody;
}

function formatQs(queryString: ?{}): string {
  return queryString
    ? `?${queryStringFormatter.stringify(queryString, { encode: true })}`
    : '';
}

export default class ApiService {
  static async postJson(
    path: string,
    body: ?{},
    queryString: ?{}
  ): Promise<any> {
    const url = api.host + path + formatQs(queryString);

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

  static async putJson(
    path: string,
    body: ?{},
    queryString: ?{}
  ): Promise<any> {
    const url = api.host + path + formatQs(queryString);

    const res = await fetch(url, {
      [METHOD]: PUT,
      [HEADERS]: getJsonContentHeaders(),
      [BODY]: body ? safeJsonStringify(body) : '',
      [CREDENTIALS]: INCLUDE,
    }).catch(error => {
      throw error;
    });

    return handleResponse(res);
  }

  static async getJson(path: string, queryString: ?{}): Promise<any> {
    const url = api.host + path + formatQs(queryString);

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
    const url = api.host + path + formatQs(queryString);

    const res = await fetch(url, {
      [METHOD]: DELETE,
      [HEADERS]: getCommonHeaders(),
      [CREDENTIALS]: INCLUDE,
    }).catch(error => {
      throw error;
    });

    return handleResponse(res);
  }
}
