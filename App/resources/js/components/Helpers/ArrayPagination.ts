import { ResponseListNamesEstimateWallet } from '../../state/StateTypes';

export const createArrayPagination = (
  listData: ResponseListNamesEstimateWallet[]
): number[] => {
  const arrayPagination = [];
  for (let i = 1; i <= Math.ceil(listData.length / 10); i++) {
    arrayPagination.push(i);
  }
  return arrayPagination;
};
