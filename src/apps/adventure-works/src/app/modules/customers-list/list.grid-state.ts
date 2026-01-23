import { ODataState } from 'imng-kendo-odata';
import { CustomerProperties, SalesAgentProperties } from '../../models/webapi';

export const customerGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    CustomerProperties.ID,
    CustomerProperties.NUM,
    CustomerProperties.NAME,
    CustomerProperties.COMPANY_NAME,
    CustomerProperties.SALES_AGENT_ID,
    CustomerProperties.EMAIL_ADDRESS,
    CustomerProperties.PHONE,
  ],
  sort: [{ field: CustomerProperties.NUM, dir: 'asc' }],
  expanders: [
    {
      table: CustomerProperties.SALES_AGENT,
      selectors: [
        SalesAgentProperties.ID,
        SalesAgentProperties.NAME,
        SalesAgentProperties.LOGIN_ID,
      ],
    },
  ],
};
