import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ODataState } from './odata-state';
import { readFirst } from '@nrwl/angular/testing';

describe('ODataService', () => {
  let service: ODataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} }]
    });
    service = TestBed.inject(ODataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpClient).toBeTruthy();
  });

  it('should support infilter operations', async done => {
    try {
      httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
      const gridState: ODataState = {
        selectors: ['id', 'name'],
        inFilter: { field: 'field1', values: ['x', 'y', '1fd57024-3299-4523-b910-725fab258015', '2b837a73-1d01-4414-ae92-c047a0ff0fe7'] },
        expanders: ['childTable2', { tableName: 'childTable1', selectors: ['id', 'name'] }]
      };
      const result = await readFirst(service.fetch('//idunno.com', gridState, ['fireDate'], ['fireDate']));
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith(
        // eslint-disable-next-line max-len
        `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(field1 in ('x','y',1fd57024-3299-4523-b910-725fab258015,2b837a73-1d01-4414-ae92-c047a0ff0fe7))&$count=true`);
      expect(result).toMatchSnapshot(jestPropertyMatcher);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should support childFilter operations', async done => {
    try {
      httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
      const gridState: ODataState = {
        selectors: ['id', 'name'],
        childFilter: { field: 'name', value: '😎🐱‍👤', linqOperation: 'any', childTableNavigationProperty: 'childTable1', operator: 'eq' },
        expanders: ['childTable2', { tableName: 'childTable1', selectors: ['id', 'name'] }]
      };
      const result = await readFirst(service.fetch('//idunno.com', gridState, ['fireDate'], ['fireDate']));
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith(
        // eslint-disable-next-line max-len
        `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(childTable1/any(o: o/name eq 😎🐱‍👤))&$count=true`);
      expect(result).toMatchSnapshot(jestPropertyMatcher);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should support transformation operations', async done => {
    try {
      httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
      const gridState: ODataState = {
        transformations: 'groupby((columnName),aggregate(id with countdistinct as rowCount))'
      };
      const result = await readFirst(service.fetch('//idunno.com', gridState, ['fireDate'], ['fireDate']));
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith(
        `//idunno.com?&$apply=groupby((columnName),aggregate(id with countdistinct as rowCount))&$count=true`);
      expect(result).toMatchSnapshot(jestPropertyMatcher);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should support byPrimaryKey operations', async done => {
    try {
      httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
      const gridState: ODataState = {
        expanders: ['childTable2', { tableName: 'childTable1', selectors: ['id', 'name'] }],
        selectors: ['id', 'name'],
        inFilter: { field: 'field1', values: ['x', 'y', '1fd57024-3299-4523-b910-725fab258015', '2b837a73-1d01-4414-ae92-c047a0ff0fe7'] },
        childFilter: { field: 'name', value: '😎🐱‍👤', linqOperation: 'any', childTableNavigationProperty: 'childTable1', operator: 'eq' },
      };
      const result = await readFirst(service.fetchByPrimaryKey('//idunno.com', 'xyz', gridState));
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith(
        `//idunno.com?$filter=id eq 'xyz'&$expand=childTable2,childTable1($select=id,name)&$select=id,name`);
      expect(result).toMatchSnapshot(jestPropertyMatcher.data[0]);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});

const mockDataFactory = () => (
  {
    '@odata.context':
      // eslint-disable-next-line max-len
      'http://im-wa-empo-nrcrn.azurewebsites.net/odata/v1/$metadata#Employees(id,lastName,firstName,birthDate,mobilePhone,homePhone,photo,email,addressLine1,addressLine2,city,state,zip,isEnabled,hireDate,fireDate,totalHoursOfService,certificationCount,competencyCount,healthItemCount)',
    '@odata.count': 2,
    value: [
      {
        hireDate: '2020-06-10',
        birthDate: '2020-06-24',
        id: '537c0e1c-221f-4756-9869-2bf71abadd47',
        lastName: 'Goody',
        firstName: 'Sam', mobilePhone: '123-123-1342', homePhone: '',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7_Fo1olCl-psLUoEqePbtx_PA__E3hOWHHk1w7UIuk8WojzVG&usqp=CAU',
        email: 'some_email@domain.com', addressLine1: '123 Main St', city: 'Anywhere', state: 'NY', zip: '11111', isEnabled: true
      },
      {
        fireDate: '2020-06-10',
        hireDate: '2020-06-09', birthDate: '1999-07-12', id: '493afc39-ee35-4247-a80a-845b16ee75cb',
        lastName: 'Martinez', firstName: 'Isaac2', mobilePhone: '704-123-1234', homePhone: '',
        photo: 'https://lh3.googleusercontent.com/a-/xtyz', email: '@ikemtz', addressLine1: 'yyyyyy',
        city: 'Orlando', state: 'FL', zip: '32829', isEnabled: true
      }
    ]
  });

const jestPropertyMatcher = {
  data: [
    { birthDate: expect.any(Date), hireDate: expect.any(Date) },
    { birthDate: expect.any(Date), fireDate: expect.any(Date), hireDate: expect.any(Date) }
  ]
};
