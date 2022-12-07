import { NetworkType } from '../types/NetworkType';

export default interface NetworkProps {
  address: string;
  connect: boolean;
  onNetworkChanged: (
    address: string,
    network: NetworkType,
    connect: boolean
  ) => void;
  children?: JSX.Element | JSX.Element[];
}
