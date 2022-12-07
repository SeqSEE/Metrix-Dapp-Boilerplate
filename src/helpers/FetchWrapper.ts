export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

async function get(url: RequestInfo) {
  const requestOptions = {
    method: 'GET'
  };
  const response = await fetch(url, requestOptions);
  if (process.env.NODE_ENV != 'production')
    console.log(`get(${url}) ${JSON.stringify(response)}`);
  return handleResponse(response);
}

async function post(url: RequestInfo, body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  const response = await fetch(url, requestOptions);
  if (process.env.NODE_ENV != 'production')
    console.log(`post(${url}) ${JSON.stringify(response)}`);
  return handleResponse(response);
}

async function put(url: RequestInfo, body: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  const response = await fetch(url, requestOptions);
  if (process.env.NODE_ENV != 'production')
    console.log(`put(${url}) ${JSON.stringify(response)}`);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: RequestInfo) {
  const requestOptions = {
    method: 'DELETE'
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// helper functions

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = !!text && JSON.parse(text);
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
