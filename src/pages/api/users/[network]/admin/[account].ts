import IUser from '@src/interfaces/User';
import { getUser } from '@src/utils/db/UserManager';
import { IncomingHttpHeaders } from 'http';
import { parseCookiesHeader } from '../../../../../helpers/auth/Cookie';
import { verifyToken } from '../../../../../helpers/auth/Jwt';

export default handler;

function handler(
  req: {
    method: string;
    query: { account: string };
    headers: IncomingHttpHeaders;
    body: IUser;
  },
  res: {
    status: (statusCode: number) => any /* eslint-disable-line */;
    json: () => { user: IUser | undefined };
    end: (message: string) => any /* eslint-disable-line */;
  }
): Promise<void> {
  switch (req.method) {
    case 'GET':
      return isAdmin();
    default:
      return res.status(404).end(`Method ${req.method} Not Allowed`);
  }

  function unauthorized() {
    return res
      .status(200)
      .json({ error: true, message: `Method ${req.method} Unauthorized` });
  }

  function userValidate(requireAdmin: boolean) {
    if (req.headers.host?.split(':')[0] === 'localhost') {
      return true;
    }
    const cookies = parseCookiesHeader(req.headers);
    const cookie = cookies['aer-site-user'];
    if (cookie === undefined) {
      return false;
    }
    const token = verifyToken(cookie);
    if (!token) {
      return false;
    }
    if (requireAdmin && !token.adm) {
      return false;
    }
    return token;
  }

  async function isAdmin() {
    const validation = userValidate(false);
    if (!validation) {
      return unauthorized();
    }
    if (req.query.account !== (validation as any).usr) {
      return res.status(403).end(`Method ${req.method} Query Forbidden`);
    }
    const user = await getUser(req.query.account);
    if (user) {
      const _isAdmin = user?.isAdmin;
      if (_isAdmin === undefined) {
        return res.status(406).end(`Method ${req.method} Query Not Acceptable`);
      }

      return res.status(200).json(_isAdmin);
    }
    return res.status(404).end(`Method ${req.method} Query Not Found`);
  }
}
