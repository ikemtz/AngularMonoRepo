import { testDeleteCurrentEntity } from './data-delete-facade-http-tests';

describe('Testing testDeleteCurrentEntity', () => {
  it('should validate', async done => {
    try {
      const httpMock: any = { delete: jest.fn() };
      const facade = {
        deleteExistingEntity: () => {
          httpMock.delete('x');
        },
      };
      await testDeleteCurrentEntity(done, facade, httpMock as any);
      expect(httpMock.delete).toBeCalledTimes(1);
      expect(httpMock.post).toBeCalledTimes(0);
      expect(httpMock.put).toBeCalledTimes(0);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
