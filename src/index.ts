export type DatabaseTable = {
  [key: string]: string | number | boolean
}

export type DatabaseSchema = {
  [key: string]: DatabaseTable
}

export type InitialDatabaseData<GenericDatabaseSchema extends DatabaseSchema> = {
  [TableName in keyof GenericDatabaseSchema]: Array<{
    [ColumnName in keyof GenericDatabaseSchema[TableName]]: GenericDatabaseSchema[TableName][ColumnName]
  }>
}

export const createDatabase = <GenericDatabaseSchema extends DatabaseSchema>(initialData: InitialDatabaseData<GenericDatabaseSchema>) => {
  return {
    all: <Table extends keyof GenericDatabaseSchema>({ table }: { table: Table }): Array<GenericDatabaseSchema[Table]> => {
      return initialData[table] as Array<GenericDatabaseSchema[Table]>;
    },
    one: <Table extends keyof GenericDatabaseSchema>({ table, criterias }: { table: Table, criterias: Partial<GenericDatabaseSchema[Table]> }) => {
      return initialData[table].find(row => {
        return Object.entries(criterias).some(([columnName, columnValue]) => {
          return row[columnName] === columnValue;
        })
      })
    },
    add: <Table extends keyof GenericDatabaseSchema>({ table, data }: { table: Table, data: GenericDatabaseSchema[Table] }): void => {
      initialData[table].push(data);
    },
    remove: <Table extends keyof GenericDatabaseSchema>({ table, criterias }: { table: Table, criterias: Partial<GenericDatabaseSchema[Table]> }): void => {
      initialData[table] = initialData[table].filter(row => {
        return Object.entries(criterias).some(([columnName, columnValue]) => {
          return row[columnName] !== columnValue;
        })
      })
    },
    update: <Table extends keyof GenericDatabaseSchema>({ table, criterias, data }: { table: Table, criterias: Partial<GenericDatabaseSchema[Table]>, data: Partial<GenericDatabaseSchema[Table]> }): void => {
      initialData[table] = initialData[table].map(row => {
        if (Object.entries(criterias).some(([columnName, columnValue]) => row[columnName] === columnValue)) {
          return Object.fromEntries(Object.entries(data).map(([newColumnName, newColumnValue]) => {
            if (newColumnValue === undefined) {
              return [
                newColumnName,
                row[newColumnName]
              ];
            }

            return [
              newColumnName,
              newColumnValue
            ];
          })) as GenericDatabaseSchema[Table];
        }

        return row;
      })
    },
  };
};
