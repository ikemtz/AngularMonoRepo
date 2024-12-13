import { testDeleteCurrentEntity } from './data-delete-facade-http-tests';

describe('Testing testDeleteCurrentEntity', () => {
  it('should validate', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const httpMock: any = { delete: jest.fn() };
    const facade = {
      deleteExistingEntity: () => {
        httpMock.delete('x');
      },
    };
    await testDeleteCurrentEntity(facade, httpMock);
    expect(httpMock.delete).toHaveBeenCalledTimes(1);
    expect(httpMock.post).toHaveBeenCalledTimes(0);
    expect(httpMock.put).toHaveBeenCalledTimes(0);
  });
});
