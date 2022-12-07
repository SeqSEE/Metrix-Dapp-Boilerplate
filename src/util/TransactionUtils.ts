import TransactionReceipt from '../interfaces/TransactionReceipt';

export const TransactionHashRegex = /^(0x)?([A-Fa-f0-9]{64})$/;

export const getTransactionReceipt = async (
  txid: string
): Promise<TransactionReceipt | undefined> => {
  let receipt: TransactionReceipt | undefined;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXPLORER_URI}/api/tx/${txid}`
    );
    if (response.status === 200) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        receipt = JSON.parse(JSON.stringify(await response.json()));
      }
    }
  } catch (e) {
    console.log(e);
  }

  return receipt;
};

export const waitForConfirm = async (txid: string) => {
  const checkConfirm = async () => {
    const receipt = await getTransactionReceipt(txid);
    return receipt;
  };
  const confirmed = await checkConfirm();
  if (confirmed && confirmed.confirmations > 0) {
    return confirmed;
  } else {
    let receipt;
    for (let i = 0; i < 5; i++) {
      receipt = await checkConfirm();
      if (!receipt) {
        await new Promise((resolve) => setTimeout(resolve, 60000));
      } else {
        if (receipt.confirmations > 0) {
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 60000));
        }
      }
    }
    if (receipt) {
      return receipt;
    }
  }
  return undefined;
};
