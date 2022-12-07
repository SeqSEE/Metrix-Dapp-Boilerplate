import { apiUrl } from './confServer';

let extApiUrl = undefined;
if (typeof window !== 'undefined') {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const hostport = window.location.port;
  extApiUrl = `${protocol}//${hostname}:${hostport}/api`;
} else {
  extApiUrl = apiUrl;
}
const baseUrl = `${extApiUrl}`;

export { baseUrl as extApiUrl };
