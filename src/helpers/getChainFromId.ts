export default function getChainFromId(chainId: number) {
  switch (chainId) {
    case 1:
      return 'ETH';
    case 3:
      return 'ETH';
    case 4:
      return 'ETH';
    case 5:
      return 'ETH';
    case 42:
      return 'ETH';
    case 56:
      return 'BSC';
    case 97:
      return 'BSC';
    default:
      return 'UNKNOWN';
  }
}
