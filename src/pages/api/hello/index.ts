import { NextApiRequest, NextApiResponse } from 'next';

const handler: (_req: NextApiRequest, res: NextApiResponse) => Promise<void> =
  async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data = JSON.stringify('Hello World!');
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  };

export default handler;
