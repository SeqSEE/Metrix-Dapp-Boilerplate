export const toHexString: (byteArray: Uint8Array) => string = (
  byteArray: Uint8Array
) => {
  return Array.from(byteArray, function (byte: any) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};
