/* eslint-disable no-undef */
import config from 'config';
import nock from 'nock';
import request from 'supertest';
import app from '../../../../app';
import { LOGIN } from '../../routes/PATH';

describe('/login', () => {
  const testSuccessRequest = (body, done) => {
    request(app)
      .post(LOGIN)
      .send(body)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeObject();
        expect(res.body).toContainKey('token');
        done();
      });
  };

  const testFailureRequest = (body, done) => {
    request(app)
      .post(LOGIN)
      .send(body)
      .then(res => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toBeObject();
        expect(res.body).toContainKey('message');
        done();
      });
  };

  it('should return 200', done => {
    nock(config.xyzApi.host)
      .post('/login')
      .reply(200, { token: 'token' });

    const body = {
      message: 'testtest',
      signature: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ethereum_address: '0x76AF3fa74BCbB01a027Db95ee5d7Ee3f9Ba4FaDb',
      onetime_message: 'onetime',
    };
    testSuccessRequest(body, done);
  });

  it('should return 400 when request does not have message', done => {
    const body = {
      signature: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ethereum_address: '0x76AF3fa74BCbB01a027Db95ee5d7Ee3f9Ba4FaDb',
      onetime_message: 'onetime',
    };
    testFailureRequest(body, done);
  });

  it('should return 400 when request does not have signature', done => {
    const body = {
      message: 'testtest',
      ethereum_address: '0x76AF3fa74BCbB01a027Db95ee5d7Ee3f9Ba4FaDb',
      onetime_message: 'onetime',
    };
    testFailureRequest(body, done);
  });

  it('should return 400 when request does not have ethereum_address', done => {
    const body = {
      message: 'testtest',
      signature: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      onetime_message: 'onetime',
    };
    testFailureRequest(body, done);
  });

  it('should return 400 when request does not have onetime_message', done => {
    const body = {
      message: 'testtest',
      ethereum_address: '0x76AF3fa74BCbB01a027Db95ee5d7Ee3f9Ba4FaDb',
      signature: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };
    testFailureRequest(body, done);
  });
});
