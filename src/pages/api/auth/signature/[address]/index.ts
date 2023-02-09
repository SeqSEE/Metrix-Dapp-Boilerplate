import { NextApiRequest, NextApiResponse } from 'next';
import { signatureMessage } from '@src/helpers/auth/Jwt';
import { toHexString } from '@src/helpers/Parsers';
import { randomBytes } from 'crypto';
import { Account } from '@server/db/models/account';
import { HexAddressRegex } from '@src/util/AddressUtils';

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

    let user: Account | null = null;
    user = await Account.findOne({
      where: { mrx: address }
    });

    if (user === null) {
      user = await Account.create({
        mrx: address,
        nonce,
        isAdmin: false
      } as Account);
    } else {
      await user.update({ nonce });
    }

    return complete(message);
  } catch (/* eslint-disable @typescript-eslint/no-explicit-any */ err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
