import { extApiUrl } from '@src/config/client';
import { apiUrl } from '@src/config/server';
import { fetchWrapper } from '@src/helpers/FetchWrapper';

export const authService = {
  fetchNonce,
  verifyMessage,
  validateTokenMRX
};

const baseUrl = apiUrl != undefined ? `${apiUrl}/auth` : `${extApiUrl}/auth`;

function fetchNonce(account: string): Promise<any> {
  return fetchWrapper.get(`${baseUrl}/signature/${account}`);
}

function verifyMessage(params: {
  signature: string;
  account: string;
}): Promise<any> {
  return fetchWrapper.post(`${baseUrl}/signature/`, params);
}

async function validateTokenMRX(params: { cookie: string }): Promise<any> {
  return await fetchWrapper.post(`${baseUrl}/signature/validate`, params);
}
