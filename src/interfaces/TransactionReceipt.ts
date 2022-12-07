export default interface TransactionReceipt {
  id: string;
  hash: string;
  version: number;
  lockTime: number;
  inputs: {
    prevTxId: string;
    outputIndex: 1;
    value: string;
    address: string;
    scriptSig: {
      type: string;
      hex: string;
      asm: string;
    };
    sequence: number;
  }[];
  outputs: {
    value: string;
    address: string;
    addressHex?: string;
    scriptPubKey: {
      type: string;
      hex: string;
      asm: string;
    };
    receipt?: {
      sender: string;
      gasUsed: number;
      contractAddress: string;
      contractAddressHex: string;
      excepted: string;
      exceptedMessage: string;
      logs: any[];
    };
  }[];
  isCoinbase: boolean;
  isCoinstake: boolean;
  blockHeight: number;
  confirmations: number;
  timestamp?: number;
  inputValue: string;
  outputValue: string;
  refundValue: string;
  fees: string;
  size: number;
  weight: number;
  contractSpends?: any[];
  mrc20TokenTransfers?: [
    {
      address: string;
      addressHex: string;
      name: string;
      symbol: string;
      decimals: number;
      from: string;
      to: string;
      value: string;
    }
  ];
  mrc721TokenTransfers?: [
    {
      address: string;
      addressHex: string;
      name: string;
      symbol: string;
      from: string;
      to: string;
      toHex: string;
      tokenId: string;
    }
  ];
}
