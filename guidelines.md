# IkeMtz's DB, EF and Microservices Best Practices

## Database Best Practices
- [IkeMtz's DB, EF and Microservices Best Practices](#ikemtzs-db-ef-and-microservices-best-practices)
  - [Database Best Practices](#database-best-practices)
    - [Table names should be plural](#table-names-should-be-plural)
    - [Table and column names should be in Pascal case<](#table-and-column-names-should-be-in-pascal-case)
    - [Table should have a primary key (🔑PK) named Id](#table-should-have-a-primary-key-pk-named-id)
    - [Foreign key column names should follow the {ParentKeyTableName}+'Id' naming convention](#foreign-key-column-names-should-follow-the-parentkeytablenameid-naming-convention)
    - [Column names should not repeat table names](#column-names-should-not-repeat-table-names)
    - [Child column names should not repeat table names](#child-column-names-should-not-repeat-table-names)
    - [Apply a standard list of abbreviations on column names](#apply-a-standard-list-of-abbreviations-on-column-names)
      - [**Suggested Standards**](#suggested-standards)
    - [DateTime values should be stored in UTC and the column name should be suffixed with '<b>Utc</b>'](#datetime-values-should-be-stored-in-utc-and-the-column-name-should-be-suffixed-with-butcb)
    - [Date (NOT DateTime) should be suffixed with '<b>Date</b>'](#date-not-datetime-should-be-suffixed-with-bdateb)

### Table names should be plural

When applying this rule, it's important to <b>NOT</b> adhere to normal language rules.  As an English example, you should use Persons instead of People.

**Dont**:

```SQL
CREATE TABLE Person { ... }
```

**Do**:

```SQL
CREATE TABLE Persons { ... }
```



### Table and column names should be in Pascal case<
<b>Dont</b>:

```SQL
CREATE TABLE Persons {
  [ID] UNIQUEIDENTIFIER NOT NULL,
  [name] NVARCHAR (50) NOT NULL,
  [birthDate] DATE NOT NULL }
```

**Do**:

```SQL
CREATE TABLE Persons {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  [Name] NVARCHAR (50) NOT NULL,
  [BirthDate] DATE NOT NULL }
```



### Table should have a primary key (🔑PK) named Id
The importance of this may not be obvious, but this practice allows for commonality that can be leveraged in interfaces.

It's also important to note, that in a many-to-many relationship table, separate unique indexes should be used as necessary.

**Dont**:

```SQL
CREATE TABLE Persons {
  [PersonId] UNIQUEIDENTIFIER NOT NULL,
  ...,
  CONSTRAINT [PK_Persons] PRIMARY KEY CLUSTERED ([PersonId] ASC)
   }
```

**Do**:

```SQL
CREATE TABLE Persons {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  [Name] NVARCHAR (50) NOT NULL,
  CONSTRAINT [PK_Persons] PRIMARY KEY CLUSTERED ([Id] ASC)
   }
```




### Foreign key column names should follow the {ParentKeyTableName}+'Id' naming convention

**Dont**:

```SQL
CREATE TABLE Orders {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  ...,
  CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC)
   }

CREATE TABLE OrderLineItems {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  [Order] UNIQUEIDENTIFIER NOT NULL,
  ...,
  CONSTRAINT [PK_OrderLineItems] PRIMARY KEY CLUSTERED ([Id] ASC),
  CONSTRAINT [FK_OrderLineItems_Orders] FOREIGN KEY ([Order])
    REFERENCES [dbo].[Orders] ([Id])
   }
```

**Do**:

```SQL
CREATE TABLE Orders {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  ...,
  CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC)
   }

CREATE TABLE OrderLineItems {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  [OrderId] UNIQUEIDENTIFIER NOT NULL,
  ...,
  CONSTRAINT [PK_OrderLineItems] PRIMARY KEY CLUSTERED ([Id] ASC),
  CONSTRAINT [FK_OrderLineItems_Orders] FOREIGN KEY ([OrderId])
    REFERENCES [dbo].[Orders] ([Id])
   }
```



### Column names should not repeat table names

**Dont**:

```SQL
CREATE TABLE Persons {
  [PersonId] UNIQUEIDENTIFIER NOT NULL,
  [PersonName] NVARCHAR (50) NOT NULL,
  [PersonBirthDate] DATE NOT NULL }
```

**Do**:

```SQL
CREATE TABLE Persons {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  [Name] NVARCHAR (50) NOT NULL,
  [BirthDate] DATE NOT NULL }
```




### Child column names should not repeat table names

**Dont**:

```SQL
CREATE TABLE Persons {
  [PersonId] UNIQUEIDENTIFIER NOT NULL,
  [PersonName] NVARCHAR (50) NOT NULL,
  [PersonBirthDate] DATE NOT NULL }
```

**Do**:

```SQL
CREATE TABLE Persons {
  [Id] UNIQUEIDENTIFIER NOT NULL,
  [Name] NVARCHAR (50) NOT NULL,
  [BirthDate] DATE NOT NULL }
```



### Apply a standard list of abbreviations on column names
When applying this rule, it's absolutely important to avoid ambiguity.  People should know immediately when the column name is referring to.

#### **Suggested Standards**
|Word(s)|Abbreviation|
|----|------------|
|Number|Num|
|Quantity|Qty|
|Identifier|Id|
|Customer|Cust|
|Telephone Number 1|Tel 1|
|Territory|Terr|
|Sequence|Seq|
|First Name|FName|
|Last Name|LName|
|Zip Code|Zip|

**Dont**:

```SQL
CREATE TABLE Orders {
  [Number] UNIQUEIDENTIFIER NOT NULL,
  [CustomerNumber] UNIQUEIDENTIFIER NOT NULL,
  [ItemQuantity] INT NOT NULL }
```

**Do**:

```SQL
CREATE TABLE Orders {
  [Num] UNIQUEIDENTIFIER NOT NULL,
  [CustNum] UNIQUEIDENTIFIER NOT NULL,
  [ItemQty] INT NOT NULL }
```




### DateTime values should be stored in UTC and the column name should be suffixed with '<b>Utc</b>'
**Dont**:

```SQL
CREATE TABLE Persons { ...,
  [BirthDate] DATE NOT NULL,
  [LastVisit] DATETIME NOT NULL }
```

**Do**:

```SQL
CREATE TABLE Persons { ...,
  [BirthDate] DATE NOT NULL,
  [LastVisitUtc] DATETIME NOT NULL }
```




### Date (NOT DateTime) should be suffixed with '<b>Date</b>'
This is important because serialization languages such as XML and JSON make no distinction between Date and DateTime.  This will provide microservice consumers an indication as to what values to expect.
**Dont**:

```SQL
CREATE TABLE Persons { ...,
  [DoB] DATE NOT NULL }
```

**Do**:

```SQL
CREATE TABLE Persons { ...,
  [BirthDate] DATE NOT NULL }
```

 