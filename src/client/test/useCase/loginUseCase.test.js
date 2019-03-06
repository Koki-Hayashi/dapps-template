/* eslint-disable no-undef */

import {
  LOGIN_ERROR,
  NO_LOGIN,
  NO_META_MASK,
  SUCCESS,
  VERIFYING,
  WAITING_SIGN,
} from '../../model/metaMaskLogin';

describe('loginWithMetaMask', () => {
  beforeEach(() => {
    // mock for all
    jest.mock('../../module/metamaskLoginModule', () => ({
      updateStatus: jest.fn(),
      updateDisableBack: jest.fn(),
    }));
  });

  afterEach(() => {
    // recover mocked objects
    jest.resetModules();
  });

  it('fails if MetaMask is not installed', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => null,
    }));

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus).toBeCalledWith(NO_META_MASK);
    expect(updateDisableBack).not.toHaveBeenCalled();
  });

  it('fails if no MetaMask is locked', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => ({ eth: { getAccounts: () => [] } }),
    }));

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus).toBeCalledWith(NO_LOGIN);
    expect(updateDisableBack).not.toHaveBeenCalled();
  });

  it('fails if fetching onetime message failed', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => ({
        eth: {
          getAccounts: () => ['something'],
        },
        utils: {
          sha3: () => {
            throw new Error('some error');
          },
        },
      }),
    }));

    const ApiService = require('../../api/apiService').default;
    const mockGetJson = jest.fn();
    mockGetJson.mockRejectedValue('some reject');

    ApiService.getJson = mockGetJson;

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus.mock.calls).toEqual([[LOGIN_ERROR]]);
    expect(updateDisableBack).toBeCalledWith(false);
  });

  it('fails if making a signature failed', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => ({
        eth: {
          getAccounts: () => ['something'],
        },
        utils: {
          sha3: () => {
            throw new Error('some error');
          },
        },
      }),
    }));

    const ApiService = require('../../api/apiService').default;
    const mockGetJson = jest.fn();
    mockGetJson.mockResolvedValue({ message: 'something.like.jwt' });

    ApiService.getJson = mockGetJson;

    jest.mock('jsonwebtoken');
    const mockJwt = require('jsonwebtoken');
    mockJwt.decode.mockReturnValueOnce({ message: 'onetime_message' });

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus.mock.calls).toEqual([[WAITING_SIGN], [LOGIN_ERROR]]);
    expect(updateDisableBack).toBeCalledWith(true);
  });

  it('fails if verification failed', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => ({
        eth: {
          getAccounts: () => ['something'],
          sign: () => 'abcdefghijklnm',
        },
        utils: {
          sha3: () => 'msgHash',
        },
      }),
    }));

    const ApiService = require('../../api/apiService').default;

    const mockGetJson = jest.fn();
    mockGetJson.mockResolvedValue({ message: 'something.like.jwt' });
    ApiService.getJson = mockGetJson;

    jest.mock('jsonwebtoken');
    const mockJwt = require('jsonwebtoken');
    mockJwt.decode.mockReturnValueOnce({ message: 'onetime_message' });

    const mockPostJson = jest.fn();
    mockPostJson.mockRejectedValue('some reject');
    ApiService.postJson = mockPostJson;

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus.mock.calls).toEqual([
      [WAITING_SIGN],
      [VERIFYING],
      [LOGIN_ERROR],
    ]);
    expect(updateDisableBack).toBeCalledWith(true);
  });

  it('fails if access token is empty', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => ({
        eth: {
          getAccounts: () => ['something'],
          sign: () => 'abcdefghijklnm',
        },
        utils: {
          sha3: () => 'msgHash',
        },
      }),
    }));

    const ApiService = require('../../api/apiService').default;
    const mockGetJson = jest.fn();
    mockGetJson.mockResolvedValue({ message: 'something.like.jwt' });
    ApiService.getJson = mockGetJson;

    jest.mock('jsonwebtoken');
    const mockJwt = require('jsonwebtoken');
    mockJwt.decode.mockReturnValueOnce({ message: 'onetime_message' });

    const mockPostJson = jest.fn();
    mockPostJson.mockResolvedValue('');

    ApiService.postJson = mockPostJson;

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus.mock.calls).toEqual([
      [WAITING_SIGN],
      [VERIFYING],
      [LOGIN_ERROR],
    ]);
    expect(updateDisableBack).toBeCalledWith(true);
  });

  it('succeeds', async () => {
    // setup
    jest.mock('../../web3/web3Registry', () => ({
      getMetaMaskWeb3: () => ({
        eth: {
          getAccounts: () => ['something'],
          sign: () => 'abcdefghijklnm',
        },
        utils: {
          sha3: () => 'msgHash',
        },
      }),
    }));

    const ApiService = require('../../api/apiService').default;
    const mockGetJson = jest.fn();
    mockGetJson.mockResolvedValue({ message: 'something.like.jwt' });
    ApiService.getJson = mockGetJson;

    jest.mock('jsonwebtoken');
    const mockJwt = require('jsonwebtoken');
    mockJwt.decode.mockReturnValueOnce({ message: 'onetime_message' });
    const mockPostJson = jest.fn();
    mockPostJson.mockResolvedValue({ token: 'token' });

    ApiService.postJson = mockPostJson;

    const loginWithMetaMask = require('../../useCase/metamask/loginUseCase')
      .default;

    // test
    await loginWithMetaMask()(jest.fn());

    // assert
    const {
      updateStatus,
      updateDisableBack,
    } = require('../../module/metamaskLoginModule');
    expect(updateStatus.mock.calls).toEqual([
      [WAITING_SIGN],
      [VERIFYING],
      [SUCCESS],
    ]);
    expect(updateDisableBack).toBeCalledWith(true);
  });
});
