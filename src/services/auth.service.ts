import { extApiUrl } from '@src/config/confClient';
import { apiUrl } from '@src/config/confServer';
import { fetchWrapper } from '@src/helpers/FetchWrapper';

export const authService = {
  fetchNonce,
  verifyMessage,
  validateTokenETH,
  validateTokenMRX
};

const baseUrl = apiUrl != undefined ? `${apiUrl}/auth` : `${extApiUrl}/auth`;
const baseUrl2 = apiUrl != undefined ? `${apiUrl}/auth2` : `${extApiUrl}/auth2`;

function fetchNonce(account: string, chain: 'BSC' | 'ETH'): Promise<any> {
  return fetchWrapper.get(`${baseUrl}/signature/${chain}/${account}`);
}

function verifyMessage(params: {
  signature: string;
  account: string;
  chain: 'BSC' | 'ETH';
}): Promise<any> {
  return fetchWrapper.post(`${baseUrl}/signature/${params.chain}`, params);
}

async function validateTokenETH(params: { cookie: string }): Promise<any> {
  return await fetchWrapper.post(`${baseUrl}/token`, params);
}

async function validateTokenMRX(params: { cookie: string }): Promise<any> {
  return await fetchWrapper.post(`${baseUrl2}/signature/validate`, params);
}
