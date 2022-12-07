import { NetworkType } from '../types/NetworkType';
import b58Prefix from './b58Prefix';

const networkPrefix: b58Prefix = {
  MainNet: 0x32,
  TestNet: 0x6e
};

const defNetork: NetworkType = { type: 'None' };

export { networkPrefix, defNetork };
