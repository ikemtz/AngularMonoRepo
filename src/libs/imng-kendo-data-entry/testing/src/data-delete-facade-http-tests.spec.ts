import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { testDeleteCurrentEntity } from './data-delete-facade-http-tests';
import { HttpClient } from '@angular/common/http';

describe('Testing testDeleteCurrentEntity', () => {
  it('should validate', async done => {
    try {
      const httpMock = { delete: jest.fn() };
      const facade = {
        deleteExistingEntity: () => {
          httpMock.delete('x');
        },
      };
      await testDeleteCurrentEntity(done, facade, httpMock as any);
      expect(httpMock.delete).toBeCalledTimes(1);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
