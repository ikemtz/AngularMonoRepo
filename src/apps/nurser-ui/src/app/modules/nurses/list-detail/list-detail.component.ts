import { Component } from '@angular/core';
import { KendoArrayComponentBase } from 'imng-kendo-grid-odata';
import { IEmployee, IEmployeeCertification, EmployeeCertificationProperties } from '../../models/emp-api';
import { ListFacade } from '../list/list.facade';

@Component({
  selector: 'ngnu-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent extends KendoArrayComponentBase<IEmployee, IEmployeeCertification> {
  public props = EmployeeCertificationProperties;
  constructor(private readonly facade: ListFacade) {
    super();
  }
  public addCert(): void {
    this.facade.addNewCertification(this.item);
  }
}
