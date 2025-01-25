export type RequestConfig<TData = unknown> = {
  baseURL?: string;
  url?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Object;
  data?: TData | FormData;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer' | 'document' | 'stream';
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export type ResponseConfig<TData = unknown, TError = unknown> = [TError, null] | [ null, TData];

export const httpClientFetch = async <TData, TError = unknown, TVariables = unknown>(config: RequestConfig<TVariables>): Promise<ResponseConfig> => {
  const response = await fetch(`${config.baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body: config.data ? JSON.stringify(config.data) : undefined,
    signal: config.signal,
    headers: config.headers ? { 'Content-Type': 'application/json', ...config.headers } : { 'Content-Type': 'application/json' },
  })

  const data = await response.json();

  if (!response.ok) {
    return [data, null];
  }

  return [null, data];
}

export default httpClientFetch;
