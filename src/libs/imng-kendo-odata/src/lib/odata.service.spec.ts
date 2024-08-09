import { TestBed } from '@angular/core/testing';
import { ODataService } from './odata.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ODataState } from './odata-state';
import { readFirst } from 'imng-ngrx-utils/testing';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

describe('ODataService', () => {
  let service: ODataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(ODataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(httpClient).toBeTruthy();
  });

  it('should support infilter operations', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          values: [
            'x',
            'y',
            '1fd57024-3299-4523-b910-725fab258015',
            '2b837a73-1d01-4414-ae92-c047a0ff0fe7',
            1,
          ],
        },
      ],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(field1 in ('x','y',1fd57024-3299-4523-b910-725fab258015,2b837a73-1d01-4414-ae92-c047a0ff0fe7,1))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });
  it('should support NOT infilter operations', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      notInFilters: [
        {
          field: 'field1',
          values: [
            'x',
            'y',
            '1fd57024-3299-4523-b910-725fab258015',
            '2b837a73-1d01-4414-ae92-c047a0ff0fe7',
            1,
          ],
        },
      ],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(field1 in ('x','y',1fd57024-3299-4523-b910-725fab258015,2b837a73-1d01-4414-ae92-c047a0ff0fe7,1) eq false)&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support infilter operations with Dates', async () => {
    let requestedUrl = '';
    httpClient.get = jest.fn((x) => {
      requestedUrl = x;
      return of(mockDataFactory());
    }) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          values: ['xyz', 1, new Date(2021, 11, 30, 0, 0, 0, 0)],
        },
      ],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
    };
    const expectedRequestedUrlStart = `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(field1 in ('xyz',1,2021-12-30T`;
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(requestedUrl.startsWith(expectedRequestedUrlStart)).toBe(true);
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support infilter with numeric values', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [{ field: 'field1', values: [1, 2, 6, 4] }],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(field1 in (1,2,6,4))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support take: 0', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      take: 0,
    };
    await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$top=0&$count=true`,
    );
  });

  it('should support infilter with ANDS', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          logic: 'and',
          values: [
            'x',
            'y',
            '1fd57024-3299-4523-b910-725fab258015',
            '2b837a73-1d01-4414-ae92-c047a0ff0fe7',
          ],
        },
      ],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(field1 in ('x','y',1fd57024-3299-4523-b910-725fab258015,2b837a73-1d01-4414-ae92-c047a0ff0fe7)) and (fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support infilter with ORS', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          logic: 'or',
          values: [
            'x',
            'y',
            '1fd57024-3299-4523-b910-725fab258015',
            '2b837a73-1d01-4414-ae92-c047a0ff0fe7',
          ],
        },
      ],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(field1 in ('x','y',1fd57024-3299-4523-b910-725fab258015,2b837a73-1d01-4414-ae92-c047a0ff0fe7)) or (fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support multiple infilters', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          logic: 'or',
          values: [
            'x',
            'y',
            '1fd57024-3299-4523-b910-725fab258015',
            '2b837a73-1d01-4414-ae92-c047a0ff0fe7',
          ],
        },
        {
          field: 'field2',
          logic: 'or',
          values: ['a', 'b', 't', '2b837a73-1d01-4414-ae92-c047a0ff0fe7'],
        },
      ],
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(field2 in ('a','b','t',2b837a73-1d01-4414-ae92-c047a0ff0fe7)) or (field1 in ('x','y',1fd57024-3299-4523-b910-725fab258015,2b837a73-1d01-4414-ae92-c047a0ff0fe7)) or (fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support multi-level string expands', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      expanders: [
        {
          table: 'parentTable',
          expanders: ['grandParentTable'],
          filter: {
            logic: 'and',
            filters: [{ field: 'id', operator: 'eq', value: 'abc' }],
          },
          selectors: ['id', 'field2'],
          sort: [{ field: 'xyz', dir: 'desc' }],
        },
      ],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=parentTable($select=id,field2;$orderby=xyz desc;$filter=id eq 'abc';$expand=grandParentTable)&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support multi-level expanders', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      expanders: [
        {
          table: 'parentTable',
          expanders: [
            { table: 'grandParentTable', sort: [{ field: 'def', dir: 'asc' }] },
          ],
          filter: {
            logic: 'and',
            filters: [{ field: 'id', operator: 'eq', value: 'abc' }],
          },
          selectors: ['id', 'field2'],
          sort: [{ field: 'xyz', dir: 'desc' }],
        },
      ],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=parentTable($select=id,field2;$orderby=xyz desc;$filter=id eq 'abc';$expand=grandParentTable($orderby=def))&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support multi-level multi-table expanders', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      expanders: [
        {
          table: 'parentTable',
          expanders: [
            {
              table: 'grandParentTableA',
              sort: [{ field: 'def', dir: 'asc' }],
            },
            {
              table: 'grandParentTableB',
              sort: [{ field: 'ghi', dir: 'desc' }],
            },
            {
              table: 'grandParentTableC',
              sort: [{ field: 'rst', dir: 'asc' }],
            },
          ],
          filter: {
            logic: 'and',
            filters: [{ field: 'id', operator: 'eq', value: 'abc' }],
          },
          selectors: ['id', 'field2'],
          sort: [{ field: 'xyz', dir: 'desc' }],
        },
      ],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=parentTable($select=id,field2;$orderby=xyz desc;$filter=id eq 'abc';$expand=grandParentTableA($orderby=def),grandParentTableB($orderby=ghi desc),grandParentTableC($orderby=rst))&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support no-option expands', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      expanders: [{ table: 'parentTable' }],
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?$filter=(fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$expand=parentTable&$select=id,name&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });
  it('should support childFilter operations with strings', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      childFilters: {
        logic: 'and',
        filters: [
          {
            field: 'name',
            value: 'xy',
            linqOperation: 'any',
            childTableNavigationProperty: 'childTable1',
            operator: 'eq',
          },
        ],
      },
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=childTable1/any(o: o/name eq 'xy')&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support multiple childFilter operations with strings', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      childFilters: {
        logic: 'or',
        filters: [
          {
            field: 'name2',
            value: 'abc',
            linqOperation: 'any',
            childTableNavigationProperty: 'childTable4',
            operator: 'eq',
          },
          {
            field: 'name',
            value: 'def',
            linqOperation: 'any',
            childTableNavigationProperty: 'childTable1',
            operator: 'eq',
          },
        ],
      },
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      `//idunno.com?&$expand=childTable2,childTable1($select=id,name)&$select=id,name&$filter=(childTable4/any(o: o/name2 eq 'abc') or childTable1/any(o: o/name eq 'def'))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support childFilter contains operations with strings', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      childFilters: {
        logic: 'or',
        filters: [
          {
            field: 'certificationName',
            value: '😎🐱‍👤',
            linqOperation: 'any',
            childTableNavigationProperty: 'employeeCertifications',
            operator: 'contains',
          },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$filter=employeeCertifications/any(o: contains(o/certificationName, '😎🐱‍👤'))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support childFilter equals operations with numbers', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      childFilters: {
        logic: 'or',
        filters: [
          {
            field: 'certificationName',
            value: 353,
            linqOperation: 'any',
            childTableNavigationProperty: 'employeeCertifications',
            operator: 'eq',
          },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$filter=employeeCertifications/any(o: o/certificationName eq 353)&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should do cache busting', async () => {
    let requestUrl = '';
    httpClient.get = jest.fn((x) => {
      requestUrl = x;
      return of(mockDataFactory()) as never;
    });
    const gridState: ODataState = {};
    await readFirst(
      service.fetch('//idunno.com', gridState, { bustCache: true }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(requestUrl).toContain('&timestamp=');
  });

  it('should support childFilter ANDS', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      childFilters: {
        logic: 'and',
        filters: [
          {
            field: 'certificationName',
            value: '😎🐱‍👤',
            linqOperation: 'any',
            childTableNavigationProperty: 'employeeCertifications',
            operator: 'contains',
          },
        ],
      },
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$filter=employeeCertifications/any(o: contains(o/certificationName, '😎🐱‍👤')) and (fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support childFilter ORS', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      childFilters: {
        logic: 'or',
        filters: [
          {
            field: 'certificationName',
            value: '😎🐱‍👤',
            linqOperation: 'any',
            childTableNavigationProperty: 'employeeCertifications',
            operator: 'contains',
          },
        ],
      },
      filter: {
        logic: 'and',
        filters: [
          { field: 'fieldName', value: 'xyz', operator: 'eq' },
          { field: 'fieldName2', value: 'xyz', operator: 'contains' },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$filter=employeeCertifications/any(o: contains(o/certificationName, '😎🐱‍👤')) and (fieldName eq 'xyz' and contains(fieldName2,'xyz'))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support childFilter contains operations with numbers', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      childFilters: {
        logic: 'and',
        filters: [
          {
            field: 'certificationName',
            value: 69.99,
            linqOperation: 'any',
            childTableNavigationProperty: 'employeeCertifications',
            operator: 'eq',
          },
        ],
      },
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$filter=employeeCertifications/any(o: o/certificationName eq 69.99)&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support transformation operations', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      transformations:
        'groupby((columnName),aggregate(id with countdistinct as rowCount))',
    };
    const result = await readFirst(
      service.fetch('//idunno.com', gridState, {
        utcNullableProps: ['fireDate'],
        dateNullableProps: ['fireDate'],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$apply=groupby((columnName),aggregate(id with countdistinct as rowCount))&$count=true`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher);
  });

  it('should support child table filtering', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const compositeFilter = [
      {
        logic: 'and',
        filters: [
          { field: 'a.b', operator: 'eq', value: '123' },
          { field: 'a.d', operator: 'eq', value: 123 },
        ],
      },
    ] as CompositeFilterDescriptor[];
    const gridState: ODataState = {
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
        { table: 'a' },
      ],
      selectors: ['id', 'name'],
      sort: [{ field: 'a.b', dir: 'asc' }],
      filter: { logic: 'or', filters: compositeFilter },
    };
    await readFirst(
      service.fetch('//idunno.com', gridState, {
        boundChildTableProperties: [{ table: 'a', field: 'b' }],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?&$expand=childTable2,childTable1($select=id,name),a($orderby=b)&$select=id,name&$filter=(a/any(o: o/b eq '123') and a/any(o: o/b eq 123))&$count=true`,
    );
  });

  it('should support child table date filtering', async () => {
    let requestedUrl = '';
    httpClient.get = jest.fn((x) => {
      requestedUrl = x;
      return of(mockDataFactory());
    }) as never;
    const compositeFilter = [
      {
        logic: 'and',
        filters: [
          { field: 'a.b', operator: 'eq', value: '123' },
          { field: 'a.d', operator: 'eq', value: 123 },
          {
            field: 'a.d',
            operator: 'eq',
            value: new Date(2021, 11, 30, 0, 0, 0, 0),
          },
        ],
      },
    ] as CompositeFilterDescriptor[];
    const expectedUrlStart = `//idunno.com?&$expand=childTable2,childTable1($select=id,name),a($orderby=b)&$select=id,name&$filter=(a/any(o: o/b eq '123') and a/any(o: o/b eq 123) and a/any(o: o/b eq 2021-12-30T`;
    const gridState: ODataState = {
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
        { table: 'a' },
      ],
      selectors: ['id', 'name'],
      sort: [{ field: 'a.b', dir: 'asc' }],
      filter: { logic: 'or', filters: compositeFilter },
      count: false,
    };
    await readFirst(
      service.fetch('//idunno.com', gridState, {
        boundChildTableProperties: [{ table: 'a', field: 'b' }],
      }),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(requestedUrl.startsWith(expectedUrlStart)).toBe(true);
  });

  it('should support byPrimaryKey operations', async () => {
    httpClient.get = jest.fn(() => of(mockDataFactory())) as never;
    const gridState: ODataState = {
      expanders: [
        { table: 'childTable2' },
        { table: 'childTable1', selectors: ['id', 'name'] },
      ],
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          values: [
            'x',
            'y',
            '1fd57024-3299-4523-b910-725fab258015',
            '2b837a73-1d01-4414-ae92-c047a0ff0fe7',
          ],
        },
      ],
      childFilters: {
        logic: 'or',
        filters: [
          {
            field: 'name',
            value: '😎🐱‍👤',
            linqOperation: 'any',
            childTableNavigationProperty: 'childTable1',
            operator: 'eq',
          },
        ],
      },
    };
    const result = await readFirst(
      service.fetchByPrimaryKey('//idunno.com', 'xyz', gridState),
    );
    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith(
      `//idunno.com?$filter=id eq 'xyz'&$expand=childTable2,childTable1($select=id,name)&$select=id,name`,
    );
    expect(result).toMatchSnapshot(jestPropertyMatcher.data[0]);
  });
});

const mockDataFactory = () => ({
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
      firstName: 'Sam',
      mobilePhone: '123-123-1342',
      homePhone: '',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7_Fo1olCl-psLUoEqePbtx_PA__E3hOWHHk1w7UIuk8WojzVG&usqp=CAU',
      email: 'some_email@domain.com',
      addressLine1: '123 Main St',
      city: 'Anywhere',
      state: 'NY',
      zip: '11111',
      isEnabled: true,
    },
    {
      fireDate: '2020-06-10',
      hireDate: '2020-06-09',
      birthDate: '1999-07-12',
      id: '493afc39-ee35-4247-a80a-845b16ee75cb',
      lastName: 'Martinez',
      firstName: 'Isaac2',
      mobilePhone: '704-123-1234',
      homePhone: '',
      photo: 'https://lh3.googleusercontent.com/a-/xtyz',
      email: '@ikemtz',
      addressLine1: 'yyyyyy',
      city: 'Orlando',
      state: 'FL',
      zip: '32829',
      isEnabled: true,
    },
  ],
});

const jestPropertyMatcher = {
  data: [
    { birthDate: expect.any(Date), hireDate: expect.any(Date) },
    {
      birthDate: expect.any(Date),
      fireDate: expect.any(Date),
      hireDate: expect.any(Date),
    },
  ],
};
