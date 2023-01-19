import { NextApiRequest, NextApiResponse } from 'next';
import { signatureMessage } from '@src/helpers/auth/Jwt';
//import { User } from '@server/models';
import { toHexString } from '@src/helpers/Parsers';
import { randomBytes } from 'crypto';
import { AddressRegex, HexAddressRegex } from '@src/util/AddressUtils';

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
    if (_req.method !== 'GET') {
      return res.status(405).json({
        statusCode: 405,
        message: 'Invalid Request',
        required: 'GET'
      });
    }

    const address = _req.query.address as string;
    console.log(address);

    if (!address.match(HexAddressRegex)) {
      return res.status(412).json({
        statusCode: 412,
        message: 'Signature Invalid Address'
      });
    }

    const nonce: string = '0x' + toHexString(randomBytes(16));
    const message: string = signatureMessage + nonce;

    /*let user: User | null = null;
      user = await User.findOne({
        where: { address_mrx: address }
      });

      if (user === null) {
        const uid: string = uuid.v4();
        user = await User.create({
          uuid: uid,
          address_mrx: address,
          chain: 'MRX',
          nonce
        } as User);
      } else {
        await user.update({ nonce, chain: 'MRX' });
      }*/

    return complete(message);
  } catch (/* eslint-disable @typescript-eslint/no-explicit-any */ err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
