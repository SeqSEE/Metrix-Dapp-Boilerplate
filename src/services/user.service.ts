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

function get(account: String): Promise<any> {
  return fetchWrapper.get(`${baseUrl}/${account}`);
}

function create(params: any): Promise<void> {
  return fetchWrapper.post(baseUrl, params);
}

function update(account: string, params: any): Promise<void> {
  return fetchWrapper.put(`${baseUrl}/${account}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(account: string): Promise<void> {
  return fetchWrapper.delete(`${baseUrl}/${account}`);
}

function isAdmin(account: string): Promise<void> {
  return fetchWrapper.get(`${baseUrl}/admin/${account}`);
}

function validate(account: string, params: {}): Promise<any> {
  return fetchWrapper.post(`${baseUrl}/validate/${account}`, params);
}
