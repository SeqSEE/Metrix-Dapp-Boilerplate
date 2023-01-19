import { Account } from '@server/db';
import IAccount from './IAccount';

export async function getUser(address: string): Promise<IAccount | undefined> {
  const _user: Account | null = await Account.findOne({
    where: { mrx: address }
  });
  if (_user != null) {
    const u = _user.get();
    const user: IAccount = {
      id: u.id,
      isAdmin: u.isAdmin,
      mrx: u.mrx,
      nonce: u.nonce,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    };
    return user;
  }
  return undefined;
}

export async function userDelete(address: string) {
  const _user: Account | null = await Account.findOne({
    where: { mrx: address }
  });
  if (_user != null) {
    _user.destroy();
  }
}

// what does this do?
export async function userUpdate(address: string, data: IAccount) {
  const _user: Account | null = await Account.findOne({
    where: { mrx: address }
  });
  if (_user != null) {
    //_user.
    const u = _user.get();
    let account = '';
    const user: IAccount = {
      id: u.id,
      isAdmin: u.isAdmin,
      mrx: u.mrx,
      nonce: u.nonce,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    };
    return user;
  }
  return undefined;
}
