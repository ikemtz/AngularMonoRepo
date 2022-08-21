import { LazyLoadEvent } from 'primeng/api';
import { Subject } from 'rxjs';

export class MockTable {
  public onLazyLoad = new Subject<LazyLoadEvent>();
}
