# @aminnairi/microdatabase

## Installation

```bash
npm install aminnairi/microdatabase
```

## Usage

```typescript
import { createDatabase } from "@aminnairi/microdatabase";
import { randomUUID } from "crypto";

type Database = {
  users: {
    id: string,
    email: string,
    password: string
  }
}

const { add, all } = createDatabase<Database>({
  users: []
});

add({
  table: "users",
  data: {
    id: randomUUID(),
    email: "you@home.com",
    password: "sup3rs3cr3tp4ssw0rd"
  }
});

const users = all({
  table: "users"
});

console.log(users);
```
