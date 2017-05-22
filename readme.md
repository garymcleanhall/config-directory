# Config Directory

Recursively reads a directory hierarchy and aggregates all config files found into a configuration object.

```
npm install --save config-directory
```

Given the following structure:

```
.
+-- config/
    +-- dev/
    |   +-- service.json
    |   +-- data/
    |       +-- users.json
    +-- staging
    |   +-- service.json
    |   +-- data/
    |       +-- users.json
    +-- live
        +-- service.json
        +-- auth.json
        +-- data/
            +-- users.json
```

And `dev/service.json` contains:

```
{
  "port": 3000
}
```

And `dev\data\users.json` contains:

```
{
  "uri": "http://localhost:27017/users"
}
```

The following call:

```
const configDirectory = require('config-directory')

const config = configDirectory(process.env.NODE_ENV, './config/')
```

When run with `NODE_ENV=dev`, will set `config` to:

```
{
  service: {
    port: 3000
  },
  data: {
    users: {
      uri: "http://localhost:27017/users"
    }
  }
}
```

This is primarily useful when config changes must be appended, rather than amending existing items (like yeoman subgenerators...)