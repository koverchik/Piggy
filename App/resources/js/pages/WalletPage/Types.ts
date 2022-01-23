export type AuthorType = {
  created_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  two_factor_recovery_codes: null;
  two_factor_secret: null;
  updated_at: string;
};

export type WalletRowType = {
  amount: number;
  autor: AuthorType;
  id: number;
  name: string;
  user_id: number;
};
export type AllDataWalletType = {
  rows: WalletRowType[];
};
