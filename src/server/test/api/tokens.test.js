/* eslint-disable no-undef */
import config from 'config';
import nock from 'nock';
import request from 'supertest';
import app from '../../../../app';
import { API } from '../../routes/PATH';
import { V1 } from '../../routes/api/VERSIONS';
import { TOKENS } from '../../routes/api/v1/ENDPOINT';
import { AUTHORIZATION, BEARER_PREFIX } from '../../../universal/api/consts';
import { generateValidAccressToken } from './test_util';

const path = API + V1 + TOKENS;

describe('/tokens', () => {
  const testSuccessRequest = (accessToken, done) => {
    request(app)
      .get(path)
      .set(AUTHORIZATION, `${BEARER_PREFIX}${accessToken}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  };

  it('should return 200', done => {
    nock(config.xyzApi.host)
      .get('/tokens')
      .query({ organization_id: 'xyz' })
      .reply(200, { tokens: [] });

    testSuccessRequest(generateValidAccressToken(), done);
  });
});

describe('/token/:id', () => {
  const tokenId = '1';

  it('should return 200', done => {
    nock(config.xyzApi.host)
      .get(`/tokens/${tokenId}`)
      .reply(200, { token: {} });

    request(app)
      .get(`${path}/${tokenId}`)
      .set(AUTHORIZATION, `${BEARER_PREFIX}${generateValidAccressToken()}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
