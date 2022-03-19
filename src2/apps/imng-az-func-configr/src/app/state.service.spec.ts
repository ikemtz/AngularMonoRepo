/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
import { AzFunc, AzWebApp, DockerEnv } from './transformers';
import { readFirst } from 'imng-ngrx-utils/testing';
import { IAzSetting } from './az-setting.model';

describe('StateService', () => {
  let service: StateService;
  const azConfigFactory = (): IAzSetting[] => [
    { name: 'dbConnection', value: 'MySqlServer', slotSetting: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setTransformer AzFunc', async () => {
    const transformer = AzFunc;
    service.setTransformer(transformer);
    service.setAzConfiguration(azConfigFactory());
    const result = await readFirst(service.currentTransformer$);
    const data = await readFirst(service.output$);
    expect(result).toEqual(transformer);
    expect(data).toMatchSnapshot();
  });

  it('should setTransformer AzWebApp', async () => {
    const transformer = AzWebApp;
    service.setTransformer(transformer);
    service.setAzConfiguration(azConfigFactory());
    const result = await readFirst(service.currentTransformer$);
    const data = await readFirst(service.output$);
    expect(result).toEqual(transformer);
    expect(data).toMatchSnapshot();
  });

  it('should setTransformer DockerEnv', async () => {
    const transformer = DockerEnv;
    service.setTransformer(transformer);
    service.setAzConfiguration(azConfigFactory());
    const result = await readFirst(service.currentTransformer$);
    const data = await readFirst(service.output$);
    expect(result).toEqual(transformer);
    expect(data).toMatchSnapshot();
  });


  it('should setTransformer AzFunc Empty', async () => {
    const transformer = AzFunc;
    service.setAzConfiguration('null' as any);
    service.setAzConfiguration('null' as any);
    service.setAzConfiguration('null' as any);
    const result = await readFirst(service.currentTransformer$);
    const data = await readFirst(service.output$);
    expect(result).toEqual(transformer);
    expect(data).toMatchSnapshot();
  });

  it('should setTransformer AzWebApp Empy', async () => {
    const transformer = AzWebApp;
    service.setTransformer(transformer);
    service.setAzConfiguration('' as any);
    const result = await readFirst(service.currentTransformer$);
    const data = await readFirst(service.output$);
    expect(result).toEqual(transformer);
    expect(data).toMatchSnapshot();
  });

  it('should setTransformer DockerEnv Empty', async () => {
    const transformer = DockerEnv;
    service.setTransformer(transformer);
    service.setAzConfiguration('' as any);
    const result = await readFirst(service.currentTransformer$);
    const data = await readFirst(service.output$);
    expect(result).toEqual(transformer);
    expect(data).toMatchSnapshot();
  });
});
