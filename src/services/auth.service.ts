import { NetworkType } from '@metrixcoin/metrilib';
import { extApiUrl } from '@src/config/client';
import { apiUrl } from '@src/config/server';
import { fetchWrapper } from '@src/helpers/FetchWrapper';

export const authService = {
  fetchNonce,
  verifyMessage,
  validateTokenETH,
  validateTokenMRX
};

const baseUrl = apiUrl != undefined ? `${apiUrl}/auth` : `${extApiUrl}/auth`;
const baseUrl2 = apiUrl != undefined ? `${apiUrl}/auth2` : `${extApiUrl}/auth2`;

function fetchNonce(account: string, network: NetworkType): Promise<any> {
  return fetchWrapper.get(`${baseUrl}/signature/${network}/${account}`);
}

function verifyMessage(params: {
  signature: string;
  account: string;
  network: NetworkType;
}): Promise<any> {
  return fetchWrapper.post(`${baseUrl}/signature/${params.network}`, params);
}

async function validateTokenETH(params: { cookie: string }): Promise<any> {
  return await fetchWrapper.post(`${baseUrl}/token`, params);
}

async function validateTokenMRX(params: { cookie: string }): Promise<any> {
  return await fetchWrapper.post(`${baseUrl2}/signature/validate`, params);
}
