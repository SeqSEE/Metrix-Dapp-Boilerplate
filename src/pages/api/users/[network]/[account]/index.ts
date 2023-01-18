import { NetworkType } from '@metrixcoin/metrilib';
import { getUser, userDelete, userUpdate } from '@src/utils/db/UserManager';
import { IncomingHttpHeaders } from 'http';
import { parseCookiesHeader } from '../../../../../helpers/auth/Cookie';
import { jwtPayload, verifyToken } from '../../../../../helpers/auth/Jwt';

export default handler;

function handler(
  req: {
    method: string;
    query: { account: string; network: NetworkType };
    headers: IncomingHttpHeaders;
    body: any;
  },
  res: {
    status: (statusCode: number) => any /* eslint-disable-line */;
    json: () => { user: any | undefined };
    end: (message: string) => any /* eslint-disable-line */;
  }
): Promise<void> {
  switch (req.method) {
    case 'GET':
      return getUserByAccount();
    case 'PUT':
      return updateUser();
    case 'DELETE':
      return deleteUser();
    default:
      return res
        .status(200)
        .json({ error: true, message: `Method ${req.method} Unauthorized` });
  }

  function unauthorized() {
    return res
      .status(200)
      .json({ error: true, message: `Method ${req.method} Unauthorized` });
  }

  function userValidate(requireAdmin: boolean): jwtPayload | boolean {
    const cookies = parseCookiesHeader(req.headers);
    if (req.headers.host?.split(':')[0] === 'localhost') {
      return true;
    }
    const cookie = cookies['aer-site-user'];
    if (cookie === undefined) {
      return false;
    }
    //console.log('userValidate');
    const token = verifyToken(cookie);
    if (!token) {
      return false;
    }
    //console.log(token.usr);
    if (
      (req.query.account !== token.usr || req.query.network !== token.net) &&
      !token.adm
    ) {
      return false;
    }
    if (requireAdmin && !token.adm) {
      return false;
    }
    return token;
  }

  async function getUserByAccount() {
    const validation = userValidate(false);
    if (!validation) {
      return unauthorized();
    }
    //const user = users.getByAccount(req.query.account, req.query.chain);
    const user = await getUser(req.query.account);
    //console.log('getUserByAccount');
    if (user !== undefined) {
      if (req.headers.host?.split(':')[0] == 'localhost') {
        return res.status(200).json(user);
      }
      if (
        (user.account !== (validation as jwtPayload).usr ||
          user.chain !== (validation as jwtPayload).net) &&
        !(validation as jwtPayload).adm
      ) {
        return unauthorized();
      }
      return res.status(200).json(user);
    } else {
      return res.status(405).json({ message: 'user invalid' });
    }
  }

  function updateUser() {
    try {
      const validation = userValidate(true);
      if (!validation) {
        return unauthorized();
      }
      userUpdate(req.query.account, req.body);
      return res.status(200).json({ message: 'user updated' });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function deleteUser() {
    const validation = userValidate(true);
    if (!validation) {
      return unauthorized();
    }
    userDelete(req.query.account);
    return res.status(200).json({ message: 'user deleted' });
  }
}
