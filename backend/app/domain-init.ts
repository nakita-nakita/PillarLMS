import { makeExecutableSchema } from "@graphql-tools/schema"
import glob from "glob"
import { graphqlHTTP } from "express-graphql"
import { applyMiddleware } from "graphql-middleware"
import { shield } from "graphql-shield"
import expressPlayground from "graphql-playground-middleware-express"
import { makeDObj } from "./schema/utils/dependencies/makeDependency"

const domainInitScript = async ({app,}) => {
  const d = await makeDObj();

  //////////////////////////////////////
  // Load image uploader controlers
  // ===================================


  //////////////////////////////////////
  // Load GQL Schema
  // ===================================
  let resolvers = [
    ...glob.sync("app/schema/domain/*/*/*.resolver.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*.resolver.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*.resolver.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*.resolver.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*.resolver.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*/*.resolver.ts"),
  ];
  let registerResolvers = [];
  for (const resolver of resolvers) {
    // add resolvers to array
    registerResolvers = [...registerResolvers, require("../" + resolver).default];
  }
  //iterate through resolvers file in the folder
  let types = [
    ...glob.sync("app/schema/domain/*/*/*.type.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*.type.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*.type.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*.type.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*.type.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*/*.type.ts"),
  ];
  let registerTypes = [
    require("./schema/utils/graphql/global.type").default
  ];
  
  for (const type of  types) {
    // add types to array
    registerTypes = [...registerTypes, require("../" + type).default];
  }
  //make schema from typeDefs and Resolvers with "graphql-tool package (makeExecutableSchema)"
  const schema = makeExecutableSchema({
    typeDefs: registerTypes, //merge array types
    resolvers: registerResolvers, //merge resolver type
  });


  //////////////////////////////////////
  // Load database connection
  // production: Sql user has limited rights
  // ===================================
  // domainDb.sync({ force: false, logging: console.log }).then(() => {
  //   console.log("Drop and Resync Database with { force: true }");
  // });


  //////////////////////////////////////
  // Load graphql shield
  // ===================================

  //load graphql shield  //iterate through resolvers file in the folder
  let registerSecurity = [
    ...glob.sync("app/schema/domain/*/*/*.security.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*.security.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*.security.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*.security.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*.security.ts"),
    ...glob.sync("app/schema/domain/*/*/*/*/*/*/*/*.security.ts"),
  ];

  let shieldObj = {
    Query: {},
    Mutation: {}
  }

  for (const type of registerSecurity) {
    const securityFile = require("../" + type).default
    // add types to array
    if (securityFile.Query) {
      shieldObj.Query = {
        ...shieldObj.Query,
        ...securityFile.Query,
      }
    }

    if (shieldObj.Mutation) {
      shieldObj.Mutation = {
        ...shieldObj.Mutation,
        ...securityFile.Mutation
      }
    }
  }
  

  const permissions = shield(shieldObj);

  const schemaWithPermissions = applyMiddleware(schema, permissions);

  app.use(
    "/domain/graphql",
    graphqlHTTP({
      schema: schemaWithPermissions,
      graphiql: true,
      context: {
        d: await makeDObj(),
      },
    })
  );


  //////////////////////////////////////
  // load documentation env...
  // ===================================
  app.get("/domain/playground", expressPlayground({ endpoint: "/domain/graphql" }));
}

export default domainInitScript