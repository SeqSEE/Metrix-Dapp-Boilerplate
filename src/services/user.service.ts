import { NetworkType } from '@metrixcoin/metrilib';
import { extApiUrl } from '@src/config/client';
import { apiUrl } from '@src/config/server';
import { fetchWrapper } from '@src/helpers/FetchWrapper';

export const userService = {
  get,
  getAll,
  create,
  update,
  delete: _delete,
  isAdmin,
  validate
};

const baseUrl = apiUrl !== undefined ? `${apiUrl}/users` : `${extApiUrl}/users`;

function getAll(): Promise<any[]> {
  return fetchWrapper.get(baseUrl);
}

function get(account: string, network: NetworkType): Promise<any> {
  return fetchWrapper.get(`${baseUrl}/${network}/${account}`);
}

function create(params: any): Promise<void> {
  return fetchWrapper.post(baseUrl, params);
}

function update(
  account: string,
  network: NetworkType,
  params: any
): Promise<void> {
  return fetchWrapper.put(`${baseUrl}/${network}/${account}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(account: string, network: NetworkType): Promise<void> {
  return fetchWrapper.delete(`${baseUrl}/${network}/${account}`);
}

function isAdmin(account: string, network: NetworkType): Promise<void> {
  return fetchWrapper.get(`${baseUrl}/${network}/admin/${account}`);
}

function validate(
  account: string,
  network: NetworkType,
  params: {}
): Promise<any> {
  return fetchWrapper.post(`${baseUrl}/${network}/validate/${account}`, params);
}
