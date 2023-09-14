//////////////////////////
///
///  Upgrade: random cookie for JWT reddis layer... first reddis layer
///
///////////////


require("dotenv").config();
import express from "express"
import http from 'http'
import socketIO from 'socket.io'
import bodyParser from "body-parser"
import formData from "express-form-data"
import glob from "glob"
import cors from "cors"
import expressPlayground from "graphql-playground-middleware-express"
import { graphqlHTTP } from "express-graphql"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { applyMiddleware } from "graphql-middleware"
import { shield } from "graphql-shield"
import subDomainInitScript from "./subDomain-init";
import domainInitScript from "./domain-init";
import multer from 'multer'
import uploadControllers from "./uploader/uploadControllers.app";
import makeFoundationAuthFunc from "./schema/domain/foundation/auth/preMain/foundationAuth.func";
import emptyTestDomainDb from "./models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "./schema/utils/errorHandling/handers/sequelize.errorHandler";
import makeCollaborateSamePageMain from "./schema/subDomain/collaborate/samepage/main/collaborateSamePage.main";
import emptyTestSubdomainDb from "./models/subDomain/_test/emptyTestDb";
import { d_allDomain } from "./schema/utils/types/dependencyInjection.types";
import singletonCachingService from "./singleton.ram-cache";

const upload = multer({ dest: 'uploads/' })

const makeApp = async function () {

  const app = express();
  const server = http.createServer(app)
  const io = new socketIO.Server(server, {
    cors: {
      origin: '*',
    }
  });

  var corsOptions = {
    origin: "*",
    // origin: "http://localhost:8081",
  };

  //Add on: Anti-DDOS header.__ santization

  // app.use(cors(corsOptions));
  // var whitelist = ['http://localhost:8000', 'http://localhost:8010']
  // var whitelist = ['*']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }

  app.use(cors(corsOptions));


  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // upload

  // schema and database loader
  await domainInitScript({ app })
  await subDomainInitScript({ app })



  io.on('connection', async (socket) => {
    const authToken = socket.handshake.query.authToken;

    const domainDb = await emptyTestDomainDb()
    const subDomainDb = await emptyTestSubdomainDb()

    const d: d_allDomain = {
      domainDb,
      domainTransaction: await domainDb.transaction(),
      subDomainDb,
      subDomainTransaction: await subDomainDb.transaction(),
      cacheService: singletonCachingService,
      loggers: [console],
      errorHandler: sequelizeErrorHandler,
    }

    try {

      const AuthFuncs = makeFoundationAuthFunc(d)
      const decodedToken = await AuthFuncs.getDataFromToken({ token: authToken });

      // Assuming your token's payload has a 'userId' field
      const userId = decodedToken.data.userId;

      // Store userId in the socket object
      socket.userId = userId;

      console.log('Received and decoded authToken. UserID:', userId);

    } catch (error) {
      console.error('Error decoding authToken:', error);
      socket.disconnect(true);  // Disconnect socket if token is invalid
      return;
    }

    // ... rest of your code ...

    // For any emit or other interactions, you can now use socket.userId
    socket.on('addUserToUrl', async (data) => {
      const samePage = makeCollaborateSamePageMain(d)

      await samePage.addUserToPage({
        url: data.url,
        userId: socket.userId,
      })
      socket.emit('samepage')
    });

    socket.on('removeUserFromUrl', async (data) => {
      const samePage = makeCollaborateSamePageMain(d)

      await samePage.removeUserFromPage({
        url: data.url,
        userId: socket.userId,
      })
      socket.emit('samepage')
    });
  });


  // simple route - simple page pointing to both playgrounds...
  app.get("/", (req, res) => {
    res.redirect("./domain/playground");
  });

  // app.post("/api/v1/user-avatar/", upload.single("avatar"), fileUploadsController.setUserAvatar)
  // app.get("/api/v1/user-avatar/:filename", fileUploadsController.getUserAvatar)
  // app.post("/api/v1/user-avatar-preview/", fileUploadsController.setUserAvatarPreview)
  // app.get("/api/v1/user-avatar-preview/:filename", fileUploadsController.getUserAvatarPreview)
  // app.post("/api/v1/company-logo/", setCompanyLogo)
  // app.get("/api/v1/company-logo/:filename", getCompanyLogo)

  await uploadControllers({ app })

  return server
}

export default makeApp

