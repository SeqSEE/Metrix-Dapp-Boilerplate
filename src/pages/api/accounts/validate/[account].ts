import IAccount from '@src/db/IAccount';
import { getUser } from '@src/db/UserManager';
import { parseCookiesHeader } from '@src/helpers/auth/Cookie';
import { createToken, verifyToken } from '@src/helpers/auth/Jwt';
import { IncomingHttpHeaders } from 'http';

export default handler;

async function handler(
  req: {
    method: string;
    query: { account: string };
    headers: IncomingHttpHeaders;
    body: { data: { coin: string; txid: string; confirms: number } };
  },
  res: {
    status: (statusCode: number) => any /* eslint-disable-line */;
    json: () => { user: IAccount | undefined };
    end: (message: string) => any /* eslint-disable-line */;
  }
): Promise<void> {
  switch (req.method) {
    case 'POST':
      return await doVerification();
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

  async function doVerification() {
    const validation = userValidate(false);
    if (!validation) {
      return unauthorized();
    }
    if (req.query.account !== (validation as any).usr) {
      return res.status(403).end(`Method ${req.method} Query Forbidden`);
    }
    try {
      const complete = (token: string) => {
        /* Send succes with token */
        return res.status(200).json({
          statusCode: 200,
          success: true,
          token
        });
      };
      //const user = users.getByAccount(req.query.account, req.query.chain);
      const user = await getUser(req.query.account);
      if (user === undefined) {
        return res.status(404).end(`Method ${req.method} Query User Not Found`);
      }
      const isAdmin = user.isAdmin !== undefined ? user.isAdmin : false;

      const token_jwt: string = createToken(
        `${user.id}`,
        (validation as any).usr,
        isAdmin
      );

      /*updateUser(user.account, req.query.chain, {
        token: token_jwt,
        isAdmin: isAdmin
      } as IUser);*/

      return await complete(token_jwt);
    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
    return res.status(406).end(`Method ${req.method} Query Not Acceptable`);
  }
}
