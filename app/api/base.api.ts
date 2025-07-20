import axiosInstance from './axiosInstance';

export type QueryParams = {
  [key: string]: string | number | boolean | undefined;
};

export default class BaseApi {
  protected async getAsync<T>(
    endPoint: string,
    queryParams?: QueryParams,
  ): Promise<T> {
    return this.executeAsync<T>('GET', endPoint, queryParams);
  }

  protected async postAsync<T>(
    endPoint: string,
    queryParams?: QueryParams,
    data?: unknown,
  ): Promise<T> {
    return this.executeAsync<T>('POST', endPoint, queryParams, data);
  }

  protected async putAsync<T>(
    endPoint: string,
    queryParams?: QueryParams,
    data?: unknown,
  ): Promise<T> {
    return this.executeAsync<T>('PUT', endPoint, queryParams, data);
  }

  protected async patchAsync<T>(
    endPoint: string,
    queryParams?: QueryParams,
    data?: unknown,
  ): Promise<T> {
    return this.executeAsync<T>('PATCH', endPoint, queryParams, data);
  }

  protected async deleteAsync<T>(
    endPoint: string,
    queryParams?: QueryParams,
    data?: unknown,
  ): Promise<T> {
    return this.executeAsync<T>('DELETE', endPoint, queryParams, data);
  }

  private async executeAsync<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endPoint: string,
    params?: QueryParams,
    data?: unknown,
  ): Promise<T> {
    const response = await axiosInstance.request<T>({
      method,
      url: endPoint,
      params,
      data,
      timeout: 45000,
    });

    return response.data;
  }
}
