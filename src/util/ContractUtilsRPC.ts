import { sendCall } from '@worker/index';

const callRPC = async (contract: string, method: string, content: string) => {
  try {
    //console.log(`${contract} ${method} ${content}`);
    const result = sendCall(
      { group: 'cmd' },
      'contract_raw',
      contract,
      method,
      '',
      content
    );

    return await result;
  } catch (e) {
    console.log('rpc error!!!');
    console.log(e);
  }

  return undefined;
};

export { callRPC };
