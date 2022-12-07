import { NextApiRequest, NextApiResponse } from 'next';
import { jwtPayload, verifyToken } from '../../../../helpers/auth/Jwt';

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> =
  async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (_req.method != 'POST') {
        return res.status(405).json({
          statusCode: 405,
          message: 'Invalid Request',
          required: 'POST'
        });
      }

      const token: jwtPayload | undefined = verifyToken(_req.body.cookie);
      //console.log(token);

      if (token !== undefined) {
        res.status(200).json({
          statusCode: 200,
          message: 'success',
          user: token.usr,
          chain: token.chn
        });
      } else {
        res
          .status(500)
          .json({ statusCode: 500, message: 'token is not defined' });
      }
    } catch (/* eslint-disable @typescript-eslint/no-explicit-any */ err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  };

export default handler;
