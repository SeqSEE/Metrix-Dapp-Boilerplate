import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { createToken, signatureMessage } from '../../../../helpers/auth/Jwt';
//import { User } from '../../../../../../server/models';

const handler: (
  _req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> = async (_req: NextApiRequest, res: NextApiResponse) => {
  const complete = (token: string) => {
    /* Send succes with token */
    return res.status(200).json({
      statusCode: 200,
      success: true,
      token
    });
  };

  try {
    if (_req.method !== 'POST') {
      return res.status(405).json({
        statusCode: 405,
        message: 'Invalid Request',
        required: 'POST'
      });
    }

    const resp = _req.body;
    const chain = resp.chain;
    const account = (resp.account as string).toLowerCase();
    const signature = resp.signature;

    console.log(`chain ${chain} account ${account}`);

    /*let user: User | null = null;
      if (chain == 'ETH') {
        user = await User.findOne({ where: { address_eth: account } });
        console.log(`user ${JSON.stringify(user)}`);
      } else if (chain == 'BSC') {
        user = await User.findOne({ where: { address_bsc: account } });
        console.log(`user ${JSON.stringify(user)}`);
      }

      if (user === null) {
        return res.status(404).json({
          statusCode: 404,
          message: 'User lookup found nothing'
        });
      }

      user = user.get();*/

    // TODO: setup user...
    const user = { nonce: '', uuid: '' };

    const message = `${signatureMessage}${user.nonce}`;
    console.log(message);
    const verified = ethers.utils
      .verifyMessage(message, signature)
      .toLowerCase();
    console.log(verified);

    if (verified === account) {
      const token_jwt: string = createToken(user.uuid, verified, false);
      console.log(token_jwt);

      /*await User.update(
          {
            isLogin: true,
            nonce: ''
          },
          { where: { address_eth: account, chain } }
        );*/

      return complete(token_jwt);
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: 'User lookup found nothing.'
      });
    }
  } catch (/* eslint-disable @typescript-eslint/no-explicit-any */ err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
