```mermaid
classDiagram

  Customer ..> SalesAgent
  Customer ..> CustomerAddress
  Customer ..> Order
  CustomerAddress ..> Customer
  CustomerAddressGuidODataEnvelope ..> CustomerAddress
  CustomerGuidODataEnvelope ..> Customer
  Order ..> ShippingTypes
  Order ..> Customer
  Order ..> OrderAddress
  Order ..> OrderLineItem
  OrderAddress ..> Order
  OrderGuidODataEnvelope ..> Order
  OrderLineItem ..> Order
  OrderLineItem ..> Product
  OrderLineItemGuidODataEnvelope ..> OrderLineItem
  Product ..> ProductModel
  Product ..> ProductCategory
  Product ..> OrderLineItem
  ProductCategory ..> Product
  ProductCategoryGuidODataEnvelope ..> ProductCategory
  ProductGuidODataEnvelope ..> Product
  ProductModel ..> Product
  ProductModelGuidODataEnvelope ..> ProductModel
  SalesAgent ..> Customer
  SalesAgentInt32ODataEnvelope ..> SalesAgent

  class Customer{
    +uuid: id
    +string: num
    +string: name
    +string: companyName
    +number: salesAgentId
    +string: emailAddress
    +string: phone
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +SalesAgent: salesAgent;
    +CustomerAddress[]: customerAddresses;
    +Order[]: orders;
  }
  class CustomerAddress{
    +uuid: id
    +uuid: customerId
    +string: addressType
    +string: line1
    +string: line2
    +string: city
    +string: stateProvince
    +string: countryRegion
    +string: postalCode
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +Customer: customer;
  }
  class CustomerAddressGuidODataEnvelope{
    +number: count
    +CustomerAddress[]: value;
  }
  class CustomerGuidODataEnvelope{
    +number: count
    +Customer[]: value;
  }
  class EdmContainerElementKind{
    <<enumeration>>
    None
    EntitySet
    ActionImport
    FunctionImport
    Singleton
  }
  class EdmExpressionKind{
    <<enumeration>>
    None
    BinaryConstant
    BooleanConstant
    DateTimeOffsetConstant
    DecimalConstant
    FloatingConstant
    GuidConstant
    IntegerConstant
    StringConstant
    DurationConstant
    Null
    Record
    Collection
    Path
    If
    Cast
    IsType
    FunctionApplication
    LabeledExpressionReference
    Labeled
    PropertyPath
    NavigationPropertyPath
    DateConstant
    TimeOfDayConstant
    EnumMember
    AnnotationPath
  }
  class EdmSchemaElementKind{
    <<enumeration>>
    None
    TypeDefinition
    Term
    Action
    EntityContainer
    Function
  }
  class EdmTypeKind{
    <<enumeration>>
    None
    Primitive
    Entity
    Complex
    Collection
    EntityReference
    Enum
    TypeDefinition
    Untyped
    Path
  }
  class Order{
    +uuid: id
    +number: orderId
    +number: revisionNum
    +date: date
    +date: dueDate
    +date: shipDate
    +number: status
    +bool: isOnlineOrder
    +string: num
    +string: purchaseOrderNum
    +uuid: customerId
    +uuid: shipToAddressId
    +uuid: billToAddressId
    +string: creditCardApprovalCode
    +number: subTotal
    +number: taxAmt
    +number: freight
    +number: totalDue
    +string: comment
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +ShippingTypes: shippingType;
    +Customer: customer;
    +OrderAddress: shipToAddress;
    +OrderAddress: billToAddress;
    +OrderLineItem[]: orderLineItems;
  }
  class OrderAddress{
    +uuid: id
    +string: line1
    +string: line2
    +string: city
    +string: stateProvince
    +string: countryRegion
    +string: postalCode
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +Order[]: billToOrders;
    +Order[]: shipToOrders;
  }
  class OrderGuidODataEnvelope{
    +number: count
    +Order[]: value;
  }
  class OrderLineItem{
    +uuid: id
    +uuid: orderId
    +number: orderQty
    +uuid: productId
    +number: unitPrice
    +number: unitPriceDiscount
    +number: lineTotal
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +Order: order;
    +Product: product;
  }
  class OrderLineItemGuidODataEnvelope{
    +number: count
    +OrderLineItem[]: value;
  }
  class Product{
    +uuid: id
    +string: name
    +string: num
    +string: color
    +number: standardCost
    +number: listPrice
    +string: size
    +number: weight
    +uuid: productCategoryId
    +uuid: productModelId
    +date: sellStartDate
    +date: sellEndDate
    +date: discontinuedDate
    +string: thumbNailPhoto
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +ProductModel: productModel;
    +ProductCategory: productCategory;
    +OrderLineItem[]: orderLineItems;
  }
  class ProductCategory{
    +uuid: id
    +string: name
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +Product[]: products;
  }
  class ProductCategoryGuidODataEnvelope{
    +number: count
    +ProductCategory[]: value;
  }
  class ProductGuidODataEnvelope{
    +number: count
    +Product[]: value;
  }
  class ProductModel{
    +uuid: id
    +string: name
    +string: description
    +string: createdBy
    +date: createdOnUtc
    +string: updatedBy
    +date: updatedOnUtc
    +Product[]: products;
  }
  class ProductModelGuidODataEnvelope{
    +number: count
    +ProductModel[]: value;
  }
  class SalesAgent{
    +number: id
    +string: name
    +string: loginId
    +Customer[]: customers;
  }
  class SalesAgentInt32ODataEnvelope{
    +number: count
    +SalesAgent[]: value;
  }
  class ShippingTypes{
    <<enumeration>>
    Other
    Air
    Truck
    Train
    CargoTransport
  }
```

This file was generated by the [openapi-mermaid](https://www.npmjs.com/package/openapi-mermaid) tool.
