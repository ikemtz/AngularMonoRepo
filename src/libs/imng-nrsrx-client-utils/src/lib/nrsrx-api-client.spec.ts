import { HttpClient } from '@angular/common/http';
import { NrsrxBaseApiClientService } from './nrsrx-api-client';

describe('NrsrxBaseApiClientService', () => {
  it('should post correctly with id', () => {
    const httpClient: HttpClient = { post: jest.fn() } as unknown as HttpClient;
    const apiService = new MockApiService(httpClient);
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    apiService.post(postData);
    expect(httpClient.post).toBeCalledWith(
      `good_times?id=${postData.id}`,
      postData,
    );
  });
  it('post should handle invalid id', () => {
    const httpClient = { post: jest.fn() } as unknown as HttpClient;
    const apiService = new MockApiService(httpClient);
    const postData = { id: null as unknown as string };
    apiService.post(postData);
    expect(httpClient.post).toBeCalledWith(`good_times`, postData);
  });
  it('should put correctly with id', () => {
    const httpClient: HttpClient = { put: jest.fn() } as unknown as HttpClient;
    const apiService = new MockApiService(httpClient);
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    apiService.put(postData);
    expect(httpClient.put).toBeCalledWith(
      `good_times?id=${postData.id}`,
      postData,
    );
  });
  it('should delete correctly with id', () => {
    const httpClient: HttpClient = {
      delete: jest.fn(),
    } as unknown as HttpClient;
    const apiService = new MockApiService(httpClient);
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    apiService.delete(postData);
    expect(httpClient.delete).toBeCalledWith(`good_times?id=${postData.id}`);
  });

  class MockApiService extends NrsrxBaseApiClientService<{ id: string }> {
    public override url = 'good_times';
  }
});
