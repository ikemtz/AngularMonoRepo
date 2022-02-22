import { ODataState } from './odata-state'; 
import { ODataService } from './odata.service';

describe('compute operations', () => {
  it('should handle multiplication', () => {
    const gridState: ODataState = {
      selectors: ['id', 'name'],
      inFilters: [
        {
          field: 'field1',
          values: ['x', 'y', '1fd57024-3299-4523-b910-725fab258015', '2b837a73-1d01-4414-ae92-c047a0ff0fe7', 1],
        },
      ],
      expanders: ['childTable2', { table: 'childTable1', selectors: ['id', 'name'] }],
      compute: [{fieldA: 'x', fieldB: 1000, operator: 'mul', alias: 'z' }]
    }; 
    const svc = new ODataService(null);
    const result = svc.getODataString(gridState);
    
    expect(result).toStrictEqual('');
  });  
});
