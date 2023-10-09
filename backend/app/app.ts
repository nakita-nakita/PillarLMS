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
import cors from "cors"
import subDomainInitScript from "./subDomain-init";
import domainInitScript from "./domain-init";
import multer from 'multer'
import uploadControllers from "./uploader/uploadControllers.app";
import makeFoundationAuthFunc from "./schema/domain/foundation/auth/preMain/foundationAuth.func";
import emptyTestDomainDb from "./models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "./schema/utils/errorHandling/handers/sequelize.errorHandler";
import emptyTestSubdomainDb from "./models/subDomain/_test/emptyTestDb";
import { d_allDomain } from "./schema/utils/types/dependencyInjection.types";
import makeSocketLookUp from "./schema/subDomain/collaborate/_singleton/preMain/socketLookUp.ram-cache";
import makeFoundationUserMain from "./schema/domain/foundation/user/main/foundationUser.main";
import makeFoundationUserProfileMain from "./schema/domain/foundation/user/main/foundationUserProfile.main";
import { CallByTypeEnum } from "./schema/domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import socketInitScript from "./socket-init";

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


  const domainDb = await emptyTestDomainDb()
  const subDomainDb = await emptyTestSubdomainDb()

  const d: d_allDomain = {
    domainDb,
    subDomainDb,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }

  io.on('connection', async (socket) => {
    const authToken = socket.handshake.query.authToken;
    try {

      const AuthFuncs = makeFoundationAuthFunc(d)
      const decodedToken = await AuthFuncs.getDataFromToken({ token: authToken });

      const userId = decodedToken.data.userId;

      const foundationUser = makeFoundationUserMain(d)
      const foundationUserProfile = makeFoundationUserProfileMain(d)

      const user = await foundationUser.getOneById({
        id: userId
      })

      const userProfile = await foundationUserProfile.getOneById({
        id: userId
      })

      const lookUp = makeSocketLookUp(d)

      await lookUp.set({
        socket: socket,
        socketId: socket.id,
        userId,
        email: user.data?.dataValues?.email,
        callByType: userProfile.data?.dataValues?.callByType as CallByTypeEnum,
        circleColor: userProfile.data?.dataValues?.circleColor,
        firstName: userProfile.data?.dataValues?.firstName,
        labelColor: userProfile.data?.dataValues?.labelColor,
        lastName: userProfile.data?.dataValues?.lastName,
        picture: userProfile.data?.dataValues?.picture,
        username: userProfile.data?.dataValues?.username,
      })
      // Store userId in the socket object
      socket.userId = userId;

      console.log('Received and decoded authToken. UserID:', userId);

    } catch (error) {
      console.error('Error decoding authToken:', error);
      socket.disconnect(true);  // Disconnect socket if token is invalid
      return;
    }

    await socketInitScript({
      socket,
      d,
    })
    
    socket.on('disconnect', function () {
      const lookUp = makeSocketLookUp(d)

      lookUp.removeBySocketId({
        socketId: socket.id,
      })
    });
  });


  // simple route - simple page pointing to both playgrounds...
  app.get("/", (req, res) => {
    res.redirect("./domain/playground");
  });

  //temp, will be moved to domain-init and subDomain-init soon.
  await uploadControllers({ app })

  return server
}

export default makeApp