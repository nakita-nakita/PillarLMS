Nice to have:

```bash
sudo service redis-server start
sudo service postgresql start
```


## Project setup
```
npm install
```

### Variables
```
cp .env.example .env
```

### Run
```
node server.js
```


Create an account. The first account has root access to the application.

``` GRAPHQL
mutation {
  signup(username: "Bugs Bunny", email: "bugs@acme.com", password: "P@33word"){
    token
  }
}
```

Click the "HTTP HEADERS" tag in playground. Most graphql queries will require a token. 

``` JSON
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3MTI1MjE2LCJleHAiOjE2MzcyMTE2MTZ9.1t-oLCDJQzX3doSO-nOtrS1rD9xnyYLnqy9lftG5V8o"
}
```

Search for Users as the root

``` GRAPHQL
query {
  userMany(q: "Bugs", page: 1, pageSize: 10) {
    count
    page
    pageSize
    pageCount
    rows {
      id
      username
      permissions {
        id
        name
      }
    }
  }
}
```

Create a new permission

``` GRAPHQL
mutation {
  permissionAdd(name: "Hello Permission") {
    id
    name
  }
}
```

Check if you have a new permission.

```Graphql
query {
  permissionMany(q: "Hello") {
    count
    page
    pageSize
    pageCount
    rows {
      id
      name
    }
  }
}
```


Create a new role with that permission listed.

``` GRAPHQL
mutation {
	roleAdd(name: "Hello Role149", permissions: [{id:3}]) {
    id
    name
    permissions {
      id
      name
    }
  }
}
```

Check on that role. Notice you can paginate inside the paginated result.

```graphql
query {
  roleMany(q: "Hello") {
    count
    page
    pageSize
    pageCount
    rows {
      id
      name
      permissionMany(q: "Hello") {
        count
        page
        pageSize
        pageCount
        rows {
          id
          name
        }
      }
    }
  }
}
```

## User Registration, User Login and Authorization process.
The diagram shows flow of how we implement User Registration, User Login and Authorization process.

![jwt-token-authentication-node-js-example-flow](docs/jwt-token-authentication-node-js-example-flow.png)

For more detail, please visit:
> [Node.js JWT Authentication & Authorization with PostgreSQL example](https://bezkoder.com/node-js-jwt-authentication-postgresql/)

You may need to implement Refresh Token:

![jwt-refresh-token-node-js-example-flow](docs/jwt-refresh-token-node-js-example-flow.png)

> [Node.js JWT Refresh Token example](https://bezkoder.com/jwt-refresh-token-node-js/)

Working with Front-end:
> [Vue.js JWT Authentication with Vuex and Vue Router](https://bezkoder.com/jwt-vue-vuex-authentication/)

> [Angular 8 JWT Authentication example](https://bezkoder.com/angular-jwt-authentication/)

> [Angular 10 JWT Authentication example](https://bezkoder.com/angular-10-jwt-auth/)

> [Angular 11 JWT Authentication example](https://bezkoder.com/angular-11-jwt-auth/)

> [React JWT Authentication & Authorization (without Redux) example](https://bezkoder.com/react-jwt-auth/)

> [React Redux JWT Authentication & Authorization example](https://bezkoder.com/react-redux-jwt-auth/)

## More Practice:
> [Node.js CRUD Rest APIs with Express, Sequelize & PostgreSQL example](https://bezkoder.com/node-express-sequelize-postgresql/)

> [Node.js Express Pagination with PostgreSQL example](https://bezkoder.com/node-js-pagination-postgresql/)

> [Node.js Express File Upload Rest API example](https://bezkoder.com/node-js-express-file-upload/)

> [Node.js Express File Upload with Google Cloud Storage example](https://bezkoder.com/google-cloud-storage-nodejs-upload-file/)

Associations:
> [Sequelize Associations: One-to-Many Relationship example](https://bezkoder.com/sequelize-associate-one-to-many/)

> [Sequelize Associations: Many-to-Many Relationship example](https://bezkoder.com/sequelize-associate-many-to-many/)

Integration on same Server/Port:
> [Integrate Angular 8 with Node.js Express](https://bezkoder.com/integrate-angular-8-node-js/)

> [Integrate Angular 10 with Node.js Express](https://bezkoder.com/integrate-angular-10-node-js/)

> [Integrate React with Node.js Express](https://bezkoder.com/integrate-react-express-same-server-port/)
