import { request } from "umi";

export async function queryTransactions(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Transaction[]>>('/api/v1/transactions', {
    method: 'GET',
    
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}