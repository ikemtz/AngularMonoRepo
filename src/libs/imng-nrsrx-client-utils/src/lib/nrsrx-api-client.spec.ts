import { HttpClient } from '@angular/common/http';
import { NrsrxBaseApiClientService } from './nrsrx-api-client';

describe('NrsrxBaseApiClientService', () => {

  it('should post correctly with id', () => {
    const httpClient: HttpClient = { post: jest.fn() } as any;
    const apiService = new MockApiService(httpClient);
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    apiService.post(postData);
    expect(httpClient.post).toBeCalledWith(`good_times?id=${postData.id}`, postData);
  });
  it('post should handle invalid id', () => {
    const httpClient: HttpClient = { post: jest.fn() } as any;
    const apiService = new MockApiService(httpClient);
    const postData = { id: null };
    apiService.post(postData);
    expect(httpClient.post).toBeCalledWith(`good_times`, postData);
  });

  class MockApiService extends NrsrxBaseApiClientService<{ id: string }>{
    public url = 'good_times';
  }
});
