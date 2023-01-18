import { randomBytes } from 'crypto';
import { toHexString } from '../../../../../../helpers/Parsers';
import { IncomingHttpHeaders } from 'http';
import { signatureMessage } from '../../../../../../helpers/auth/Jwt';
import { NetworkType } from '@metrixcoin/metrilib';
//import { User } from '../../../../../../../server/models';
//import * as uuid from 'uuid';

export default handler;

function handler(
  req: {
    method: string;
    query: { account: string; network: NetworkType };
    headers: IncomingHttpHeaders;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    body: any;
  },
  res: {
    status: (statusCode: number) => any /* eslint-disable-line */;
    json: () => { nonce: any | undefined };
    end: (message: string) => any /* eslint-disable-line */;
  }
): Promise<void> {
  switch (req.method) {
    case 'GET':
      return validate();
    default:
      return res.status(405).json({
        statusCode: 405,
        message: 'Invalid Request',
        required: 'GET'
      });
  }

  async function validate() {
    try {
      //console.log(`validate: ${JSON.stringify(req.query)}`);
      const account: string = (req.query.account as string).toLowerCase();
      const network: NetworkType = req.query.network;
      const regex = /^0x[a-fA-F0-9]{40}$/;
      if (!account.match(regex)) {
        return res.status(412).json({
          statusCode: 412,
          message: 'Signature Invalid Address'
        });
      }

      const nonce: string = '0x' + toHexString(randomBytes(16));
      const message: string = signatureMessage + nonce;
      //console.log(message);

      /*let user: User | null = null;
      if (chain == 'ETH') {
        user = await User.findOne({
          where: { address_eth: account }
        });
        if (user === null) {
          user = await User.findOne({
            where: { address_bsc: account }
          });
          if (user != null) {
            await user.update({ address_eth: account });
          }
        }
      } else if (chain == 'BSC') {
        user = await User.findOne({
          where: { address_bsc: account }
        });
        if (user === null) {
          user = await User.findOne({
            where: { address_eth: account }
          });
          if (user != null) {
            await user.update({ address_bsc: account });
          }
        }
      }*/

      /*if (user === null) {
        const uid: string = uuid.v4();
        user = await User.create({
          uuid: uid,
          address_bsc: account,
          address_eth: account,
          chain
        } as User);
      }

      if (user != null) {
        await user.update({ nonce, chain });
      }*/

      res.status(200).json({ statusCode: 200, message: message });
    } catch (/* eslint-disable @typescript-eslint/no-explicit-any */ err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
