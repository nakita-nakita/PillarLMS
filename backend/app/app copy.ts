// //////////////////////////
// ///
// ///  Upgrade: random cookie for JWT reddis layer... first reddis layer
// ///
// ///////////////


// require("dotenv").config();
// import express from "express"
// import http from 'http'
// import socketIO from 'socket.io'
// import bodyParser from "body-parser"
// import formData from "express-form-data"
// import glob from "glob"
// import cors from "cors"
// import expressPlayground from "graphql-playground-middleware-express"
// import { graphqlHTTP } from "express-graphql"
// import { makeExecutableSchema } from "@graphql-tools/schema"
// import { applyMiddleware } from "graphql-middleware"
// import { shield } from "graphql-shield"
// // const subDomainDb = require("./app/models/subDomain");

// // const shieldObj = require("./app/shield/shield")
// // const initialDbData = require("./app/models/initial")

// // const { setUserAvatar, getUserAvatar, setCompanyLogo, getCompanyLogo } = require("./app/controllers/file-uploads-controller");
// // const { ioGateway } = require("./socket");

// // module.exports = (db) => {
// export default async (db) => {

//   const app = express();
//   const server = http.createServer(app)
//   // const io = socketIO(server, {
//   //   cors: {
//   //     origin: "*",
//   //     // methods: ["GET", "POST"]
//   //   }
//   // });

//   // io.on('connection', ioGateway);

//   var corsOptions = {
//     origin: "*",
//     // origin: "http://localhost:8081",
//   };

//   // app.use(cors(corsOptions));
//   // var whitelist = ['http://localhost:8000', 'http://localhost:8010']
//   // var whitelist = ['*']
//   // var corsOptions = {
//   //   origin: function (origin, callback) {
//   //     if (whitelist.indexOf(origin) !== -1) {
//   //       callback(null, true)
//   //     } else {
//   //       callback(new Error('Not allowed by CORS'))
//   //     }
//   //   }
//   // }

//   app.use(cors(corsOptions));


//   // parse requests of content-type - application/json
//   app.use(bodyParser.json());
  
//   // parse requests of content-type - application/x-www-form-urlencoded
//   app.use(bodyParser.urlencoded({ extended: true }));
  
//   //split to two different graphql end-points... one for domain management, the other for subdomain management
//   // //iterate through resolvers file in the folder
//   let resolvers = [
//     ...glob.sync("app/schema/*/*/*.resolver.ts"),
//     ...glob.sync("app/schema/*/*/*/*.resolver.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*.resolver.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*/*.resolver.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*/*/*.resolver.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*/*/*/*.resolver.ts"),
//   ];
//   let registerResolvers = [];
//   for (const resolver of resolvers) {
//     // add resolvers to array
//     registerResolvers = [...registerResolvers, require("./" + resolver)];
//   }
//   //iterate through resolvers file in the folder
//   let types = [
//     ...glob.sync("app/schema/*/*/*.type.ts"),
//     ...glob.sync("app/schema/*/*/*/*.type.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*.type.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*/*.type.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*/*/*.type.ts"),
//     ...glob.sync("app/schema/*/*/*/*/*/*/*/*.type.ts"),
//   ];
//   let registerTypes = [];
//   for (const type of types) {
//     // add types to array
//     registerTypes = [...registerTypes, require("./" + type)];
//   }
//   //make schema from typeDefs and Resolvers with "graphql-tool package (makeExecutableSchema)"
//   const schema = makeExecutableSchema({
//     typeDefs: registerTypes, //merge array types
//     resolvers: registerResolvers, //merge resolver type
//   });


//   // // file uploader
//   // // parse data with connect-multiparty. 
//   // app.use(formData.parse());
//   // // delete from the request all empty files (size == 0)
//   // app.use(formData.format());
//   // // change the file objects to fs.ReadStream 
//   // app.use(formData.stream());
//   // // union the body and the files
//   // app.use(formData.union());


//   // // db.sequelize.sync();
//   // // force: true will drop the table if it already exists
//   // // production: Sql user has limited rigth
//   db.sequelize.sync({ force: false, logging: console.log }).then(() => {
//     console.log("Drop and Resync Database with { force: true }");
//     // initialDbData();
//   });

//   // staffolding: replace during UI
//   subDomainDb.sequelize.sync({ force: true, logging: console.log }).then(() => {
//     console.log("Drop and Resync Database with { force: true }");
//     // initialDbData();
//   });
//   // const permissions = shield(shieldObj);

//   // const schemaWithPermissions = applyMiddleware(schema, permissions);

//   // app.use(
//   //   "/graphql",
//   //   graphqlHTTP({
//   //     schema: schemaWithPermissions,
//   //     graphiql: true,
//   //   })
//   // );

//   // app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

//   // simple route - simple page pointing to both playgrounds...
//   app.get("/", (req, res) => {
//     res.redirect("./playground");
//   });

//   // app.post("/api/v1/user-avatar/", setUserAvatar)
//   // app.get("/api/v1/user-avatar/:filename", getUserAvatar)
//   // app.post("/api/v1/company-logo/", setCompanyLogo)
//   // app.get("/api/v1/company-logo/:filename", getCompanyLogo)

//   return server

// }

