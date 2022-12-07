import { fqdn } from '@src/config/confServer';
import { fetchWrapper } from '@src/helpers/FetchWrapper';
import InteractResponse from '@src/interfaces/InteractResponse';
import { ethers } from 'ethers';

const getABI = async (contract: string) => {
  let abi: any[] = [];
  const version = process.env.NEXT_PUBLIC_APP_VERSION as string;
  try {
    abi = JSON.parse(
      JSON.stringify(await import(`../abi/${version}/${contract}`))
    )[contract];
  } catch (e) {
    console.log(e);
  }
  return abi;
};

const getABIloc = async (contract: 'MRC20' | string) => {
  let abi: any[] = [];
  try {
    abi = JSON.parse(JSON.stringify(await import(`../abi/token/${contract}`)))[
      contract
    ];
  } catch (e) {
    console.log(e);
  }
  return abi;
};

const AddressZero = ethers.constants.AddressZero.replace('0x', '');

const HashZero = ethers.constants.HashZero.replace('0x', '');

let f = '';
for (var i = 0; i < 64; i++) {
  f += 'f';
}
const HashMax = f;

const callContractAPI = async (
  contract: string,
  method: string,
  data: string[],
  abi: any[]
) => {
  const iface = new ethers.utils.Interface(abi);
  const encoded = iface.encodeFunctionData(method, data).replace('0x', '');
  try {
    const response = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `${
              process.env.NEXT_PUBLIC_EXPLORER_URI
            }/api/contract/${contract.toLowerCase()}/call?data=${encoded}`
          )
        ).json()
      )
    );

    if (response && response.executionResult) {
      const output = response.executionResult.output;
      const decoded = iface.decodeFunctionResult(method, `0x${output}`);
      return decoded;
    } else {
      // failed to get a response
      console.log('response failed');
    }
  } catch (e) {
    console.log('error!!!');
    console.log(e);
  }
  return undefined;
};

/**
 * Read only call to contract
 *
 * @param contract
 * @param method
 * @param data
 * @param abi
 * @returns response result
 */
const callContract = async (
  contract: string,
  method: string,
  data: string[],
  abi: any[]
): Promise<any> => {
  if (window) {
    const iface = new ethers.utils.Interface(abi);
    const encoded = iface.encodeFunctionData(method, data).replace('0x', '');
    try {
      const result = (window as any).metrimask.rpcProvider.rawCall(
        'callcontract',
        [contract.toLowerCase(), encoded]
      );
      const response = (await result).executionResult.output;
      const decoded: ethers.utils.Result = iface.decodeFunctionResult(
        method,
        `0x${response}`
      );
      return decoded;
    } catch (e) {
      console.log('error!!!');
      console.log(e);
    }
  }

  return undefined;
};

const callContractRPC = async (
  contract: string,
  method: string,
  data: string[],
  abi: any[]
) => {
  const iface = new ethers.utils.Interface(abi);
  const encoded = iface.encodeFunctionData(method, data).replace('0x', '');
  //console.log(`method ${method}`);
  //console.log(`data ${data}`);
  //console.log(`encoded ${encoded}`);
  try {
    const command = '*';
    const content = encoded;
    let s = `http://localhost:${process.env.NEXT_PUBLIC_HOST_PORT}/api/contract/call`;
    if (typeof window !== 'undefined') {
      s = '/api/contract/call';
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(`callContractRPC: ${s}`);
    }
    const result = await fetchWrapper.post(s, {
      command,
      contract,
      method,
      content
    });
    if (result && !result.error) {
      const response = result.data.replace('0x', '');
      const decoded: ethers.utils.Result = iface.decodeFunctionResult(
        method,
        `0x${response}`
      );
      return decoded;
    } else if (result && result.error) {
      return result.error;
    }
  } catch (e) {
    console.log('error!!!');
    console.log(e);
  }

  return undefined;
};

/**
 * Write call to contract
 *
 * @param contract
 * @param method
 * @param data
 * @param value
 * @param gasLimit
 * @param gasPrice
 * @param abi
 * @returns response result
 */
const sendToContract = async (
  contract: string,
  method: string,
  data: any[],
  value: string = '0',
  gasLimit: number = 250000,
  gasPrice: number = 5000,
  abi: any[]
): Promise<InteractResponse> => {
  const iface = new ethers.utils.Interface(abi);
  const encoded = iface.encodeFunctionData(method, data).replace('0x', '');
  try {
    const result = await (window as any).metrimask.rpcProvider.rawCall(
      'sendtocontract',
      [contract.toLowerCase(), encoded, value, gasLimit, gasPrice]
    );
    //console.log(result);
    if (result.message) {
      return { result: HashZero, error: result.message };
    }
    const r = result.txid ? result.txid : HashZero;
    return { result: r, error: result.txid ? '' : 'error!' };
  } catch (e: any) {
    console.log('error!!!');
    console.log(e);
    return { result: HashZero, error: e.toString() };
  }
};

const signMessage = async (message: string): Promise<InteractResponse> => {
  try {
    let address = await (window as any).metrimask.account.address;
    const result = await (window as any).metrimask.rpcProvider.signMessage([
      fqdn,
      message,
      true
    ]);
    //console.log(result);
    return { result: { message, signature: result, address } };
  } catch (e: any) {
    console.log('error!!!');
    console.log(e);
    return { error: e.toString() };
  }
};

const getContractAddress = (
  network: string,
  contract: 'MetriVersePlatform' | 'SimpleAuction' | string
) => {
  const ContractAddresses = require(`/networks/${process.env.NEXT_PUBLIC_APP_VERSION}/${network}.json`);
  const address = ContractAddresses[contract];
  return address ? address : AddressZero;
};

const getContractAddressLocal = (contract: 'MRC20' | 'MRC721' | string) => {
  const network = process.env.NEXT_PUBLIC_APP_NETWORK as string;
  //const ContractAddresses = require(`/networks/token/${network}.json`);
  const address = ''; // ContractAddresses[contract];
  return address ? address : AddressZero;
};

/**
 * Check if input hash is uint256 Zero.
 *
 * @param test
 * @returns
 */
const isHashZero = (test: string) => {
  return test == ethers.constants.HashZero || test == HashZero;
};

/**
 * Check if input address is address Zero.
 *
 * @param test
 * @returns
 */
const isAddressZero = (test: string) => {
  return test == ethers.constants.AddressZero || test == AddressZero;
};

export {
  getABI,
  getABIloc,
  getContractAddress,
  callContract,
  callContractAPI,
  callContractRPC,
  sendToContract,
  signMessage,
  HashZero,
  HashMax,
  AddressZero,
  isHashZero,
  isAddressZero
};
