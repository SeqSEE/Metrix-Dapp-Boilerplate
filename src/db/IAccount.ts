export default interface IAccount {
  id: number;
  isAdmin: boolean;
  mrx: string | null;
  nonce: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
