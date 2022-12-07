export default function getNetworkFromId(chainId: number) {
  switch (chainId) {
    case 1:
      return 'ETH-MAINNET';

    case 3:
      return 'ETH-ROPSTEN';

    case 4:
      return 'ETH-RINKEBY';

    case 5:
      return 'ETH-GOERLI';

    case 42:
      return 'ETH-KOVAN';

    case 56:
      return 'BSC-MAINNET';

    case 97:
      return 'BSC-TESTNET';

    default:
      return 'UNKNOWN';
  }
}
