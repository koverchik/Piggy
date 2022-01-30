export type ResponseListNamesEstimateWallet = {
  name: string;
  id: number;
};

export type RowEstimate = {
  amount: number;
  id: number;
  name: string;
};

export type DebitCreditTableType = {
  user_id: number;
  name: string;
  debit: number;
  credit: number;
};
