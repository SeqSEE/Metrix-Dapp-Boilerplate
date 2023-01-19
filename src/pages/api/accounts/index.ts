import { NetworkType } from '@metrixcoin/metrilib';
import { Account } from '@server/db/models';
import { IncomingHttpHeaders } from 'http';
import { parseCookiesHeader } from '../../../../helpers/auth/Cookie';
import { verifyToken } from '../../../../helpers/auth/Jwt';

export default handler;

function handler(
  req: {
    method: string;
    query: any;
    body: any;
    headers: IncomingHttpHeaders;
  },
  res: {
    status: (statusCode: number) => any /* eslint-disable-line */;
    json: () => { user: any | undefined };
    end: (message: string) => any /* eslint-disable-line */;
  }
): Promise<void> {
  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUser();
    default:
      return res
        .status(200)
        .json({ error: true, message: `Method ${req.method} Unauthorized` });
  }

  function userValidate(requireAdmin: boolean) {
    const cookies = parseCookiesHeader(req.headers);
    const cookie = cookies['aer-site-user'];
    if (cookie === undefined) {
      return res
        .status(200)
        .json({ error: true, message: `Method ${req.method} Unauthorized` });
    }
    const token = verifyToken(cookie);
    if (!token) {
      return res
        .status(200)
        .json({ error: true, message: `Method ${req.method} Unauthorized` });
    }
    if (requireAdmin && !token.adm) {
      return res
        .status(200)
        .json({ error: true, message: `Method ${req.method} Unauthorized` });
    }
  }

  function getUsers() {
    const validation = userValidate(true);
    if (validation !== undefined) {
      return validation;
    }
    const _users = Account.findAll();
    return res.status(200).json(_users);
  }

  function createUser() {
    try {
      const validation = userValidate(true);
      if (validation !== undefined) {
        return validation;
      }
      const account = Account.create({
        mrx: req.body.address
      });
      return res.status(200).json({ account });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
