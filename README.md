# @aminnairi/microdatabase

## Installation

```bash
npm install aminnairi/microdatabase
```

## Usage

```typescript
import { InMemoryPersistence, createDatabase } from "../src";
import { randomUUID } from "crypto";

type Database = {
  users: {
    id: string,
    email: string,
    username: string
  }
}

const { persist, all, add } = await createDatabase<Database>({
  persistence: new InMemoryPersistence<Database>({
    users: []
  })
});

add({
  table: "users",
  data: {
    id: randomUUID(),
    email: "email@domain.com",
    username: "user123"
  }
});

const users = all({
  table: "users"
});

console.log(users);

await persist();
```
