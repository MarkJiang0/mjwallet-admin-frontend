import { request } from "umi";

/** Query user list GET /api/v1/users */
export async function fetchAccounts(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Account[]>>('/api/v1/accounts', {
    method: 'GET',
    
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

export async function fetchCurrentUserAccounts(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Account[]>>('/api/v1/accounts/current', {
    method: 'GET',
    
    params: {
      current: '1',
      pageSize: '100',
    },
    ...(options || {}),
  });
}

export async function getAccountByAddress(address: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Account>>(`/api/v1/accounts/get-account-by-address` , {
    method: 'GET',
    params: {
      address
    },
    ...(options || {}),
  });
}

export async function createAccount(name: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Account[]>>('/api/v1/accounts', {
    method: 'POST',
    
    params: {
      name
    },
    ...(options || {}),
  });
}

export async function changeDefaultAccount(address: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Account[]>>('/api/v1/accounts/change-default', {
    method: 'PUT',
    params: {
      address
    },
    ...(options || {}),
  });
}


export async function transaction(trans: API.Transaction, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Transaction[]>>('/api/v1/transactions', {
    method: 'POST',
    
    data: {
      ...trans
    },
    ...(options || {}),
  });
}
