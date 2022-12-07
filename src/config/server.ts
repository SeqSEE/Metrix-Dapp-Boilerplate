let protocol = process.env.HOST_PROTOCOL;
let host = process.env.HOST_URI;
let port = process.env.NEXT_PUBLIC_HOST_PORT;

const apiUrl =
  host != undefined ? `${protocol}://${host}:${port}/api` : undefined;

export { apiUrl };

const fqdn = process.env.NEXT_PUBLIC_FQDN
  ? process.env.NEXT_PUBLIC_FQDN
  : 'metriverse.exchange';

export { fqdn };
