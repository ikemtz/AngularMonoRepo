```mermaid
classDiagram


  class Schedule{
    +uuid: id
    +uuid: unitId
    +string: unitName
    +uuid: employeeId
    +string: employeeName
    +uuid: staffingRequirementId
    +date: startTimeUtc
    +number: scheduledHours
    +date: approvedOnUtc
    +string: createdBy
    +string: updatedBy
    +date: createdOnUtc
    +date: updatedOnUtc
  }
```
This file was generated by the [openapi-mermaid](https://www.npmjs.com/package/openapi-mermaid) tool.
