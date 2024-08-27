import { request } from "umi";

export async function queryBots(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Bot[]>>('/api/v1/bots', {
    method: 'GET',
    
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

export async function createBot(bot: API.Bot, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Bot>>('/api/v1/bots', {
    method: 'POST',
    
    data: {
      ...bot
    },
    ...(options || {}),
  });
}